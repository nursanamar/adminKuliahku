//import liraries
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ActivityIndicator ,View, Text, StyleSheet, ScrollView, Button,TouchableOpacity } from 'react-native';
import List from "../today/List";
import Profil from '../profil/Body';

// create a component
class Tmbody extends Component {
    constructor(props){
        super(props)
    }
    render() {
        var data = this.props.data;
        var lists = [];
        data.forEach((data,key) => {
            lists.push(
                <TouchableOpacity key={key} onPress={() => {
                        this.props.navigation.navigate('profil',{data:data})
                    }} >
                    <List
                        matkul={data.matkul}
                        dosen={data.dosen}
                        time={data.time}
                        room={data.room}
                        status={data.status}
                    />
                </TouchableOpacity>
            )
        })
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

function mapStateToProps(state){
    return {
        data : state.data.tomorrow,
        status : state.isLoading,
    }
}

export default connect(mapStateToProps)(Tmbody);