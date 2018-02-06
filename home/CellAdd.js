import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Icon} from 'native-base'; 

export default class CellAdd extends Component {
    constructor(props){
        super(props);
    }
    render(){
       return (
           <View style={styles.list}>
               <View style={{ flex: 1, flexDirection: 'row', width: 200, alignContent: 'center' }}>
                   <View style={{flex: 1, flexDirection: 'row',alignContent:'center' }}>
                       <Icon name='add-circle' />
                       <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Tambah</Text>
                   </View>
               </View>
           </View>
       )
    }
}

const styles = StyleSheet.create({
    list : {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        // maxHeight: 80,
        padding: 10,
        marginBottom:10,
        alignContent:'center'
    },
})