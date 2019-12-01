import {StyleSheet} from 'react-native';
import { withNavigationFocus } from 'react-navigation';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButton:{
      //row kanan kiri, colom atas bawah
      flexDirection:'row',
      //memulai dari paing kiri
      alignItems : 'flex-start',
      //agar ada jarak antara buttonnya
      justifyContent : 'space-around',
  
      width : '100%'
    },
    containerInput:{
      borderColor : 'black',
      margin : 10,
      backgroundColor : '#fff',
      //untuk ketebalan garinya
      borderWidth  : 1,
      borderStyle : 'solid',
      borderRadius : 10,
      padding : 10
    },
  //style input
  input:{
    width : 250
  },
  
  Button : {
    // fontSize : 2,
    width : 90
  },
  //syle untuk text
  Text :{
     fontSize : 20,
      color : '#008000'
  },
      //start news Screen

  containerDescNesw:{
      backgroundColor : '#fff',
      padding : 10,
      marginBottom : 10,
      borderBottomColor : 'blue',
      borderBottomWidth : 1
  },

  titleNews : {
    fontSize : 20
  },
  dateNews :{
    fontSize : 10,
  },
    news : {
      flexDirection : 'row'
    },
    ImageNews : {
          width : 120,
          height : 120
      },

      descNews : {
        width : '60%',
        marginLeft : 10
      },
      //end news Screen

      //Start add news screen
      buttonPickImage : {
        borderRadius : 5,
        width : 150
      },

       imageAddNews : {
          width : 250,
          height : 250 
       },
        buttonAddNews:{
        width : 150 ,
        margin : 10
        },
        inputAddNews : {
          width:250
        },
        
      //end news screen
  
  });