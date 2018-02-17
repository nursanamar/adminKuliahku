//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Info from './Info';
import Tugas from './Tugas';
// create a component
class Add extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('token').done((token) => {
            this.setState({
               token : token 
            })
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
    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                {/* <Text>HEllo</Text> */}
                <Info data={null}/>
                <Tugas data={null} />
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
