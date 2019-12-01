import  React from 'react';
import {Text, View,ScrollView,Button} from 'react-native';

import styles from '../styles/style';
import {app} from '../config/db';

import ListNews from '../components/ListNews';

    //let di gunakan untuk satu halam ini saja 
    let itemsRef = app.database().ref('/news/');

    export default class ListNewsScreen extends React.Component{
        state= {
            items:[],
            id  :'',
        }
    //akan mendapakan data'' dari firebase
    //snapshoot untuk menampilkan data dan untuk querynya dan sebagainya
    componentDidMount(){
        itemsRef.on ('value', (snapshot) => {
            //data data yg ada di data base let snapshoot.val
            let data = snapshot.val();
                let items = Object.values(data);
                    this.setState({items})
        });
    }
        render(){
            return(
                <ScrollView style = {styles.containerNews}>
                    <Text style ={styles.titlePage}>News</Text>
                    <View style = {styles.Button}>
                        <Button 
                        title = 'Add News'
                        color = '#00fcd9'
                        onPress = {()=>{
                            this.props.navigation.navigate('AddNews');
                        }}
                            />
                    </View>
                        {
                            this.state.items.length > 0
                            ? <ListNews navigation={this.props.navigation} items ={this.state.items}/>
                            :<Text>No Items</Text>
                        }
                </ScrollView>
            )
        }
}
