import React, { Component } from 'react';
import {View,TextInput,Text} from 'react-native';

export default class Ruangan extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column', }}>
                <View style={{ flex: 1, }}>
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: 'bold' }}>Ruangan </Text>
                </View>
                <View style={{ flex: 1, height: 40, }}>
                    <TextInput {...this.props} style={{ height: 30, padding: 5 }} />
                </View>
            </View>
        )
    }
}