import React, { Component } from 'react';

import { Picker,View,TouchableOpacity,DatePickerAndroid,Text } from "react-native";

class DatePicker extends Component {

    setDate = (year,month,date) => {
        month = (month <= 9 ) ? "0"+month : month;
        date = (date <= 9 ) ? "0"+date : date;
        this.props.onChange(year + "-" + month + "-" + date);
    }

    openPicker = () => {
        let date = this.props.date.split("-");                    
            DatePickerAndroid.open({
                date: new Date(date[0],date[1],date[2]),
            }).then(({action,year,month,day}) => {
                if (action !== DatePickerAndroid.dismissedAction) {
                    this.setDate(year, month, day);
                }
            });
            
    }
    render(){
        let date = this.props.date.split("-");        
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
               <TouchableOpacity 
                    onPress={this.openPicker}
               >
                    <Text>{date[2]+"/"+date[1]+"/"+date[0]}</Text>
               </TouchableOpacity>
            </View>
        )   
    }
}

export default DatePicker;