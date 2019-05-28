/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 更变主题dao
 */

import {
    AsyncStorage,
} from 'react-native';
import ThemeFactory,{ ThemeFlags } from '../package/theme_color';

const THEME_KEY = 'theme_key';

export default class ThemeDao{
    // 获取主题
    getTheme(){
        return new Promise((resolve,rejects)=>{
            AsyncStorage.getItem(THEME_KEY,(error,result)=>{
                if(error){
                    rejects(error);
                    return;
                }
                if(!result){
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result))
            })
        }) 
    }

    // 保存主题
    save(themeFlag){
        AsyncStorage.setItem(THEME_KEY,themeFlag,(error=>{}))
    }
}