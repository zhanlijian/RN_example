/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 更变主题页面
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
} from 'react-native';
import { px2dp } from '../../utils/common';
import ThemeFactory,{ ThemeFlags } from '../../package/theme_color';  //  颜色主题
import ThemeDao from '../../dao/theme_dao';
import {ACTION_HOME} from '../../app';

export default class Theme extends Component{
    constructor(props) {
        super(props);
        this.ThemeDao = new ThemeDao();
    }

    // 渲染主题页面
    renderContenView() {
        return(
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    this.props.closeTheme()
                }}
            >
                <View style={styles.container}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    // 创建主题
    getThemeItems(themeKey) {
        return (
            <TouchableOpacity 
                style={{flex:1}}
                onPress={()=>{this.changeThemeColor(themeKey)}}
            >
                <View style={[styles.themeList,{backgroundColor:ThemeFlags[themeKey]}]}>
                    <Text style={styles.themeListText}>{themeKey}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // 创建主题列表
    renderThemeItems() {
        let themeList = [];
        let themeArr = Object.keys(ThemeFlags);
        for(var i=0; i<themeArr.length; i+=3){
            let key1 = themeArr[i], key2 = themeArr[i + 1], key3 = themeArr[i + 2];
            themeList.push(
                <View key={i} style={styles.thmeMain}>
                    {this.getThemeItems(key1)}
                    {this.getThemeItems(key2)}
                    {this.getThemeItems(key3)}
                </View>
            )
        }
        return themeList;
    }

    render() {
        let view = this.props.visible?(
            <View style={styles.container}>
                {this.renderContenView()}
            </View>
        ):null;
        return view;
    }

    // 更变主题颜色
    changeThemeColor(themeKey){
        this.props.closeTheme();
        this.ThemeDao.save(ThemeFlags[themeKey]);
        DeviceEventEmitter.emit('ACTION_BASE',ACTION_HOME.A_THEME,ThemeFactory.createTheme(
            ThemeFlags[themeKey]
        ))
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: px2dp(20),
        marginTop: Platform.OS==='ios'?20:10,
        borderRadius: px2dp(5),
        shadowColor: 'gray',
        shadowOffset:  {width:2,height:2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3,
    },
    thmeMain: {
        flex: 1,
        flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    themeList: {
        flex: 1,
        height: px2dp(200),
        margin: px2dp(5),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px2dp(5),
    },
    themeListText: {
        fontSize: px2dp(24),
        color: '#fff',
        fontWeight: '500',
    }
});
