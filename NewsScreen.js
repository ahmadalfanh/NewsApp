import React from 'react';
import {View , Text, TouchableHighlight, Image} from 'react-native';

import styles from '../styles/style';

export default class NewsScreen extends React.Component {
    render(){
        return(
            //tampilan news
            <View>                    
                <View style = {styles.containerDescNews}>
                    <Text style={styles.titleNews}>Judul 1</Text>
                    <Text style={styles.dateNews}>20 oktober 2019</Text>
                    <View style={styles.news}>
                    <Image
                        style={styles.ImageNews}
                        source={require('../img/react_native.png')}
                    />
                    <Text style={styles.descNews}>Description News</Text>
                    </View>
                </View>
                </View>
 
        )
    }
}
    