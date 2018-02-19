//import liraries
import React, { Component } from 'react';
import { ScrollView ,Picker, AsyncStorage ,View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AddInfo from './AddInfo';
import Tugas from './Tugas';
import {kuliahList,kuliahById,update} from '../../config/Api';
// create a component
class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : [],
            data : {
                idKuliah : '',
                time : '',
                room : '',
                dosen : '',
                hari : '',
                status : ''
            },
            button : true,
        }
        this.collection = {
            onChangeText : this.ruanganChange.bind(this),
            hariChange : this.hariChange.bind(this),
            pickerChange : this.kuliahSelected.bind(this),
            save : this.save.bind(this),
            changeTime : this.timeSelected.bind(this),
            changeStatus : this.statusChange.bind(this)
        }
    }

    statusChange(status){
        let prev = this.state.data;
        this.setState({
            data : {
                ...prev,
                status : status
            }
        })
    }

    ruanganChange(e){
        let prev = this.state.data;
        this.setState({
            data : {
                ...prev,
                room : e
            }
        })
    }

    hariChange(e){
        let prev = this.state.data;
        this.setState({
            data : {
                ...prev,
                hari : e
            }
        })
    }

    kuliahSelected(value,index){
        let data = this.state.data
        this.setState({
            data : {
                ...data,
                idKuliah: value
            }
        });
        kuliahById(this.state.token,value,function(res){
            this.setState({
                data : {
                    ...res,
                    idKuliah : value
                },
                button : false
            });
        }.bind(this))
        
    }

    timeSelected(time){
        this.setState({
            data : {
                time : time
            }
        })
    }

    save(){
        let data = {
            id : this.state.data.idKuliah,
            data : {
                ruangan : this.state.data.room,
                jam : this.state.data.time,
                status : this.state.data.status,
                hari : this.state.data.hari
            }
        }

        update(this.state.token,data,function(){
            this.props.navigation.goBack();
        }.bind(this))

    }

    componentDidMount(){
        AsyncStorage.getItem('token').done((token) => {
            this.setState({
               token : token 
            })
            kuliahList(token,function(data) {
                let list = []; 
                data.forEach((value,key) => {
                    list.push(<Picker.Item key={key} label={value.nama} value={value.idKuliah} />)
                });
                this.setState({
                    list : list
                });
                console.log(list);
            }.bind(this));
        })
    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <ScrollView>
                    <AddInfo button={this.state.button} {...this.state.data} list={this.state.list} collection={this.collection} />
                    <Tugas data={null} />
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
export default Add;
