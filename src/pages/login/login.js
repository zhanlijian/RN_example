/**
 * 
 * 登录页面
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import { px2dp } from '../../utils/common';
import * as Animatable from 'react-native-animatable';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            theme: global.memory.theme, //  主题颜色
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.loginBg} source={require('../../image/static/login_bg.jpg')}>
                    <Animatable.View
                        style={{flex:1,alignItems:'center'}}
                        animation="slideInDown"
                        useNativeDriver={true}
                    >
                        <Image style={styles.headLogo} source={require('../../image/icon/orther/login_logo.jpg')} />
                    </Animatable.View>
                    <Animatable.View 
                        style={styles.loginMain} 
                        animation="slideInDown"
                        useNativeDriver={true}
                    >
                        <View style={styles.loginInput}>
                            <Image style={{width:px2dp(34),height:px2dp(34)}} source={require('../../image/icon/orther/login_02.png')} />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="请输入您的账号" 
                                placeholderTextColor="#999" 
                                underlineColorAndroid='transparent' 
                                clearButtonMode='while-editing'
                                selectionColor={this.state.theme.themeColor}
                            />
                        </View>
                        <View style={styles.loginInput}>
                            <Image style={{width:px2dp(28),height:px2dp(35)}} source={require('../../image/icon/orther/login_03.png')} />
                            <TextInput 
                                style={styles.textInput} 
                                placeholder="请填写你的6-14位登录密码" 
                                placeholderTextColor="#999" 
                                underlineColorAndroid='transparent' 
                                clearButtonMode='while-editing'
                                selectionColor={this.state.theme.themeColor}
                            />
                        </View>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={styles.loginBtnText}>立即登录</Text>
                        </TouchableOpacity>
                        <View style={styles.toRegisterBtn}>
                            <TouchableOpacity>
                                <Text style={styles.toRegisterText}>还没有账号？立即注册</Text>
                            </TouchableOpacity>
                        </View>
                    
                    </Animatable.View>
                    <Animatable.View
                        style={{flex:1,alignItems:'center'}}
                        animation="slideInDown"
                        useNativeDriver={true}
                    >
                        <Image style={styles.phoneLoginText} source={require('../../image/icon/orther/login_04.png')} />
                        <TouchableOpacity>
                            <Image style={styles.phoneLogin} source={require('../../image/icon/orther/login_01.png')} />
                        </TouchableOpacity>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginBg: {
        flex: 1,
        alignItems: 'center',
    },
    headLogo: {
        width: px2dp(608),
        height: px2dp(116),
        marginTop: Platform.OS==='ios'?px2dp(160):px2dp(130),
    },
    loginMain: {
        alignItems: 'center',
        width: px2dp(710),
        height: px2dp(541),
        backgroundColor: '#fff',
        marginTop: px2dp(167),
        borderRadius: px2dp(10),
    },
    loginInput: {
        width: px2dp(618),
        height: px2dp(90),  
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: px2dp(50),
    },
    textInput: {
        marginLeft: px2dp(23),
        flex: 1,
        fontSize: px2dp(28),
        height: px2dp(70),
    },
    loginBtn: {
        width: px2dp(620),
        height: px2dp(92),
        backgroundColor: '#1bbcff',
        borderRadius: px2dp(10),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(59),
    },
    loginBtnText: {
        fontSize: px2dp(28),
        color: '#fff',
    },
    toRegisterBtn: {
        width: px2dp(620),
        alignItems: 'flex-end',
        marginTop: px2dp(35)
    },
    toRegisterText: {
        fontSize: px2dp(26),
        color: 'rgba(255,0,0,0.7)',
    },
    phoneLoginText: {
        width: px2dp(373),
        height: px2dp(26),
        marginTop: px2dp(61),
    },
    phoneLogin: {
        width: px2dp(100),
        height: px2dp(100),
        marginTop: px2dp(32),
    }
});

const mapStateToPorops = (state,ownProps) => {
    return {
        post: state.post
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

// 通过connect链接组件和redux数据
export default connect(mapStateToPorops)(Login)
