//import liraries
import React, { Component } from 'react';
import { ActivityIndicator ,TouchableOpacity, View, Text, StyleSheet, ScrollView, Button,AsyncStorage } from 'react-native';
import List from './List';
import Profil from '../profil/Body';
import {connect} from 'react-redux';
import CellAdd from '../CellAdd';
import {getData} from '../../config/Api';
// create a component
class Tbody extends Component {
    constructor(props){
        super(props);    
    }

    doUpdate(){
        this.props.dispatch({type:'LOADING'});
        AsyncStorage.getItem('token').then(token => {
            getData(token,function(data){
                this.props.dispatch({type : "FETCH",data:data});
            }.bind(this))
        })
    }

    render() {
        var data = this.props.data;
        var lists = [];
        data.forEach((data,key) => {
            key++;
            lists.push(<TouchableOpacity key={key} onPress={() => {
                        this.props.navigation.navigate('profil',{data:data,doUpdate:this.doUpdate.bind(this)})
                    }} >
                    <List
                        matkul={data.matkul}
                        dosen={data.dosen}
                        time={data.time}
                        room={data.room}
                        status={data.status}
                        id={data.idKuliah}
                    />
                </TouchableOpacity>)
        });
        lists.push(<TouchableOpacity key={0} onPress={() => {
                this.props.navigation.navigate('add',{data:null,doUpdate:this.doUpdate.bind(this)});
            }}>
                <CellAdd />
             </TouchableOpacity>);
            
        return (
            <View style={styles.container}>
                {
                    this.props.status ?
                        <ActivityIndicator animating={true} />
                    :
                    <ScrollView>
                        {lists}
                    </ScrollView>
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'column'
    },
    
});

const mapStateToProps = (state) => {
    return {
        data : state.data.today,
        status : state.isLoading,
    }
}


export default connect(mapStateToProps)(Tbody);


