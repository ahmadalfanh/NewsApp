import React from 'react';
import {View, Text, StyleSheet,TextInput,KeyboardAvoidingView, Button, Image,ScrollView,ActivityIndicator} from 'react-native'
//untuk mendapatkan gambar dari library
// import {ImagePicker} from 'expo';
import *as Permissions from 'expo-permissions';
import *as ImagePicker from 'expo-image-picker';

import{app} from '../config/db';
import{addItem} from '../services/Addservices';


import styles from '../styles/style';
// import NewsScreen from './NewsScreen';
// import style from '../styles/style';
// import { resolve } from 'dns';
// import { rejects } from 'assert';

export default class AddNewsScreen extends React.Component {
    //isi apa saja yang di masukan ke database
    constructor(props){
        super(props);
        this.state={
            title: '',
            image : null,
            desc : '',
            date : '',
            filePath : {},
            upload : false
            //jika upload itu fale maka akan gagal 

        }
            this.handleSubmit = this.handleSubmit.bind(this);

    }
    //membuat fungsi isi'' dari title image dan lain lain
//function handelTitle berdasarkan teks yang akan di isi nantinya
//function componentDidMount membuat tangal otomatis, dia akan jalan ketika file ini di proses

 async componentDidMount(){
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
}
    componentWillMount(){
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        this.setState({
            date : date + '/'+month + '/'+ year + '' + hours + ':' + min + ';' + sec,
         })
    }
    handleTitle = (text) =>{
        this.setState({title:text})
    }
    handleDesc = (text) =>{
        this.setState({desc:text})
    }

    //handelSumbit itu di klik atau di press itu akan langsung akan memproses fungsi handelSumbit
    handleSubmit(){
        addItem(this.state.title,this.state.image,this.state.desc,this.state.date);
        //yang akan muncul di form
        //lalu ketika alert itu di tambahkan maka semuanya itu akan kosong jadi kaya sebelum di isi
        alert ('Data berhasil di tambahkan')
            this.setState({
                title:'',
                desc :'',
                image : '',
            })
    }
    render(){
        return(
            //styeles.container agar sama dengan halaman depan
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ScrollView>
                 
                <Text style={styles.titlePage}>Add News</Text>
                <View style = {styles.containerInput}>
                    <TextInput
                    placeholder= 'Masukan judul'
                    style = {styles.inputAddNews}
                    onChangeText = {this.handleTitle}
                    value = {this.state.title}
                    />
                </View>
                {/* <Text style={styles.titePage}>Add News</Text> */}
                <View style = {styles.containerInput}>
                    <TextInput
                    placeholder= 'masukan Deskripsi'
                    multiline = {true}
                    numberOfLines = {4}
                    style = {styles.inputAddNews}
                    onChangeText = {this.handleDesc}
                    value = {this.state.desc}
                    />
                </View>

                <View style={styles.ButtonPickImage}>
                    <Button
                    title = 'Choose File'
                    onPress = {this._pickImage}
                    />
                    </View>
                    {this._maybeRenderImage()}
                    {this._maybeRenderUploadingOverlay()}
                        <View style= {styles.ButtonAddNews}>
                            <Button
                            title = 'Add News' 
                            onPress = {this.handleSubmit}
                            />
                            </View>    
             </ScrollView>
             </KeyboardAvoidingView>
             //ActivityIndicator fungsi untuk loading
        )
    }
    //membuat sebuah loading 
_maybeRenderUploadingOverlay = () =>{
    if (this.state.uploading){
        return(
            <View
                    style = {[
                        StyleSheet.absolutFill,
                        {
                            backgroundColor : 'rgba(0,0,0,0.4)',
                            alignItems :'center',
                            justifyContent : 'center'
                        },
                    ]}
            >
                        <ActivityIndicator color ='#fff' animating size ='large'/>
            </View>
        )
    }
}
        //setelah di upload image itu akan muncul
        _maybeRenderImage = ()=>{
            let {image} = this.state;
            if (!image || image ==''){
                return;
            }
            return(
                <View
                style={{
                    marginTop : 30,
                    width : 250,
                    borderRadius : 3,
                    elevation : 2
                }}
                >
                    <View
                    style={{
                        borderTopRightRadius : 3,
                        borderTopLeftRadius : 3,
                        shadowColor : 'rgba(0,0,0,1)',
                        shadowOpacity : 0.2,
                        shadowOffset  :{width: 4,height:4},
                        shadowRadius : 5,   
                        overflow : 'hidden'
                    }}
                    >
                            <Image source={{uri : image}} style= {{width:250, height:250}}/>    
                    </View>
                </View>
            )
        }
        //allowsEditing bisa mengedit crop
        //mengambil image dari library
        //launchImageLibraryAscyn mengambil image dari library kita
            _pickImage = async ()=>{
                let pickerResult = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing : true,
                    //rasio
                    aspect : [4,3]
                });
                //fungsi untuk menampung hasil dari pick image
                this._handleImagePicked(pickerResult);
            };
            //fungsi untuk menampung dari pick image
_handleImagePicked = async pickerResult=>{
    try {
        this.setState({uploading : true})
        if (!pickerResult.cancelled) {
            //jika prosesnya berhasil akan di lempar fungsi upload image async  
            uploadUrl = await uploadImageAsync(pickerResult.uri, this.state.title);
            this.setState({image:uploadUrl});
        }

        }catch(e){
            alert(e);
        }finally{
            this.setState({uploading:false});
        }
    }
}

async function uploadImageAsync(uri,title){
    const blob = await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            resolve(xhr.response);
        };
        xhr.onerror = function(e){
            reject(new TypeError('Network Request Failed'));
        }
        xhr.responseType = 'blob';
        xhr.open('GET',uri,true);
        xhr.send(null);
    });
    const ref = app.storage().ref('/news_image').child('image'+title);
    const snapshot = await ref.put(blob);
    blob.close();

    return await snapshot.ref.getDownloadURL();

}