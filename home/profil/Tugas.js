import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';

class Tugas extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
        }
    }
    render(){
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 20, padding: 15 }} >
                <Text style={{ fontWeight: 'bold' }} >Tugas</Text>
                <View style={{ flex: 1 }} >
                  {this.state.isEdit ? <TextInput onBlur={() => { this.setState({isEdit : false}) }} value={this.props.data} style={{backgroundColor : '#d2d7d3'}} multiline={true} /> : <Text onPress={() => {
                      this.setState({
                          isEdit: true
                      })
                      }}>{this.props.data}</Text>}  
                </View>
            </View>
        );
    }
}

export default Tugas;