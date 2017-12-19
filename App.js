import React, { Component } from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {StackNavigator} from 'react-navigation';
import {authReducer} from "./src/auth/service";
import {productReducer} from "./src/product/service";
import {ProductList} from "./src/product/ProductList";
import {LoginComponent} from "./src/auth/Login";

const rootReducer = combineReducers({product: productReducer, auth: authReducer});
const store = createStore(rootReducer, applyMiddleware(thunk, createLogger()));

export const MyNavigator = StackNavigator({
    Login: {screen: LoginComponent},
    ProductList: {screen: ProductList},
});



export default class App extends Component<{}> {
  render() {
    return (
        <MyNavigator screenProps={{ store:{store} }}/>
    );
  }
};




//loging
//adb logcat -s ReactNativeJS
//run client:
// react-native run-android