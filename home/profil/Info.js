import React, { Component } from 'react';
import {Button, ScrollView ,AsyncStorage, KeyboardAvoidingView ,View, Text, StyleSheet,TextInput,Picker,Item,PickerItem } from 'react-native';
import {kuliahList} from '../../config/Api';

class Info extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : null,
            idMatkul : null,
            room : (this.props.data === null) ? null : this.props.data.room,
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
                });
                console.log(list);
            }.bind(this));
        })
    }

    render(){
        let isEdit = (this.props.data === null) ? false : true;
        return (
            <View style={{ flex: 1,padding: 10, backgroundColor:"#fff" }} >
                <ScrollView>
                {
                    (isEdit) ?
                        <View style={{ flex: 1, alignItems: 'center'}}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }} >{this.props.data.matkul}</Text>
                        </View> :
                        <View style={{ flex: 1 }}>
                            <Picker onValueChange={(label,value) => { console.log(label,value); this.setState({idMatkul : label})}} selectedValue={this.state.idMatkul} >
                                {this.state.list}
                            </Picker>
                        </View>
                }

                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Dosen </Text>
                        {(isEdit) ? <Text style={{ flex: 1,}} >{this.props.data.dosen}</Text> : null}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1}}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Jam </Text>
                    </View>
                    <View style={{flex:1}}>
                        <Picker>
                            <Picker.Item label="d" value="d" />
                        </Picker>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Ruangan </Text>                    
                    </View>
                    <View style={{flex:1,height:40,}}>
                                                                                                    
                        {(isEdit) ? <TextInput onChange={(text) => {console.log(text);this.setState({room : text})}} value={this.state.room} style={{height:30,padding:5}}  /> : <TextInput onChange={(text) => {console.log(text);this.setState({room : text})}} value={this.state.room} style={{height:30,padding:5}} />}
                    </View>
                </View>
                <Button onPress={() => {return null} } title="Simpan" />
                </ScrollView>
            </View>
        )
    }
}

export default Info;