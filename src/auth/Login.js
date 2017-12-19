import React, {Component} from 'react';
import {Text, View, TextInput, ActivityIndicator,TouchableHighlight} from 'react-native';
import {login} from './service';
import {getLogger, issueToText} from '../core/utils';
import styles from '../core/styles';

const log = getLogger('auth/Login');

export class LoginComponent extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');
        this.state = {
            username: null,
            password: null
        };
    }

  render() {
    log('render');
    const state = this.state;
    let message = issueToText(state.issue);
    return (
      <View style={styles.content}>
        <ActivityIndicator animating={state.isLoading} style={styles.activityIndicator} size="large"/>
        <Text>Username</Text>
        <TextInput value={state.username} onChangeText={(text) => this.setState({...state, username: text})}/>
        <Text>Password</Text>
        <TextInput value={state.password} onChangeText={(text) => this.setState({...state, password: text})}/>
          <TouchableHighlight  onPress={this.login.bind(this)}>
            <Text>Sign In</Text>
          </TouchableHighlight>
        {message && <Text>{message}</Text>}
      </View>
    );
  }
    componentDidMount(){
        const { store } = this.props.screenProps.store;
        this.unsubscribe = store.subscribe(() => {
            this.setState({ ...this.state, error: store.getState().auth.error, isLoading: store.getState().auth.isLoading});
        });
    }

  componentWillUnmount() {
    log(`componentWillUnmount`);
    this.unsubscribe();
  }


    login() {
        const { store } = this.props.screenProps.store;
        store.dispatch(login(this.state))
            .then(() => {
                if (this.state.error===null && this.state.isLoading===false) {
                    if (store.getState().auth.token) {
                        this.props.navigation.navigate('ProductList',{token: store.getState().auth.token});
                    }
                }
            })
            .catch(error =>
            {
                log('ERROR: '+error.message);

            });

    }
}