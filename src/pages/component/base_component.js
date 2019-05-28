/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 更变主题基类
 */

import React, { Component } from 'react';
import {
    DeviceEventEmitter,
    StatusBar,
} from 'react-native';
import {ACTION_HOME} from '../../app';

export default class BaseComponent extends Component{

    componentWillMount() {
        if(this.baseListener){
            this.baseListener.remove();
        }
    }

    // 监听ACTION_BASE
    componentDidMount() {
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE',(action,params)=>{
            this.onAction(action,params);
        })
    }

    // 返回通知事件
    onAction(action,params) {
        if(ACTION_HOME.A_THEME === action){
            this.onThemeChange(params)
        }
    }

    // 当主题更变时更新主题
    onThemeChange(theme){
        if(!theme) return;
        global.memory.theme = theme;
        this.setState({
            theme: theme,
        })
        StatusBar.setBackgroundColor(theme.themeColor);
    }

    componentWillUnmount() {
        this.baseListener&&this.baseListener.remove();
        this.setState = ()=>{
            return false;
        }
    }

}