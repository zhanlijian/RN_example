/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain App首页入口
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import Home from './pages/home';    //  首页
import User from './pages/user/user';   //  我的
import Inventory from './pages/inventory/inventory';    //  库存
import { px2dp } from './utils/common';
import BaseComponent from './pages/component/base_component'; //   主题基类
export const ACTION_HOME = {A_THEME:'theme'};

const botNavImg = [
    {
        img: require('./image/icon/home/icon10.png'),
        selImg: require('./image/icon/home/icon10_b.png'),
    },
    {
        img: require('./image/icon/home/icon11.png'),
        selImg: require('./image/icon/home/icon11_b.png'),
    },
    {
        img: require('./image/icon/home/icon12.png'),
        selImg: require('./image/icon/home/icon12_b.png'),
    },
    {
        img: require('./image/icon/home/icon13.png'),
        selImg: require('./image/icon/home/icon13_b.png'),
    },
]

export default class App extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',    //  底部导航选项
            theme: global.memory.theme,
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                {this.state.selectedTab === 'home'?(
                    <Home navigation={this.props.navigation} />
                ):this.state.selectedTab === 'inventory'?(
                    <Inventory navigation={this.props.navigation} />
                ):this.state.selectedTab === 'user'?(
                    <User navigation={this.props.navigation} />
                ):(<View></View>)}
                {/**底部导航栏**/}
                <ImageBackground style={styles.botNav} source={require('../src/image/icon/home/botnav_bg.png')}>
                    <TouchableOpacity style={styles.botNavBtn} onPress={()=>{this.setState({selectedTab:'home'})}}>
                        <Image source={this.state.selectedTab === 'home'?botNavImg[0].selImg:botNavImg[0].img} style={[{width:px2dp(41),height:px2dp(35)},this.changeIconColor('home')]} />
                        <Text style={[styles.botNavText,this.changeTextColor('home')]}>首页</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botNavBtn} onPress={()=>{this.setState({selectedTab:'inventory'})}}>
                        <Image source={this.state.selectedTab === 'inventory'?botNavImg[1].selImg:botNavImg[1].img} style={[{width:px2dp(40),height:px2dp(37)},this.changeIconColor('inventory')]} />
                        <Text style={[styles.botNavText,this.changeTextColor('inventory')]}>库存</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botNavQrcode} onPress={()=>{this.props.navigation.navigate('OpenOrder')}}>
                        <Image source={require('./image/icon/home/qrcode.png')} style={{width:px2dp(102),height:px2dp(102),tintColor:this.state.theme.themeColor}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botNavBtn} onPress={()=>{this.props.navigation.navigate('Bill')}}>
                        <Image source={this.state.selectedTab === 'bill'?botNavImg[2].selImg:botNavImg[2].img} style={[{width:px2dp(32),height:px2dp(36)},this.changeIconColor('bill')]} />
                        <Text style={[styles.botNavText,this.changeTextColor('bill')]}>明细</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botNavBtn} onPress={()=>{this.setState({selectedTab:'user'})}}>
                        <Image source={this.state.selectedTab === 'user'?botNavImg[3].selImg:botNavImg[3].img} style={[{width:px2dp(30),height:px2dp(38)},this.changeIconColor('user')]} />
                        <Text style={[styles.botNavText,this.changeTextColor('user')]}>我的</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }

    // 更变字体颜色
    changeTextColor(selectedTab) {
        if(this.state.selectedTab === selectedTab){
            return {
                color: this.state.theme.themeColor,
            }
        }else{
            return {
                color: '#999'
            }
        }
    }

    // 更变图标颜色
    changeIconColor(selectedTab) {
        if(this.state.selectedTab === selectedTab){
            return {
                tintColor: this.state.theme.themeColor,
            }
        }else{
            return {
                tintColor: '#999'
            }
        }
    }

}

const styles = StyleSheet.create({
    // 底部导航
    botNav: {
        height: px2dp(141),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    botNavBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(50),
    },
    botNavQrcode: {
        position: 'relative',
        bottom: px2dp(24),
        marginTop: px2dp(50),
        marginLeft: px2dp(3)
    },
    botNavText: {
        fontSize: px2dp(22),
        color: '#999',
        marginTop: px2dp(10),
    }
});