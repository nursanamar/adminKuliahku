import React,{Component} from 'react';
import {View, Picker,Text} from 'react-native';

export default class StatusPicker extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: 'bold' }}>Status </Text>
                </View>
                <View style={{ flex: 1 }} >
                    <Picker {...this.props} >
                        <Picker.Item value="Masuk" label="Masuk" />
                        <Picker.Item value="Batal" label="Batal" />
                    </Picker>
                </View>
            </View>
        )
    }
} 