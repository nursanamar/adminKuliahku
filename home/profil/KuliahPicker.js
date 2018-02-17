import React, { Component } from 'react';
import {View,Picker,Text} from 'react-native';

export default class KuliahPicker extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const {isEdit,list} = this.props
        return (isEdit) ? (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }} >{this.props.matkul}</Text>
            </View>
        ) : (
            <View style={{ flex: 1 }}>
                <Picker onValueChange={(label, value) => { console.log(label, value); this.setState({ idMatkul: label }) }} selectedValue={this.state.idMatkul} >
                    {list}
                </Picker>
            </View>
        );
    }
}