import React, { Component } from 'react';
import {
    Platform,
    Image,
    TouchableOpacity,
} from 'react-native';
import { px2dp } from '../../utils/common';

export default class LeftBack extends Component{

    render() {
        return(
            <TouchableOpacity 
                style={{justifyContent: 'center', paddingLeft: px2dp(20), width: px2dp(55), height: px2dp(88)}}  
                onPress={() => {this.props.navigation.goBack()}}
            >
                <Image source={require('../../image/icon/orther/addshop_02.png')} style={{width:px2dp(20),height:px2dp(36)}} />
            </TouchableOpacity>
        )
    }
}