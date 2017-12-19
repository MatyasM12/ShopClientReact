import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from '../core/styles';
import { getLogger, issueToText } from '../core/utils';
import { ProductView } from "./ProductView";
import {loadProducts} from "./service";

const log = getLogger('ProductList');

export class ProductList extends Component {
    ws = null;

    constructor(props) {
        super(props);
        log('constructor');
        this.state = { isLoading: false, issue: null, products: null };
    }

    render() {
        log('render');
        const { isLoading, issue, products } = this.state;
        const issueMessage = issueToText(issue);
        return (
            <View style={styles.content}>
                <Text> PRODUCTS </Text>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>
                {issueMessage && <Text>{issueMessage}</Text>}
                {products && <ProductView  products={products}/>}
            </View>
        );
    }

    componentDidMount() {
        log('componentDidMount');
        const { store } = this.props.screenProps.store;
        store.dispatch(loadProducts(store.getState().auth.token));
        this.unsubscribe = store.subscribe(() => {
            const { isLoading, products, issue } = store.getState().products;
            this.setState({ isLoading, products, issue });

        });
    }

    componentWillUnmount() {
        log('componentWillUnmount');
        this.unsubscribe();
    }
}

