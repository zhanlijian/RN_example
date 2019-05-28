/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 我的
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { px2dp } from '../../utils/common';
import ThemePage from '../../pages/user/theme';
import * as Animatable from 'react-native-animatable';
import BaseComponent from '../component/base_component'; //   主题基类

export default class User extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            customThemeVisible: false,  //  主题遮罩
            theme: global.memory.theme,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/**顶部导航栏**/}
                <Animatable.View 
                    animation="slideInDown"
                    useNativeDriver={true}
                >
                    <View style={[styles.head,{backgroundColor:this.state.theme.themeColor}]}>
                        <TouchableOpacity style={styles.headIcon}><View style={{width:px2dp(39),height:px2dp(39)}}></View></TouchableOpacity>
                        <TouchableOpacity style={[styles.headIcon,{marginLeft:px2dp(31)}]}><View style={{width:px2dp(39),height:px2dp(39)}}></View></TouchableOpacity>
                        <Text style={styles.headTitle}>我的</Text>
                        <TouchableOpacity style={styles.headIcon}>
                            <Image source={require('../../image/icon/user/icon01.png')} style={{width:px2dp(28),height:px2dp(28)}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.headIcon,{marginLeft:px2dp(31)}]}>
                            <Image source={require('../../image/icon/user/icon02.png')} style={{width:px2dp(29),height:px2dp(27)}} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity activeOpacity={1} style={[styles.headMsg,{backgroundColor:this.state.theme.themeColor}]}>
                        <Image style={styles.headMsgPic} source={require('../../image/temporary/usersetting.png')} />
                        <View style={{flex:1}}>
                            <Text style={styles.headMsgName}>小明 (老板)</Text>
                            <View style={styles.headMsgPhone}>
                                <Text style={{fontSize:px2dp(24),color:'#fff'}}>18503084480</Text>
                            </View>
                        </View>
                        <Image style={styles.headMsgMore} source={require('../../image/icon/user/icon03.png')} />
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View 
                    animation="slideInUp" 
                    useNativeDriver={true}
                    style={styles.navMain}
                >
                    <TouchableOpacity style={[styles.navList,styles.navBottom]}>
                        <Image source={require('../../image/icon/user/icon05.png')} style={styles.navListIcon} />
                        <Text style={styles.navListText}>供应商管理</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.navList,styles.navBottom]}>
                        <Image source={require('../../image/icon/user/icon07.png')} style={styles.navListIcon} />
                        <Text style={styles.navListText}>客户管理</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.navList]}>
                        <Image source={require('../../image/icon/user/icon08.png')} style={{width:px2dp(33),height:px2dp(33)}} />
                        <Text style={styles.navListText}>店铺管理</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                    animation="slideInUp" 
                    useNativeDriver={true}
                    style={styles.navMain}
                >
                    <TouchableOpacity style={[styles.navList,styles.navBottom]}>
                        <Image source={require('../../image/icon/user/icon09.png')} style={styles.navListIcon} />
                        <Text style={styles.navListText}>在线咨询</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.navList]}>
                        <Image source={require('../../image/icon/user/icon10.png')} style={styles.navListIcon} />
                        <Text style={styles.navListText}>意见反馈</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View
                    animation="slideInUp" 
                    useNativeDriver={true}
                    style={styles.navMain}
                >
                    <TouchableOpacity style={[styles.navList,styles.navBottom]} onPress={()=>{this.setState({customThemeVisible:true})}}>
                        <Image source={require('../../image/icon/user/icon11.png')} style={{width:px2dp(33),height:px2dp(33)}} />
                        <Text style={styles.navListText}>主题更变</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.navList]}>
                        <Image source={require('../../image/icon/user/icon11.png')} style={{width:px2dp(33),height:px2dp(33)}} />
                        <Text style={styles.navListText}>帮助</Text>
                        <Image source={require('../../image/icon/user/icon06.png')} style={styles.navListMore} />
                    </TouchableOpacity>
                </Animatable.View>
                <Animatable.View 
                    animation="slideInUp" 
                    useNativeDriver={true}    
                    style={styles.navMain}
                >
                    <TouchableOpacity style={[styles.navList]}>
                        <Image source={require('../../image/icon/user/icon12.png')} style={{width:px2dp(33),height:px2dp(33)}} />
                        <Text style={styles.navListText}>版本更新</Text>
                        <Text style={{fontSize:px2dp(24),color:'#999'}}>v20190226</Text>
                    </TouchableOpacity>
                </Animatable.View>
                {this.renderThemePage()}
            </View>
        );
    }

    // 渲染主题列表
    renderThemePage(){
        return(
            <ThemePage
                visible={this.state.customThemeVisible} 
                {...this.props} 
                closeTheme={()=>{this.setState({customThemeVisible:false})}}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    // 顶部显示信息
    head: {
        height: px2dp(88),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    headIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: px2dp(34),
        color: '#fff',
        backgroundColor: 'transparent',
    },
    headImg: {
        width: px2dp(60),
        height: px2dp(60),
    },
    headMsg: {
        height: px2dp(167),
        flexDirection: 'row',
        alignItems: 'center',
        padding: px2dp(20),
    },
    headMsgPic: {
        width: px2dp(124),
        height: px2dp(124),
        borderColor: '#fff',
        borderWidth: px2dp(null,2),
        borderRadius: px2dp(62),
        marginRight: px2dp(30),
    },
    headMsgMore: {
        width: px2dp(20),
        height: px2dp(36),
    },
    headMsgName: {
        fontSize: px2dp(28),
        color: '#fff',
        backgroundColor: 'transparent',
        marginBottom: px2dp(18),
    },
    headMsgPhone: {
        width: px2dp(180),
        height: px2dp(39),
        alignItems: 'center',
        justifyContent: 'center',   
        backgroundColor: 'rgba(246,246,246,0.2)',
    },
    // 导航列表
    navMain: {
        marginBottom: px2dp(20),
        backgroundColor: '#fff',
    },
    navList: {
        height: px2dp(88),
        padding: px2dp(20),
        flexDirection: 'row',
        alignItems: 'center',
    },
    navListIcon: {
        width: px2dp(33),
        height: px2dp(35),
    },
    navListText: {
        flex: 1,
        fontSize: px2dp(28),
        color: '#333',
        marginLeft: px2dp(20),
    },
    navListMore: {
        width: px2dp(15),
        height: px2dp(26),
    },
    navBottom: {
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
    },
});
