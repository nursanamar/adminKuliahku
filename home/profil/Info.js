import React, { Component } from 'react';
import {Button, ScrollView ,View, Text, StyleSheet } from 'react-native';
import Jam from './Jam';
import KuliahPicker from './KuliahPicker';
import Ruangan from './Ruangan';
import StatusPicker from './StatusPicker';

class Info extends Component {
    constructor(props){
        super(props);
        console.log(props,"Info");
    }


    hariSelected(value,index){
        this.props.collection.changeHari(value);
    }

    statusSelected(value,index){
        this.props.collection.changeStatus(value);
    }

    hourSelected(value,index){
        let time = this.props.time.split(":");
        time[0] = value.toString();
        time = time.join(":");
        console.log(time);
        this.props.collection.changeTime(time);
    }

    minuteSelected(value,index){
        let time = this.props.time.split(":");
        time[1] = value.toString();
        time = time.join(":");
        console.log(time);
        this.props.collection.changeTime(time);
    }

    render(){
        let isEdit = true;
        let hour = this.props.time.split(":");
        return (
            <View style={{ flex: 1,padding: 10, backgroundColor:"#fff" }} >
                <ScrollView>
                <KuliahPicker isEdit={isEdit} matkul={this.props.matkul} />
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Dosen </Text>
                        <Text style={{ flex: 1,}} >{this.props.dosen}</Text>
                    </View>
                </View>
                <Jam hari={{selectedValue : this.props.hari,onValueChange : this.hariSelected.bind(this)}} menit={{selectedValue : hour[1],onValueChange : this.minuteSelected.bind(this)}} jam={{selectedValue : hour[0],onValueChange : this.hourSelected.bind(this)}} />
                <Ruangan onChangeText={this.props.collection.onChangeText} value={this.props.room} />
                <StatusPicker onValueChange={this.statusSelected.bind(this)} selectedValue={this.props.status} />
                <Button 
                    onPress={() => {
                            this.props.collection.save();        
                        
                    } } 
                    title="Simpan" 
                />
                </ScrollView>
            </View>
        )
    }
}

export default Info;