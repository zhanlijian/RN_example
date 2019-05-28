/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 开单收钱
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
    ListView,
    ScrollView,
    PanResponder,
} from 'react-native';
import { px2dp } from '../../utils/common';
import * as Animatable from 'react-native-animatable';
import { SwipeListView } from 'react-native-swipe-list-view';
import LeftBack from '../component/left_back';

export default class OpenOrder extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: '开单收钱',
            headerStyle: {
                backgroundColor: global.memory.theme.themeColor,
                height: px2dp(88),
                borderBottomColor: global.memory.theme.themeColor,
                elevation: 0,   //  android 的 Bar底部阴影去除
            },
            headerLeft: <LeftBack navigation={navigation} />,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            theme: global.memory.theme, //  主题颜色
            shopList: [1,2,3], //  商品列表
            showSale: true, //  是显示销售，否显示进货
            saleType: 0,   //  销售开单类型 0:出货，1：退货，2：收款
            showHead: true, //  是否显示顶部详细内容
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: ()=> true,
            onPanResponderGrant: (evt,gs)=>{
                // 用户手势开始
            },
            onPanResponderMove: (evt,gs)=>{
                // console.log(gs.moveY);
            },
            onPanResponderRelease: (evt,gs)=>{
                // 用户结束手势
                console.log(gs.dy)
                // 检测滑动距离大于200时进行显示隐藏头部详细信息
                if(gs.dy > 200 && !this.state.showHead){
                    this.setState({
                        showHead: true
                    })
                }else if(gs.dy < -200 && this.state.showHead){
                    this.setState({
                        showHead: false
                    })
                }
            }
        })
    }

    render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return (
            <View style={styles.container} {...this._panResponder.panHandlers}>
                <View style={[styles.headerBg,{backgroundColor:this.state.theme.themeColor}]}></View>
                {this.state.showHead?(
                    <View style={{width:'100%',alignItems:'center'}}>
                        <Animatable.View
                            style={styles.headCard}
                            animation="fadeInDown"
                            useNativeDriver={true}
                        >
                            <View style={styles.headCardType}>
                                <TouchableOpacity 
                                    style={styles.headCardTypeList}
                                    onPress={()=>{this.setState({showSale:true})}}
                                >
                                    <Image 
                                        style={[styles.headCardTypeImg,{tintColor:this.state.showSale?this.state.theme.themeColor:'#ddd'}]} 
                                        source={require('../../image/icon/orther/open_order_01.png')} 
                                    />
                                    <Text style={{fontSize:px2dp(28),color:this.state.showSale?this.state.theme.themeColor:'#999'}}>销售</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.headCardTypeList}
                                    onPress={()=>{this.setState({showSale:false})}}
                                >
                                    <Image 
                                        style={[styles.headCardTypeImg,{tintColor:!this.state.showSale?this.state.theme.themeColor:'#ddd'}]} 
                                        source={require('../../image/icon/orther/open_order_02.png')} 
                                    />
                                    <Text style={{fontSize:px2dp(28),color:!this.state.showSale?this.state.theme.themeColor:'#999'}}>进货</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headBillType}>
                                <TouchableOpacity style={styles.headBillBtn} onPress={()=>{this.setState({saleType:0})}}>
                                    <View style={[styles.headBillList,{backgroundColor:this.state.saleType===0?this.state.theme.themeColor:'#fff',borderColor:this.state.saleType===0?this.state.theme.themeColor:'#e7e7e7'}]}>
                                        <Text style={{fontSize:px2dp(24),color:this.state.saleType===0?'#fff':'#999'}}>出货</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headBillBtn} onPress={()=>{this.setState({saleType:1})}}>
                                    <View style={[styles.headBillList,{backgroundColor:this.state.saleType===1?this.state.theme.themeColor:'#fff',borderColor:this.state.saleType===1?this.state.theme.themeColor:'#e7e7e7'}]}>
                                        <Text style={{fontSize:px2dp(24),color:this.state.saleType==1?'#fff':'#999'}}>退货</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headBillBtn} onPress={()=>{this.setState({saleType:2})}}>
                                    <View style={[styles.headBillList,{backgroundColor:this.state.saleType===2?this.state.theme.themeColor:'#fff',borderColor:this.state.saleType===2?this.state.theme.themeColor:'#e7e7e7'}]}>
                                        <Text style={{fontSize:px2dp(24),color:this.state.saleType===2?'#fff':'#999'}}>收款</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.headBillTime}>
                                <Text style={[styles.fontEBlack,{flex:1}]}>时间</Text>
                                <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>2019-02-27</Text>
                                <Image style={styles.headBillMore} source={require('../../image/icon/orther/more.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.headBillTime,{borderBottomWidth:0}]}>
                                <Text style={[styles.fontEBlack,{flex:1}]}>客户</Text>
                                <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>零售客户</Text>
                                <Image style={styles.headBillMore} source={require('../../image/icon/orther/more.png')} />
                            </TouchableOpacity>
                        </Animatable.View>
                    </View>):
                (
                    <View style={{height:px2dp(177),backgroundColor:'#ec5151',top:px2dp(-122)}}>
                        <Text>111</Text>
                    </View>
                )}
                <View style={{flex:1,marginTop: px2dp(-96)}}>
                    <ScrollView>
                        <Animatable.View 
                            style={styles.shopMain}
                            animation="fadeInDown"
                            useNativeDriver={true}
                        >
                            <View style={styles.shopMainHead}>
                                <Text style={styles.fontEBlack}>选中商品（2）</Text>
                                <Text style={styles.fontEGrey}>合计金额：￥100.00</Text>
                            </View>
                            <View style={styles.shopAdd}>
                                <View style={styles.shopAddList}>
                                    <TouchableOpacity style={[styles.shopAddIconBtn,{backgroundColor:'#00c2c4'}]}>
                                        <Image style={{width:px2dp(53),height:px2dp(48)}} source={require('../../image/icon/orther/open_order_03.png')} />
                                        <Text style={styles.shopAddIconText}>扫描商品</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.shopAddIconBtn,{backgroundColor:'#f2b737',marginLeft:px2dp(68)}]}>
                                        <Image style={{width:px2dp(51),height:px2dp(50)}} source={require('../../image/icon/orther/open_order_04.png')} />
                                        <Text style={styles.shopAddIconText}>添加商品</Text>
                                    </TouchableOpacity>
                                </View>
                                <SwipeListView
                                    dataSource={ds.cloneWithRows(this.state.shopList)}
                                    disableRightSwipe={true}    // 禁止向右滑动
                                    enableEmptySections={true}
                                    rightOpenValue={px2dp(-120)}    //  右侧便宜量
                                    previewOpenValue={1}    // 侧滑打开动画的速度
                                    tension={1} // 打开动画的张力
                                    renderRow={this.renderShopList.bind(this)}
                                    renderHiddenRow={ data => (
                                        <View style={styles.rowBack}>
                                            <View></View>
                                            <View style={styles.rowBackBtn}>
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
                            </View>
                        </Animatable.View>
                        {this.state.shopList.length>0&&(
                            <View style={styles.shopAddExplain}>
                                <TouchableOpacity style={styles.headBillTime}>
                                    <Text style={[styles.fontEBlack,{flex:1}]}>折后应付</Text>
                                    <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>1258.50</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headBillTime}>
                                    <Text style={[styles.fontEBlack,{flex:1}]}>折扣率</Text>
                                    <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>4.28%</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.headBillTime}>
                                    <Text style={[styles.fontEBlack,{flex:1}]}>本单实付</Text>
                                    <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>1258.50</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.headBillTime,{borderBottomWidth:0}]}>
                                    <Text style={[styles.fontEBlack,{flex:1}]}>结算账户</Text>
                                    <Text style={[styles.fontEGrey,{marginRight:px2dp(28)}]}>现金</Text>
                                    <Image style={styles.headBillMore} source={require('../../image/icon/orther/addshop_01.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>
                </View>
                <View style={[styles.bottomNav,{backgroundColor:this.state.theme.themeColor}]}>
                    <TouchableOpacity style={styles.bottomNavList}>
                        <Image style={{width:px2dp(40),height:px2dp(40)}} source={require('../../image/icon/orther/open_order_05.png')} />
                        <Text style={styles.bottomNavText}>再记一笔</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomNavLine} ></View>
                    <TouchableOpacity style={styles.bottomNavList}>
                        <Image style={{width:px2dp(34),height:px2dp(43)}} source={require('../../image/icon/orther/open_order_06.png')} />
                        <Text style={styles.bottomNavText}>收银</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomNavLine} ></View>
                    <TouchableOpacity style={styles.bottomNavList}>
                        <Image style={{width:px2dp(39),height:px2dp(39)}} source={require('../../image/icon/orther/open_order_07.png')} />
                        <Text style={styles.bottomNavText}>保存</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );  
    }

    // 库存商品列表
    renderShopList(item,s1,index) {
        let data = item.item;
        return(
            <View style={[styles.shopList,{borderBottomWidth:this.state.shopList.length==index+1?0:px2dp(null,1)}]}>
                <Image style={styles.shopListImg} source={require('../../image/temporary/search_img.jpg')} />
                <View style={styles.shopListDet}>
                    <Text style={styles.fontFBlack} numberOfLines={1} >一对装】南极人全棉枕头枕芯羽丝绒成</Text>
                    <View style={styles.shopTextFormat}>
                        <Text style={styles.fontFGrey}>数量：1.00套</Text>
                    </View>
                    <View style={[styles.shopTextFormat,{marginTop:px2dp(5)}]}>
                    <Text style={styles.fontFGrey}>价格：￥8.88</Text>
                    </View>
                </View>
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
    },
    fontFGrey: {
        fontSize: px2dp(24),
        color: '#999',
    },
    fontEBlack: {
        fontSize: px2dp(28),
        color: '#333',
    },
    fontEGrey: {
        fontSize: px2dp(28),
        color: '#999',
    },
    headerBg: {
        height: px2dp(140),
    },
    // 顶部卡片
    headCard: {
        backgroundColor: '#fff',
        width: px2dp(710),
        height: px2dp(440),
        borderRadius: px2dp(6),
        position: 'relative',
        top: px2dp(-122),
        zIndex: 10,
    },
    headCardType: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(174),
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
    },
    headCardTypeList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headCardTypeImg: {
        width: px2dp(88),
        height: px2dp(88),
        marginBottom: px2dp(5),
    },
    headBillType: {
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(88),
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
    },
    headBillBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headBillList: {
        width: px2dp(158),
        height: px2dp(56),
        borderWidth: px2dp(null,1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px2dp(6),
    },
    headBillTime: {
        height: px2dp(88),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
        padding: px2dp(20),
    },
    headBillMore: {
        width: px2dp(15),
        height: px2dp(26),
    },
    // 订单详情
    shopMain: {
        backgroundColor: '#fff',
        marginBottom: px2dp(20),
    },
    shopMainHead: {
        height: px2dp(96),
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: px2dp(20),
    },
    shopAdd: {
        padding: px2dp(20),
        paddingBottom: 0,
    },
    shopAddList: {
        height: px2dp(150),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
    },
    shopAddIconBtn: {
        width: px2dp(110),
        height: px2dp(110),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px2dp(6),
    },
    shopAddIconText: {
        fontSize: px2dp(22),
        color: '#fff',
        marginTop: px2dp(10),
    },
    // 商品列表
    shopList: {
        height: px2dp(162),
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
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
        marginTop: px2dp(15),
    },
    rowBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rowBackBtn: {
        flexDirection: 'row',
        width: px2dp(120),
        height: px2dp(161),
    },
    leftView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 更多信息
    shopAddExplain: {
        backgroundColor: '#fff',
        marginBottom: px2dp(108),
    },
    // 底部导航
    bottomNav: {
        height: px2dp(98),
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: '#57beff',
        position: 'absolute',
        bottom: 0,
    },
    bottomNavList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNavLine: {
        width: px2dp(null,1),
        height: '100%',
        backgroundColor: '#fff',
    },
    bottomNavText: {
        fontSize: px2dp(24),
        color: '#fff',
        marginTop: px2dp(5),
    }
});
