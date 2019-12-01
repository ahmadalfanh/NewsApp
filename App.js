import React from 'react';
import {  Text, View ,TextInput, Button , KeyboardAvoidingView,TouchableHighlight,Image,TouchableOpacity } from 'react-native';
import {  StackActions, NavigationActions, createAppContainer } from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator } from 'react-navigation-tabs';
import {DrawerActions,createDrawerNavigator} from 'react-navigation-drawer';
import {app} from './src/config/db';
 //style
import styles from './src/styles/style';
 
//sceen
import RegisterScreen from './src/screens/RegisterSceen';
import NewsScreen from './src/screens/NewsScreen';
import AddNewsScreen from './src/screens/AddNewsScreen';
import ListNewsScreen from './src/screens/ListNewsScreen';
import EditNewsScreen from './src/screens/EditNewsScreen';

 
  class App extends React.Component {
    constructor (props){
      super(props);
      this.state={
        email : '',
        password : '',
        error : '',
       }
    }
    onLoginPress(){
      this.setState({error:''});
      const{email,password}=this.state;
      app.auth().signInWithEmailAndPassword(email,password)
      .then(()=>{
        this.setState({error:''});
        alert('Login Berhasil');
        
          this.props.navigation.dispatch(StackActions.reset({
        index : 0,
        actions : [
          NavigationActions.navigate({routeName : 'Home'})
        ],
      }));
    
        })
      .catch((e)=>{
        alert(e);
        this.setState({error: 'Login Gagal'});
      })
    }
  render(){
  return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' >
        <Text style= {styles.Text}> Hi </Text>

        <View style= {styles.containerInput}> 
        <TextInput
        style= {styles.input}
        onChangeText={(email)=>this.setState({email})}
        value={this.state.email}
          placeholder='Masukan Email'
          placeholderTextColor='gray'
        />
      </View>
      <Text>Selamat datang, Silahkan Login </Text>
        <View style= {styles.containerInput}> 
        <TextInput
        style= {styles.input}
        onChangeText={(password)=>this.setState({password})}
        value={this.state.password}
          placeholder='Masukan Password'
          secureTextEntry ={true}
          placeholderTextColor='gray'
        />
      </View>
      <View style={styles.containerButton}>
        <View style= {styles.Button}>
          <Button
            title = 'Register'
            color = '#00fcd9'
            onPress = {()=>{
              this.props.navigation.navigate('Register')
            }}
          />
          {/* <TouchableOpacity
            onPress = {()=>{
              this.props.navigation.navigate('Register')
            }}
            style={{ backgroundColor: '#00fcd9', height:40 }}
            >
              <Text style={{ fontSize:20 , textAlign :'center' , color : '#fff' }}>Register</Text>

          </TouchableOpacity>
           */}
        </View>
          <View style = {styles.Button}>
        <Button
            title = 'Login'
            color = '#00fcd9'
            onPress = { this.onLoginPress.bind(this)}
          />
          </View> 
        </View>
      </KeyboardAvoidingView>
  );
}
}
  const HomeScreenNavigator = createDrawerNavigator ({
    Home : {
      screen : createBottomTabNavigator ({
        Home : {screen : NewsScreen},
        ListNews : {screen : ListNewsScreen,
        navigationOptions : {
          title : 'List News'
        },
      },
      }),
    }
  })

const AppNavigator = createStackNavigator ({
  Login :{
    screen : App,
    navigationOption :{
      title : 'Login'
    },
  },
  Register :{
    screen : RegisterScreen,
    navigationOption :{
      title : 'Register'
    },
  },
  AddNews :{
    screen : AddNewsScreen,
    navigationOption :{
      title : 'Add News'
    },
  },
  EditNews :{
    screen : EditNewsScreen,
    navigationOption :{
      title : 'Edit News'
    },
  },

  Home :{
    screen : HomeScreenNavigator,
    navigationOptions : ({navigation}) =>{
        return{
          headerRight :(
              <Button
              title = 'Logout'
              onPress = {() =>{
                navigation.dispatch(StackActions.reset({
                  index : 0,
                  actions : [
                    NavigationActions.navigate({routeName : 'Login'})
                  ],
                }));
              }}
              />
          ),
          headerLeft : (
            <TouchableHighlight
            onPress = {()=>{navigation.dispatch(DrawerActions.toggleDrawer())}}
            >
              <Image
                style = {{width : 32, height : 32, marginLeft : 10}}
                source = {{uri : 'https://png.icons8.com/ios/2x/menu-filled.png' }}
              />
            </TouchableHighlight>
          ) 
        }
    },
  }
  },{
      initialRouteName: 'Login'
});
export default createAppContainer(AppNavigator);
