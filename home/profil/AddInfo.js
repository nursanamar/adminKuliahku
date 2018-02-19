import React, {Component} from 'react';
import {ScrollView,Button ,View,Text} from 'react-native';
import KuliahPicker from './KuliahPicker';
import Jam from './Jam';
import Ruangan from './Ruangan';
import StatusPicker from './StatusPicker';

export default class AddInfo extends Component {
    constructor(props){
        super(props);
    }

    statusSelected(value,index){
        this.props.collection.changeStatus(value);
    }

    hariSelected(value,index){
        this.props.collection.hariChange(value);
    }

    hourSelected(value,index){
        let time = this.props.time.split(":");
        time[0] = value.toString();
        time = time.join(":");
        console.log(time);
        this.props.collection.changeTime(time);
    }

    minuteSelected(value,index){
        let time = this.props.time.split(":");
        time[1] = value.toString();
        time = time.join(":");
        console.log(time);
        this.props.collection.changeTime(time);
    }

    render(){
        let isEdit = false;
        let hour =  this.props.time.split(":");
        return (
            <View style={{ flex: 1,padding: 10, backgroundColor:"#fff" }} >
                <ScrollView>
                <KuliahPicker  isEdit={isEdit} list={this.props.list} picker={{selectedValue : this.props.idKuliah,onValueChange : this.props.collection.pickerChange}} />
                <View style={{ flex: 1, flexDirection: 'row'}}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flex: 1,fontSize:15,fontWeight:'bold' }}>Dosen </Text>
                        <Text style={{ flex: 1,}} >{this.props.dosen}</Text>
                    </View>
                </View>
                <Jam hari={{selectedValue : this.props.hari,onValueChange: this.hariSelected.bind(this)}} menit={{selectedValue : hour[1],onValueChange : this.minuteSelected.bind(this)}} jam={{selectedValue : hour[0],onValueChange : this.hourSelected.bind(this)}} />
                <Ruangan onChangeText={this.props.collection.onChangeText} value={this.props.room} />
                <StatusPicker onValueChange={this.statusSelected.bind(this)} selectedValue={this.props.status} />
                <Button 
                    disabled={this.props.button}
                    onPress={() => {
                            this.props.collection.save();        
                        
                    } } 
                    title="Simpan" 
                />
                </ScrollView>
            </View>
        )
    }
}