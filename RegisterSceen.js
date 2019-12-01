import React from 'react';
import {  Text, View ,TextInput,Button, KeyboardAvoidingView} from 'react-native';


import styles from '../styles/style';

import{app} from '../config/db';
  export default class RegisterScreen extends React.Component {
    constructor (props){
      super(props);
      this.state={
        email : '',
        password : '',
        error : '',
        conf_password: ''
      }
    }
      onSignUpPress(){
        if (this.state.password!=this.state.conf_password) {
          alert('Password Tidak sama')
            this.setState({password:'', conf_password : ''});
        }else{
          this.setState({error:''});
          const{email,password}=this.state;
          app.auth().createUserWithEmailAndPassword(email,password)
          .then(()=>{
            this.setState({error:''});
            alert('Register Berhasil, Silahkan login');
            this.props.navigation.navigate('Login');
          })
          .catch((e)=>{
            alert(e);
            this.setState({error: 'logingagal'});
          })
        }
      }
  render(){
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' >
      <View style={styles.container}>
        <Text style= {styles.Text}>Selamat datang, silahkan Register </Text>

        <View style= {styles.containerInput}> 
        <TextInput
          style= {styles.input}
          onChangeText={(email)=>this.setState({email})}
          value={this.state.email}
          placeholder='Masukan Email'
          placeholderTextColor='gray'
        />
        </View>
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
         <View style= {styles.containerInput}> 
          <TextInput
          style= {styles.input}
          onChangeText={(conf_password)=>this.setState({conf_password})}
          value={this.state.conf_password}
          placeholder='konfirmasi Password'
          secureTextEntry ={true}
          placeholderTextColor='gray'
        />
      </View>
    <View style={styles.containerButton}>
        <View style= {styles.Button}>
          <Button
            title = 'Register'
            color = '#00fcd9'
            onPress = {this.onSignUpPress.bind(this)}
          />
        </View>
        </View>
      </View>
      </KeyboardAvoidingView>
  );
}
}

 