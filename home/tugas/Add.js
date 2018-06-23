import React, { Component } from 'react';
import { Text,TouchableOpacity } from 'react-native';

class Add extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.goBack();
                }}
            >
                <Text>Hello</Text>
            </TouchableOpacity>
        )
    }
}

export default Add;