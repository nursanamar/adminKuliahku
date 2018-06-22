import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import List from "../tugas/List";


class Tugas extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            data : []
        }
    }
    render(){
        return (
            <View style={{ flex: 1,flexDirection:'column', marginTop: 20, padding: 0 }} >
                <View style={{flex: 1,flexDirection:'row',padding:10}} >
                    <View style={{ flex:1,alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize:15,fontWeight: 'bold' }} >Tugas</Text>
                    </View>
                    <View style={{ flex:1,alignSelf: 'flex-end'}}>
                        <Text style={{ fontSize:15,fontWeight: 'bold', alignSelf: 'flex-end' }} >Tambah Tugas</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <List />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List />
                </TouchableOpacity>
                <TouchableOpacity>
                    <List />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Tugas;