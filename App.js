/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 入口文件
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { px2dp } from './src/utils/common';

// 引入标题栏及跳转导航
import { createStackNavigator } from 'react-navigation';
// 引入配置的新增页面
import allPages from './src/package/all_pages';

// console.log(store.getState());

// store.dispatch({
//   ...countAddAction,
//   payload: {}
// })

// console.log(store.getState());

export default class App extends Component{

    render() {
        return (
            <Provider store={store} >
                <View style={{flex:1}}>
                    <StatusBar
                        animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                        hidden={false}  //是否隐藏状态栏。  
                        backgroundColor={'#4994fe'} //状态栏的背景色  仅作用于android
                        translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  仅作用于android
                        barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
                    >
                    </StatusBar>
                    <Home />
                </View>
            </Provider>
        );
    }
}

//  默认页面标题设置
const CommonSetting = (page) => {
    if (page) {
        return {
            initialRouteName: page, // 默认显示界面
            navigationOptions: {
                // header: null, // 隐藏顶部标题栏
                headerTitle: '',  //导航栏的标题, 可以是字符串也可以是个组件
                // headerBackTitle: '返回',  //左上角的返回键文字, 默认是上一个页面的title，设置这个属性会覆盖掉title的值
                headerRight: <TouchableOpacity></TouchableOpacity>,  //导航栏右按钮 可以是按钮或者其他视图控件
                headerLeft: null, //导航栏左按钮 可以是按钮或者其他视图控件
                headerStyle: {
                    backgroundColor: '#4994fe',
                    height: px2dp(0),
                    borderBottomColor: '#4994fe',
                },  //导航栏的style
                headerTitleStyle: {
                    color: '#fff',
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'normal',
                    fontSize: px2dp(34),
                }, //导航栏的title的style
                headerTintColor: '#fff',  //返回按钮的颜色
                // headerPressColorAndroid :, //按压返回按钮显示的颜色 安卓系统 >= 5.0才有效。
                // gesturesEnabled: true, //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
                // onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
                // onTransitionEnd: ()=>{ console.log('导航栏切换结束'); },  // 回调
                // screen:'', //对应界面名称，需要填入import之后的页面
                mode: 'modal', //定义跳转风格 card iOS和安卓默认的风格
                headerMode: 'float', //定义标题该如何渲染,float - iOS默认的效果,screen滑动过程中，整个页面都会返回,none无动画
                // cardStyle:'', //自定义设置跳转效果
                // transitionConfig: '', //自定义设置滑动返回的配置
                // onTransitionStart:'', //当转换动画即将开始时被调用的功能
                // onTransitionEnd:'', //当转换动画完成，将被调用的功能
                // path:'', //路由中设置的路径的覆盖映射配置
                // initialRouteName:'', //设置默认的页面组件，必须是上面已注册的页面组件
                // initialRouteParams:'', //初始路由参数
            }
        }
    } else {
        return {
            initialRouteName: 'Home', // 默认显示界面
        }
    }
}

// 创建路由并配置
const Home = createStackNavigator(allPages(),CommonSetting('ComePage'));
