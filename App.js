import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, AsyncStorage,AppState } from 'react-native';
import { MainStack, isLogin } from './config/Route';
import Header from './home/Header';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {reducer} from './config/reducers/Main';
import Splash from './Splash'
import Login from './login/Login';
import {getData,fireNotif} from './config/Api';
import PushNotif from './config/PushNotif';
import PushNotification from 'react-native-push-notification';

const store = createStore(reducer);

var ws;

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin : null,
      initial : true,
    }

    this.collection = {
      logout : this.logout.bind(this),
    }
  }


  wsInit(nim,token){
   ws = new WebSocket('ws://localhost:4444/jadwal');
    ws.onopen = () => {
      let data = {
        action : 'auth',
        data : {
          id : nim
        }
      };
      ws.send(JSON.stringify(data));
    }

    ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      switch(data.action){
        case 'log':
          console.log(data);
        break;
        case 'update':
          fireNotif(data.msg);
          getData(token,(res) => {
            store.dispatch({type : "FETCH",data : res})
          })
        break;
        default:
          console.log(data);
      }
    }
  }

  
  componentWillMount(){
    try {
      AsyncStorage.multiGet(['token','nim']).done((nim) => {
        this.setState({
          isLogin: nim[1][1],
          initial: false
        });
        if(nim[1][1] != null){
          this.wsInit(nim[1][1],nim[0][1]);
          getData(nim[0][1],(res) => {
            store.dispatch({type : "FETCH",data : res})
          })
        }
      });
    } catch (error) {
      
    }

  }

	
  // componentWillUnmount(){
  //   ws.close();
  //   // AppState.removeEventListener('change',this.handleChange);
    
  // }

  handleChange(status){
    if(status === 'background') {
      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date: new Date(Date.now() + (10 * 1000)) // in 60 secs
      });
    }
  }

  fireNotif(msg){
    PushNotification.localNotification({
      message: msg, // (required)
    });
  }

  logout(){
    AsyncStorage.multiRemove(['nim','user','token']).then(() => {
      this.setState({
        isLogin: null
      });
      ws.close();
    })
  }


  login(user,token){
    console.log('inputan user',user)
    AsyncStorage.multiSet([['nim',user.nim],['name',user.nama],['token',token]]).then(() => {
      this.setState({
        isLogin: user.nim
      });
    });
    this.wsInit(user.nim,token);    
    getData(token,(res) => {
      store.dispatch({type : 'FETCH',data : res})
    })
  }

  



  render() {
    return (this.state.initial) ? <Splash /> : (this.state.isLogin !== null) ? (
      <Provider store={store}>
        <View style={styles.container} >
          <Header collection={this.collection} />
          <MainStack />
          <PushNotif />
        </View>
      </Provider>
     ): (
         <View style={styles.container} >
           <Login login={this.login.bind(this)} />
         </View>
     )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#5b8930'
  }
})
