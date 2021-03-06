import React, { Component } from 'react';
import {View,Picker,Text} from 'react-native';

export default class Timepicker extends Component {
    constructor(props){
        super(props)
    }

    render(){
        var jam = [];
        var menit = [];
        var hari = [];
        var namaHari=['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
        for (var index = 1; index <= 24; index++) {
            let h = (index.toString().length < 2) ? "0"+index.toString() : index.toString();
            jam.push(<Picker.Item key={index} label={h} value={h} />)
        }
        for (var index = 0; index <= 60 ; index++){
            let h = (index.toString().length < 2) ? "0"+index.toString() : index.toString();
            menit.push(<Picker.Item key={index} label={h} value={h} />)
        }
        for (var index = 1; index <= 7 ; index++){
            hari.push(<Picker.Item key={index} label={namaHari[index - 1]} value={index.toString()} />)
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ flex: 1, fontSize: 15, fontWeight: 'bold' }}>Hari / Jam </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Picker {...this.props.hari} >
                            {hari}
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Picker {...this.props.jam} >
                            {jam}
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Picker {...this.props.menit}>
                            {menit}
                        </Picker>
                    </View>
                </View>
            </View>
        )
    }
}