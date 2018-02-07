import React, { Component } from 'react';
import {AsyncStorage, KeyboardAvoidingView ,View, Text, StyleSheet,TextInput,Picker,Item,PickerItem } from 'react-native';
// import {PickerNB,Item} from 'native-base';
import {kuliahList} from '../../config/Api';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : null,
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('token').done((token) => {
            kuliahList(token,function(data) {
                let list = []; 
                data.forEach((value,key) => {
                    list.push(<Picker.Item key={key} label={value.nama} value={value.idMatkul} />)
                });
                this.setState({
                    list : list
                })
            }.bind(this));
        })
    }

    render(){
        let isEdit = (this.props.data === null) ? false : true;
        return (
            <View style={{ flex: 1,padding: 10, backgroundColor:"#fff" }} >
                
                {
                    (isEdit) ?
                        <View style={{ flex: 1, alignItems: 'center', maxHeight: 25, marginBottom: 30 }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }} >{this.props.data.matkul}</Text>
                        </View> :
                        <View style={{ flex: 1 }}>
                            <Picker mode="dropdown" >
                                {this.state.list}
                            </Picker>
                        </View>
                }
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 40 }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Dosen </Text>
                        {(isEdit) ? <Text style={{ flex: 1,}} >{this.props.data.dosen}</Text> : null}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', maxHeight: 40 }}>
                    <View style={{ flex: 1}}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Jam </Text>
                    </View>
                    <View style={{flex:1}}>
                    
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Ruangan </Text>                    
                    </View>
                    <View style={{flex:1,height:40,}}>
                                                                                                    
                        {(isEdit) ? <TextInput value={this.props.data.room} style={{height:30,padding:5}}  /> : <TextInput style={{height:30,padding:5}} />}
                    </View>
                </View>
            </View>
        )
    }
}

export default Info;