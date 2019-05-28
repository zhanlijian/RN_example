/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 引导页
 */

import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native'
import px2dp from '../../utility/deviceWidth';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import {NavigationActions, StackActions} from "react-navigation";

export default class Guided extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null, // 隐藏顶部标题栏
            gesturesEnabled: false, //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            imgIndex: 0,    // 当前图片下标
            firstOpen: props.navigation.state.params&&props.navigation.state.params.select?true:false,  //  是否为首次打开
        }
    }

    componentWillMount() {
        SplashScreen.hide();    //  隐藏启动页
    }

    render () {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
                    hidden={false}  //是否隐藏状态栏。  
                    backgroundColor={'transparent'} //状态栏的背景色  仅作用于android
                    translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  仅作用于android
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')   
                >
                </StatusBar>
                <Swiper style={styles.wrapper}
                    showsButtons={true}       //为false时不显示控制按钮
                    showsPagination={false}
                    loop={false}        //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                    autoplay={false}          //自动轮播
                    removeClippedSubviews={false}
                    onIndexChanged={(index) => {
                        this.setState({imgIndex: index})
                    }}
                >
                    <Image style={styles.image} source={require('../../image/guided/guided_1.jpg')}/>
                    <Image style={styles.image} source={require('../../image/guided/guided_2.jpg')}/>
                    <Image style={styles.image} source={require('../../image/guided/guided_3.jpg')}/>
                </Swiper>
                <TouchableOpacity style={styles.jump} onPress={()=>{
                    this.firstToUse();  // 跳转首页
                }}>
                    <Text style={styles.jumpText}>跳过></Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.toUse}
                    onPress={()=>{
                        // 当索引为最后一个时才进行跳转
                        if(this.state.imgIndex == 2){
                            this.firstToUse();  // 跳转首页
                        }
                    }}
                >
                </TouchableOpacity>
            </View>
        )
    }

    // 首次进入首页
    firstToUse() {
        if(this.state.firstOpen){
            // 重置路由进行跳转
            let resetActionA = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home', params: {select: 'home'}}),  // 设置跳转目标
                ],
            });
            this.props.navigation.dispatch(resetActionA);   // 跳转
        }else{
            this.props.navigation.goBack(); //  返回上个页面
        }
    }

    componentWillUnmount() {
        if(Platform.OS === 'android'){
            StatusBar.setBackgroundColor('#ec5151');
            StatusBar.setTranslucent(false);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        
    },
    image: {
        width: '100%',
        height: '100%',
    },
    // 跳过
    jump: {
        width: px2dp(120),
        height: px2dp(60),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: px2dp(44),
    },
    jumpText: {
        fontSize: px2dp(24),
        color: '#666',
        backgroundColor: 'transparent'
    },
    toUse: {
        width: px2dp(400),
        height: px2dp(150),
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: px2dp(-200),
        bottom: '9%',
    }
})