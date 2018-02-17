import React, { Component } from 'react';
import {Button, ScrollView ,View, Text, StyleSheet } from 'react-native';
import Jam from './Jam';
import KuliahPicker from './KuliahPicker';
import Ruangan from './Ruangan';

class Info extends Component {
    constructor(props){
        super(props);
        console.log(props,"Info");
    }
    render(){
        let isEdit = true;
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
                <Jam />
                <Ruangan onChangeText={this.props.collection.onChangeText} value={this.props.room} />
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