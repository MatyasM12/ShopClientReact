import React, { Component } from 'react';
import { Text, View,ScrollView, StyleSheet } from 'react-native';



export class ProductView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const array=this.props.products.map(function(product,i){
            return(
              <View key={product.id} style={styles.box}>
                <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>Price: {product.price}</Text>
                  <Text style={styles.amount}>Amount: {product.amount}</Text>
              </View>
            );
        });
        return (
                <ScrollView style={styles.contentContainer}>
                    {array}
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 10,
        color:'burlywood',
    },
    amount:{
        fontSize: 10,
        color: 'darkgoldenrod',
    },
    contentContainer: {
        paddingVertical: 20
    },
    box:{
        height:90,
        borderRadius:10,
        backgroundColor:'aqua',
        margin:5,
    }
});