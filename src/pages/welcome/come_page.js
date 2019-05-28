/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 默认第一个页面，好判断其他页面的入口
 */

import React, { Component } from 'react'
import {
    View,
    StatusBar,
    StyleSheet,
    Platform,
    AsyncStorage,
    Text,
} from 'react-native'
import {NavigationActions, StackActions} from "react-navigation";
import ThemeDao from '../../dao/theme_dao';
import { px2dp } from '../../utils/common';

export default class ComePage extends Component {

    componentWillMount() {
        // 获取缓存的主题色
        new ThemeDao().getTheme().then((data)=>{
            this.theme = data.themeColor;
            global.memory.themeColor = data.themeColor;
        })
        this.timeOut = setTimeout(() => {
            this.changeRoute('Home');
        }, 300);

        // 获取是否首次进入App
        // AsyncStorage.getItem('firstOpen', (error, result) => {
        //     if (!error) {
        //         if (result !== '' && result !== null) {
        //             this.changeRoute('Home');
        //         }else{
        //             AsyncStorage.setItem('firstOpen',JSON.stringify(true));
        //             // 第一次进入App,跳转引导页
        //             // this.changeRoute('Guided')
        //             this.changeRoute('Home')
        //         }
        //     } else {
        //         this.changeRoute('Home')
        //     }
        // })
    }

    // 更变入口地址
    changeRoute(routeName) {
        if(routeName === 'Home' && Platform.OS === 'android'){
            StatusBar.setBackgroundColor(this.theme || '#4994fe');
            StatusBar.setTranslucent(false);
        }
        let resetActionA = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: routeName, params: {}}),  // 设置跳转目标
            ],
        });
        this.props.navigation.dispatch(resetActionA);   // 跳转
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={{color:'#fff',fontSize:px2dp(34)}}>welcome!</Text>
            </View>
        )
    }

    componentWillUnmount() {
        
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4994fe',
        alignItems: 'center',
        justifyContent: 'center',
    }
})