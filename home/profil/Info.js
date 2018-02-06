import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,Picker,PickerItem } from 'react-native';
import {PickerNB,Item} from 'native-base';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeEdit : false,
            roomEdit : false,
        }
    }
    render(){
        return (
            <View style={{ flex: 1,padding: 10, backgroundColor:"#fff" }} >
                <View style={{flex:1,alignItems:'center',maxHeight:25,marginBottom:30}}>
                    <Text style={{fontSize:25,fontWeight:'bold'}} >{this.props.data.matkul}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Dosen </Text>
                        <Text style={{ flex: 1,}} >{this.props.data.dosen}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', maxHeight: 40 }}>
                    <View style={{ flex: 1}}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Jam </Text>
                    </View>
                    <View>
                        {/* <PickerNB>
                            <Item />
                        </PickerNB> */}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Ruangan </Text>                    
                    </View>
                    <View style={{flex:1,height:40}}>
                        <TextInput style={{backgroundColor:'red',flex:1,height:30,padding:0,borderWidth:1}} />                                                
                    </View>
                </View>
            </View>
        )
    }
}

export default Info;