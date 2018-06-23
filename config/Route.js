//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Today, Tomorrow } from '../home/Body';
import Home from '../home/Home';
import Profil from '../home/profil/Body';
import Add from '../home/profil/Add';
import Header from '../home/Header';
import Main from '../main/Main';
import Login from '../login/Login';
import All from '../home/all/All';
import Detail from '../home/tugas/Detail';
import AddTugas from "../home/tugas/Add";

export const TodayStack = StackNavigator({
    list : {
        screen: Today
    },
    profil: {
        screen: Profil
    },
    detail: {
        screen: Detail
    },
    addTugas: {
        screen: AddTugas
    },
    add : {
        screen : Add
    }
},{
    headerMode: 'null'
})

export const TomorowStack = StackNavigator({
    list : {
        screen: Tomorrow
    },
    profil: {
        screen: Profil
    },
    detail: {
        screen: Detail
    },
    addTugas: {
        screen: AddTugas
    },
    add : {
        screen : Add
    }
},{
    headerMode: 'null'
})

export const AllStack = StackNavigator({
    list : {
        screen: All
    },
    profil: {
        screen: Profil
    },
    detail: {
        screen: Detail
    },
    addTugas: {
        screen: AddTugas
    },
    add : {
        screen : Add
    }
},{
    headerMode: 'null'
})



export const HomeStack = TabNavigator(
    {
        today: {
            screen : TodayStack
        },
        Tomorrow : {
            screen: TomorowStack
        },
        All : {
            screen : AllStack
        }
    },
    {
        tabBarOptions : {
            style: {
                backgroundColor: '#5b8930'
            }
        }
    }
);

export function isLogin(){
    AsyncStorage.getItem('user').then((user) => {
       return user
    }).catch(() => {
        return false;
    })
}

export const MainStack = StackNavigator({
    main : {
        screen: HomeStack
    },
    // login: {
    //     screen : Login
    // },
    // home : {
    //     screen: HomeStack,
    // }
},{
    headerMode: 'null'
});
