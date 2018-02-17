import React, { Component } from 'react';
import {View,Picker,Text} from 'react-native';

export default class Timepicker extends Component {
    constructor(props){
        super(props)
    }

    render(){
        var jam = [];
        for (var index = 1; index <= 24; index++) {
            jam.push(<Picker.Item key={index} label={index.toString()} value={index} />)
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: 'bold' }}>Hari / Jam </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Picker>
                            <Picker.Item label="senin" value="senin" />
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Picker selectedValue={8} >
                            {jam}
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Picker>
                            <Picker.Item label="1" value="1" />
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}