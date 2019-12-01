import React from 'react';
import {View,Text, Image,Button,Alert} from 'react-native';
import propTypes from 'prop-types';

import styles from '../styles/style';
import{deleteItem} from '../services/DeleteService';

export default class ListNews extends React.Component{
    static PropTypes={
        items : propTypes.array.isRequired
    };

    deleteSubmit(title){
            Alert.alert(
                'Delete data',
                'apakah anda yakin menghapus data ini ?',
                [
                    {text:'cancel',onPress:()=>console.log('cancel pressed'),style:'cancel'},
                    {text:'yes',onPress:()=>deleteItem(title)},
                ]
                
            )
    }
// masukan sebuah perulangan  {this.props.items.map}
    render(){
        return(
                <View>
                    
                    {this.props.items.map((items,index)=>{
                            return(
                                <View key={index} style={styles.containerDescNesw}> 
                                    <View>
                                        <Text style={styles.titleNews}>{items.title}</Text>
                                        <Text style={styles.dateNews}>{items.date}</Text>
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
                                                <Image
                                                    style= {{width:250, height:250}}
                                                    source={{uri: items.image}}
                                                />
                                            <Text styles ={styles.descNews}>{items.desc}</Text>
                                        </View> 
                                    </View>
                                    <View style={styles.Button}>
                                        <Button
                                        title= 'Delete'
                                        onPress= {this.deleteSubmit.bind(this,items.title)}
                                        />
                                    </View>
                                    <View style={styles.Button}>
                                        <Button
                                        title = 'edit'
                                        onPress = {()=>{this.props.navigation.navigate('EditNews',{
                                            titleNews : items.title,
                                            dateNews:items.date,
                                            imageNews:items.image,
                                            descNews:items.desc
                                        })}}
                                        />
                                    </View>
                                </View>
                             )
                            })}
                </View>
        )
    }
}