import React, { Component } from 'react';
import { AsyncStorage,ActivityIndicator, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import List from "../tugas/List";
import { getTugas } from "../../config/Api";


class Tugas extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            data : []
        }
    }

    componentDidMount(){
        let kuliah = {
            ...this.props.data
        }
        AsyncStorage.getItem('token').done((token) => {
            getTugas(token, kuliah.idKuliah, (data) => {
                this.setState({
                    data: data
                })
                console.log(data)
            })
        })
    }

    render(){

        let lists = [];
        let datum = this.state.data;
        datum.forEach((data,key) => {
            lists.push(
                <TouchableOpacity 
                key={key}
                onPress={() => {
                    this.props.navigation.navigate('detail',{data : data})
                }}
                >
                    <List {...data} />
                </TouchableOpacity>
            )
        })

        return (
            <View style={{ flex: 1,flexDirection:'column', marginTop: 20, padding: 0 }} >
                <View style={{flex: 1,flexDirection:'row',padding:10}} >
                    <View style={{ flex:1,alignSelf: 'flex-start' }}>
                        <Text style={{ fontSize:15,fontWeight: 'bold' }} >Tugas</Text>
                    </View>
                    <View style={{ flex:1,alignSelf: 'flex-end'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('addTugas')
                            }}
                        >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'flex-end' }} >Tambah Tugas</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {lists}
            </View>
        );
    }
}

export default Tugas;