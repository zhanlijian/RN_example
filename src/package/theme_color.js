/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 主题颜色
 */

import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

export const ThemeFlags = {
    Default: '#4994fe',
    Red: '#ec5151',
    Pink: '#e91e63',
    Purple: '#972cb0',
    DeepPurple: '#673ab7',
    Indigo: '#3f51b5',
    Blue: '#2196f3',
    LightBlue: '#03a9f4',
    Cyan: '#00bcd4',
    Teal: '#009688',
    Green: '#4caf50',
    LightGreen: '#8bc34a',
    Lime: '#cddc39',
    Yellow: '#ffeb3b',
    Amber: '#ffc107',
    Orange: '#ff9800',
    DeepOrange: '#ff5722',
    Brown: '#795548',
    Grey: '#9e9e9e',
    BlueGrey: '#607d8b',
    Black: '#000000',
}

 //创建主题样式
export default class ThemeFactory {
    static createTheme(themeFlag){
        return{
            themeColor: themeFlag,
            styles: StyleSheet.create({
                botNavText:{
                    color: themeFlag,
                },
                botNavIcon: {
                    tintColor: themeFlag,
                },
                headBar: {
                    backgroundColor: themeFlag,
                }
                
            })
        }
    }
}