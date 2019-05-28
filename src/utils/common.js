/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 当前项目公共方法，用于大部分或全部页面
 */

 /**
 * @explain 按设备尺寸比例进行开发
 */

import {Dimensions,PixelRatio} from 'react-native'

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

// 屏幕设备宽度
const basePx = 750;

export function px2dp(px,smalldp) {
    if(smalldp){
        // 最小尺寸宽度如代替1px
        return smalldp / PixelRatio.get();
    }else{
        return px *  deviceW / basePx
    }
}