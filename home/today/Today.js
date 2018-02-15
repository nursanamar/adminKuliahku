//import liraries
import React, { Component } from 'react';
import {AppState,TouchableOpacity, View, Text, StyleSheet, ScrollView, Button,AsyncStorage } from 'react-native';
import List from './List';
import Profil from '../profil/Body';
import {getData, ws, fireNotif} from '../../config/Api';
import CellAdd from '../CellAdd';
// create a component
export default class Tbody extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            status : '',
        }

        ws.onmessage = function(e) {
            let res = JSON.parse(e.data);

            if(res.action === 'log'){
                console.log(res.data);
            }else{
                fireNotif(res.msg);
                this.componentDidMount();
            }
        }.bind(this)
    }

    componentDidMount(){
        let status = <Text>Loading</Text>;
        this.setState({
            status : status
        });

        AsyncStorage.getItem('token').done((token) => {
            getData(token,function(res) {
                console.log(res);
                var data = res;
                var lists = [];
                data.forEach((data,key) => {
                    key++;
                    lists.push(<TouchableOpacity key={key} onPress={() => {
                                this.props.navigation.navigate('profil',{data:data})
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
                        this.props.navigation.navigate('add',{data:null});
                    }}>
                        <CellAdd />
                     </TouchableOpacity>)
                this.setState({
                    data : lists,
                    status : ''
                })
            }.bind(this))
        });

        AppState.addEventListener("change",this.handlestate.bind(this))
    }

    componentWillUnmount(){
        AppState.removeEventListener('change',this.handlestate.bind(this));
    
    }

    handlestate(status){
        console.log(status);
        if((status === 'background') || (status === 'inactive')){
            ws.onmessage = function(e) {
                let res = JSON.parse(e.data);
    
                if(res.action === 'log'){
                    console.log(res.data);
                }else{
                    fireNotif(res.msg);
                    // this.componentDidMount();
                }
            }
        }
    }

    render() {
        
        return (
            <View style={styles.container}>
                {/* {this.state.status} */}
                <ScrollView>
                   {this.state.data}
                </ScrollView>
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


