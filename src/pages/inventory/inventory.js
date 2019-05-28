/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 库存页面
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    ListView,
} from 'react-native';
import { px2dp } from '../../utils/common';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';

export default class Inventory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            theme: global.memory.theme,
            shopList: [1,1,1,1,1,1,1,1,1],  //  商品列表数据
        }
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <Animatable.View animation="slideInDown" useNativeDriver={true}  style={styles.container}>
                {/**顶部导航栏**/}
                <View style={[styles.head,{backgroundColor:this.state.theme.themeColor}]}>
                    <TouchableOpacity style={styles.headIcon}>
                        <Image source={require('../../image/icon/orther/inventory_01.png')} style={{width:px2dp(40),height:px2dp(36)}} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headTitle}>商品库存</Text>
                    </View>
                    <TouchableOpacity style={styles.headIcon}>
                        <Image source={require('../../image/icon/orther/inventory_02.png')} style={{width:px2dp(39),height:px2dp(39)}} />
                    </TouchableOpacity>
                </View>
                {/**顶部搜索栏**/}
                <View style={styles.search}>
                    <View style={styles.searchBg}>
                        <Image style={styles.searchImg} source={require('../../image/icon/orther/inventory_03.png')} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="搜索商品" 
                            placeholderTextColor="#999" 
                            underlineColorAndroid='transparent' 
                            clearButtonMode='while-editing'
                            selectionColor={this.state.theme.themeColor}
                        />
                    </View>
                </View>
                {/**商品列表**/}
                {this.state.shopList.length>0?(
                    <SwipeListView
                        dataSource={ds.cloneWithRows(this.state.shopList)}
                        disableRightSwipe={true}    // 禁止向右滑动
                        enableEmptySections={true}
                        rightOpenValue={px2dp(-240)}    //  右侧便宜量
                        previewOpenValue={1}    // 侧滑打开动画的速度
                        tension={1} // 打开动画的张力
                        renderRow={this.renderShopList.bind(this)}
                        renderFooter={()=>{return(<View style={{height:px2dp(141)}}></View>)}}
                        renderHiddenRow={ data => (
                            <View style={styles.rowBack}>
                                <View></View>
                                <View style={styles.rowBackBtn}>
                                    <TouchableOpacity 
                                        style={[styles.leftView,{backgroundColor:'#ff6420'}]} 
                                        onPress={()=>{
                                            
                                        }}
                                    >
                                        <Text style={{color: '#fff',fontSize:px2dp(28)}}>编辑</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.leftView,{backgroundColor:'#ec5151'}]} 
                                        onPress={()=>{
                                            
                                        }}
                                    >
                                        <Text style={{color: '#fff',fontSize:px2dp(28)}}>删除</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                ):this.noShopList()}
            </Animatable.View>
        );
    }

    // 库存商品列表
    renderShopList(item) {
        let data = item.item;
        return(
            <View style={styles.shopList}>
                <Image style={styles.shopListImg} source={require('../../image/temporary/search_img.jpg')} />
                <View style={styles.shopListDet}>
                    <Text style={styles.fontFBlack} numberOfLines={1} >一对装】南极人全棉枕头枕芯羽丝绒成</Text>
                    <View style={styles.shopTextFormat}>
                        <Text style={styles.fontFGrey}>零售价：￥10.88</Text>
                        <Text style={styles.fontFGrey}>进货价：￥6.88</Text>
                    </View>
                    <View style={[styles.shopTextFormat,{marginTop:px2dp(5)}]}>
                        <Text style={styles.fontFGrey}>批发价：￥8.88</Text>
                        <Text style={styles.fontFGrey}>库存：888（个）</Text>
                    </View>
                </View>
            </View>
        )
    }

    // 无商品列表展示
    noShopList() {
        return(
            <View style={styles.noShopList}>
                <Image style={styles.noShopListImg} source={require('../../image/static/no_list.png')} />
                <Text style={[styles.fontFGrey,{marginTop:px2dp(40)}]}>暂无数据</Text>
                <View style={{height:px2dp(141)}}></View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    fontFBlack: {
        fontSize: px2dp(24),
        color: '#333',
        width: px2dp(500),
        marginBottom: px2dp(15),
    },
    fontFGrey: {
        fontSize: px2dp(24),
        color: '#999',
    },
    head: {
        height: px2dp(88),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headIcon: {
        padding: px2dp(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    headTitle: {
        fontSize: px2dp(34),
        color: '#fff',
    },
    headImg: {
        width: px2dp(60),
        height: px2dp(60),
    },
    // 搜索
    search: {
        height: px2dp(88),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: px2dp(20),
    },
    searchBg: {
        width: px2dp(710),
        height: px2dp(60),
        backgroundColor: '#f6f6f6',
        borderRadius: px2dp(30),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchImg: {
        width: px2dp(31),
        height: px2dp(31),
        marginLeft: px2dp(28),
    },
    searchInput: {
        flex: 1,
        marginLeft: px2dp(10),
        fontSize: px2dp(28),
        padding: 0,
    },
    // 商品列表
    shopList: {
        height: px2dp(168),
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: px2dp(20),
        alignItems: 'center',
        marginBottom: px2dp(20),
    },
    shopListImg: {
        width: px2dp(120),
        height: px2dp(120),
        marginRight: px2dp(22),
    },
    shopListDet: {
        flex: 1,
    },
    shopTextFormat: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowBackBtn: {
        flexDirection: 'row',
        width: px2dp(240),
        height: px2dp(167),
    },
    leftView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noShopList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noShopListImg: {
        width: px2dp(334),
        height: px2dp(295),
    }
});
