import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, AsyncStorage,AppState } from 'react-native';
import { MainStack, isLogin } from './config/Route';
import Header from './home/Header';
import Splash from './Splash'
import Login from './login/Login';
import PushNotif from './config/PushNotif';
import PushNotification from 'react-native-push-notification';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin : null,
      initial : true
    }

    this.collection = {
      logout : this.logout.bind(this)
    }
  }

  // componentDidMount(){
  //   AppState.addEventListener('change',this.handleChange);
  // }
  
  componentWillMount(){
    try {
      AsyncStorage.getItem('nim').done((nim) => {
        this.setState({
          isLogin: nim,
          initial: false
        });
      });
    } catch (error) {
      
    }

  }

	
  // componentWillUnmount(){
  //   AppState.removeEventListener('change',this.handleChange);
    
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
      })
    })
  }

  login(user,token){
    console.log('inputan user',user)
    AsyncStorage.multiSet([['nim',user.nim],['name',user.nama],['token',token]]).then(() => {
      this.setState({
        isLogin: user.nim
      });
      this.wsInit();
    })
  }

  wsInit(){
    var ws = new WebSocket("ws://localhost:4444/jadwal");

    ws.onopen = () => {
      let data = {
        action : "auth",
        data : {
          id:"nursan"
        }
      };

      ws.send(JSON.stringify(data));

    }

    ws.onmessage = (e) => {
      this.fireNotif(e.data.data);
    }

    ws.onerror = (e) => {
      console.log(e);
    }

    ws.onclose = () => {
      console.log("closed")
    }
  }



  render() {
    return (this.state.initial) ? <Splash /> : (this.state.isLogin !== null) ? (
      <View style={styles.container} >
         <Header collection={this.collection} />
         <MainStack />
         <PushNotif />
     </View>
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
