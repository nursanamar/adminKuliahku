//import liraries
import React, { Component } from 'react';
import { ActivityIndicator ,AsyncStorage,ScrollView,View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Info from './Info';
import Tugas from './Tugas';
import {update} from '../../config/Api';

// create a component
class Profil extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...this.props.navigation.state.params.data,
            loading : false,
        }

        this.collection = {
            onChangeText : this.changeRuangan.bind(this),
            save : this.save.bind(this),
            changeTime : this.changeTime.bind(this),
            changeHari : this.changeHari.bind(this),
            changeStatus : this.changeStatus.bind(this)
        }
    }

    save(){
        this.setState({
            loading : true
        })
        let data = {
            id : this.state.idKuliah,
            data : {
                ruangan : this.state.room,
                jam : this.state.time,
                hari : this.state.hari,
                status : this.state.status
            }
        }
        AsyncStorage.getItem('token').done((token) => {
            update(token,data,function(){
                this.props.navigation.state.params.doUpdate();
                this.props.navigation.goBack();
            }.bind(this));
        });
    }

    changeStatus(status){
        this.setState({
            status : status
        })
    }

    changeHari(hari){
        this.setState({
            hari : hari
        })
    }

    changeRuangan(e){
        this.setState({
            room : e
        });
    }

    changeTime(time){
        this.setState({
            time : time
        })
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                {this.state.loading ? <ActivityIndicator animating={true} /> : null}
                <ScrollView>
                    <Info {...this.state} collection={this.collection} navigation={this.props.navigation} />
                    <Tugas navigation={this.props.navigation} data={this.props.navigation.state.params.data} />
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        flexDirection: 'column',
    },
});

//make this component available to the app
export default Profil;
