/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 明细
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
    Animated,
} from 'react-native';
import { px2dp } from '../../utils/common';
import * as Animatable from 'react-native-animatable';
import LeftBack from '../component/left_back';
import PageScrollView from 'react-native-page-scrollview';

export default class Bill extends Component{
    static navigationOptions = ({ navigation }) => {
        let params = navigation.state.params || {};
        return {
            headerTitle: '明细',
            headerStyle: {
                backgroundColor: global.memory.theme.themeColor,
                height: px2dp(88),
                borderBottomColor: global.memory.theme.themeColor,
            },
            headerLeft: <LeftBack navigation={navigation} />,
            headerRight: 
            (<TouchableOpacity 
                style={{paddingRight:px2dp(20),width:px2dp(55),height:px2dp(88),justifyContent:'center'}}
                onPress={params.showDateFc}
            >
                <Image source={require('../../image/icon/orther/bill_04.png')} style={{width:px2dp(32),height:px2dp(36)}} />
            </TouchableOpacity>)
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            theme: global.memory.theme,
            animationType: 'fadeInUpBig',   //  动画类型
            showSale: true,    //  是否显示销售明细，否则显示进货明细
            showDate: false,    //  是否显示日期
            saleList: [  //  销售列表
                [1,1,1,1,1,1,1],    //  出货数据
                [1,1,1],    //  退货数据
                [],    //  订单列表
                [1,1], //  收款数据
            ], 
            purchaseList: [  //  进货列表
                [1,1,1,1,1,1,1,1,1,1],    //  进货数据
                [1,1,1],    //  退货数据
                [], //  支付数据
            ], 
            saleTop: new Animated.Value(0),   //  销售明细按钮位置
            purchaseTop: new Animated.Value(0),   //  进货明细按钮位置
            saleOp: 1,   //  销售明细按钮透明度
            purchaseOp: 0.4,   //  进货明细按钮透明度
            triangleColor: '#49c9fe',   //  三角形颜色
            saleType: 0,    //  销售明细类型列表,0=进货，1=退货，2=付款
            purchaseType: 0,    //  进货明细类型列表，0=进货，2=退货，3=订单，4=收款
            swiperIndex: 0, //  当前滑动组件显示下标
        }
        this.timeOut = setTimeout(() => {
            this.animationListFlag = true;
        }, 1050)
    }

    componentWillMount() {
        // 将筛选日期选项设到父组件参数上
        this.props.navigation.setParams({ showDateFc: this._showDateFc });
    }
    
    // 显示日期
    _showDateFc = () => {
        // this.setState({ showDate: !this.state.showDate });
    };

    // 切换进货&销售列表
    changeSale(type) {
        // type-->false进货，ture销售
        if(this.state.showSale === type || !this.animationListFlag) return;
        if(type){
            this.purchasePage.manualScrollToPage(0);
            this.setState({
                triangleColor: '#49c9fe',
                saleOp: 1,
                purchaseOp: 0.4,
            })
            Animated.timing(                            
                this.state.saleTop,
                {
                    toValue: 0,
                    useNativeDriver: true,   //  使用原生动画驱动 
                }
            ).start();
            Animated.timing(                            
                this.state.purchaseTop,
                {
                    toValue: 0,
                    useNativeDriver: true,
                }
            ).start();
        }else{
            this.salePage.manualScrollToPage(0);
            this.setState({
                triangleColor: '#ffa95d',
                saleOp: 0.4,
                purchaseOp: 1,
            })
            Animated.timing(                            
                this.state.saleTop,
                {
                    toValue: px2dp(88),
                    useNativeDriver: true,
                }
            ).start();
            Animated.timing(                            
                this.state.purchaseTop,
                {
                    toValue: px2dp(-88),
                    useNativeDriver: true,
                }
            ).start();
        }
        this.animationListFlag = false;
        this.setState({
            animationType: "fadeInUpBig",
            showSale: type, // 切换显示
        })
        this.timeOut = setTimeout(() => {
            this.animationListFlag = true;
        }, 1050)
    }

    componentWillUnmount() {
        this.timeOut && clearTimeout(this.timeOut);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showSale?this.renderSaleView():this.renderPurchaseView()}
                {/**底部切换显示状态**/}
                <View style={styles.billType}>
                    <View style={{alignItems:'center',height:px2dp(25)}}>
                        <Animatable.View 
                            animation={this.state.animationType} 
                            duration={500} 
                            easing="ease-in-quint" 
                            useNativeDriver={true}  
                            style={[styles.billTypeThi,{borderBottomColor:this.state.triangleColor}]}
                        >
                        </Animatable.View>
                    </View>
                    <Animated.View style={[styles.billTypeList,{backgroundColor:'#49c9fe',transform:[{translateY:this.state.saleTop}]}]}>
                        <TouchableOpacity
                            activeOpacity={this.state.saleOp} 
                            style={[styles.billTypeBtn,{}]}
                            onPress={()=>{this.changeSale(true)}}
                        >
                            <Image style={styles.billTypeImg} source={require('../../image/icon/orther/bill_01.png')} />
                            <View style={styles.billTypeDet}>
                                <Text style={styles.billTypeText}>销售明细</Text>
                                <Text style={styles.billTypeDate}>2019-02</Text>
                            </View>
                            <Text style={styles.billTypeText}>1500.00</Text>
                            <Image style={styles.billTypeMoney} source={require('../../image/icon/orther/bill_03.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.billTypeList,{transform:[{translateY:this.state.purchaseTop}]}]}>
                        <TouchableOpacity 
                            activeOpacity={this.state.purchaseOp} 
                            style={[styles.billTypeBtn]} 
                            onPress={()=>{this.changeSale(false)}}
                        >
                            <Image style={styles.billTypeImg} source={require('../../image/icon/orther/bill_02.png')} />
                            <View style={styles.billTypeDet}>
                                <Text style={styles.billTypeText}>进货明细</Text>
                                <Text style={styles.billTypeDate}>2019-02</Text>
                            </View>
                            <Text style={styles.billTypeText}>1500.00</Text>
                            <Image style={styles.billTypeMoney} source={require('../../image/icon/orther/bill_03.png')} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }

    // 销售明细
    renderSaleView() {
        return(
            <Animatable.View
                animation={this.state.animationType} 
                useNativeDriver={true} 
                style={{flex:1}}
                onAnimationEnd={()=>{
                    this.setState({animationType:''})
                }}
            >
                <View style={styles.headNav}>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.saleType===0?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.salePage.manualScrollToPage(0);
                            this.setState({saleType:0});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.saleType===0?'#4994fe':'#333'}]}>出货</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.saleType===1?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.salePage.manualScrollToPage(1);
                            this.setState({saleType:1});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.saleType===1?'#4994fe':'#333'}]}>退货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.saleType===2?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.salePage.manualScrollToPage(2);
                            this.setState({saleType:2});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.saleType===2?'#4994fe':'#333'}]}>订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.saleType===3?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.salePage.manualScrollToPage(3);
                            this.setState({saleType:3});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.saleType===3?'#4994fe':'#333'}]}>收款</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.search}>
                    <View style={styles.searchBg}>
                        <Image source={require('../../image/icon/orther/inventory_03.png')} style={styles.searchImg} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="按订单号/客户名称" 
                            placeholderTextColor="#999" 
                            underlineColorAndroid='transparent' 
                            clearButtonMode='while-editing'
                            selectionColor={this.state.theme.themeColor}
                        />
                    </View>
                </View>
                <PageScrollView
                    style={styles.purchase}
                    ifShowPointerView={false}   //  是否显示指示器
                    ifAutoScroll={false} //  是否自动切换
                    ifInfinite={false}   //  是否无限滚动
                    datas={this.state.saleList}   //  轮播的数据
                    ref={(ps)=>{this.salePage=ps}}
                    currentPageChangeFunc={(index)=>{
                        this.setState({
                            saleType: index
                        })
                    }}
                    view={(i,data)=>{
                        return(
                            this.saleItemsRender(data)
                        );
                    }}
                />
            </Animatable.View>
        )
    }

    // 进货明细
    renderPurchaseView() {
        return(
            <Animatable.View  
                animation={this.state.animationType} 
                useNativeDriver={true} name="animateList" 
                style={{flex:1}}
                onAnimationEnd={()=>{
                    this.setState({animationType:''})
                }}
            >
                <View style={styles.headNav}>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.purchaseType===0?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.purchasePage.manualScrollToPage(0);
                            this.setState({purchaseType:0});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.purchaseType===0?'#4994fe':'#333'}]}>进货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.purchaseType===1?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.purchasePage.manualScrollToPage(1);
                            this.setState({purchaseType:1});
                        }}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.purchaseType===1?'#4994fe':'#333'}]}>退货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.headNavList,{borderBottomColor:this.state.purchaseType===2?'#4994fe':'#fff'}]}
                        onPress={()=>{
                            this.purchasePage.manualScrollToPage(2);
                            this.setState({purchaseType:2})}}
                    >
                        <Text style={[styles.fontEBlack,{color:this.state.purchaseType===2?'#4994fe':'#333'}]}>付款</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.search}>
                    <View style={styles.searchBg}>
                        <Image source={require('../../image/icon/orther/inventory_03.png')} style={styles.searchImg} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="按订单号/客户名称" 
                            placeholderTextColor="#999" 
                            underlineColorAndroid='transparent' 
                            clearButtonMode='while-editing'
                            selectionColor={this.state.theme.themeColor}
                        />
                    </View>
                </View>
                <PageScrollView
                    style={styles.purchase}
                    ifShowPointerView={false}   //  是否显示指示器
                    ifAutoScroll={false} //  是否自动切换
                    ifInfinite={false}   //  是否无限滚动
                    ref={(ps)=>{this.purchasePage=ps}}
                    currentPageChangeFunc={(index)=>{
                        this.setState({
                            purchaseType: index 
                        })
                    }}
                    datas={this.state.purchaseList}   //  轮播的数据
                    view={(i,data)=>{
                        return(
                            this.saleItemsRender(data)
                        );
                    }}
                />
            </Animatable.View>
        )
    }

    // 销售明细列表
    saleItemsRender(saleArr) {
        if(saleArr.length > 0){
            return(
                <View style={styles.purchaseMain}>
                    <FlatList
                        data={saleArr}
                        keyExtractor={(item, index) => index}   //  Key
                        renderItem={this.renderBillList.bind(this)}
                        showsVerticalScrollIndicator={false}   // 不显示垂直滚动条
                    />
                </View>
            )
        }else{
            return this.noBillList();
        }
    }

    // 数据列表展示
    renderBillList(item) {
        return(
            <TouchableOpacity style={styles.purchaseList}>
                <View style={styles.purchaseListLeft}>
                    <Text style={styles.fontTGrey} numberOfLines={1}>2019-02-22</Text>
                    <Text style={[styles.fontEBlack,{marginBottom:px2dp(5),marginTop:px2dp(5)}]} numberOfLines={1}>零售客户</Text>
                    <Text style={styles.fontTGrey} numberOfLines={1}>LX20190222001</Text>
                </View>
                <View style={styles.purchaseListRight}>
                    <Text style={[styles.fontEBlack,{marginBottom:px2dp(5)}]} numberOfLines={1}>￥22.00</Text>
                    <Text style={styles.fontTGrey} numberOfLines={1}>已付款</Text>
                </View>
                <Image style={styles.purchaseListImg} source={require('../../image/icon/orther/addshop_01.png')} />
            </TouchableOpacity>
        )
    }

    // 无列表展示
    noBillList() {
        return(
            <View style={styles.noShopList}>
                <Image style={styles.noShopListImg} source={require('../../image/static/no_list.png')} />
                <Text style={[styles.fontTGrey,{marginTop:px2dp(40)}]}>暂无数据</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    fontEBlack: {
        fontSize: px2dp(28),
        color: '#333',
    },
    fontTGrey: {
        fontSize: px2dp(22),
        color: '#999',
    },
    // 头部导航
    headNav: {
        height: px2dp(88),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#e7e7e7',
        borderBottomWidth: px2dp(null,1),
    },
    headNavList: {
        flex: 1,
        height: px2dp(87),
        borderBottomWidth: px2dp(null,1),
        borderBottomColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 搜索框
    search: {
        paddingTop: px2dp(28),
        alignItems: 'center',
        backgroundColor: '#fff',
    },  
    searchBg: {
        width: px2dp(710),
        height: px2dp(60),
        backgroundColor: '#f6f6f6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(28),
        paddingRight: px2dp(28),
        borderRadius: px2dp(30),
    },
    searchInput: {
        flex: 1,
        padding: 0,
        fontSize: px2dp(28),
    },
    searchImg: {
        width: px2dp(31),
        height: px2dp(31),
        marginRight: px2dp(11),
    },
    // 列表
    purchase: {
        flex: 1,
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        backgroundColor: '#fff',
    },
    purchaseMain: {
        flex: 1,
        alignItems: 'center',
    },
    purchaseList:{
        height: px2dp(157),
        flexDirection: 'row',
        alignItems: 'center',
        width: px2dp(710),
        paddingTop: px2dp(10),
        borderBottomWidth: px2dp(null,1),
        borderBottomColor: '#e7e7e7',
    },
    purchaseListLeft: {
        width: px2dp(519),
    },
    purchaseListRight: {
        flex: 1,
    },
    purchaseListImg: {
        width: px2dp(15),
        height: px2dp(26),
    },
    // 无数据展示
    noShopList: {
        flex: 1,
        width: px2dp(710),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    noShopListImg: {
        width: px2dp(334),
        height: px2dp(295),
    },
    // 底部分类按钮
    billType: {
        backgroundColor: '#f6f6f6',
    },
    billTypeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
    },
    billTypeList: {
        height: px2dp(88),
        backgroundColor: '#ffa95d',
        justifyContent: 'center',
    },
    billTypeImg: {
        width: px2dp(72),
        height: px2dp(72),
        marginRight: px2dp(26),
    },
    billTypeDet: {
        flex: 1,
        justifyContent: 'center',
    },
    billTypeText: {
        fontSize: px2dp(28),
        color: '#fff',
    },
    billTypeDate: {
        fontSize: px2dp(24),
        color: '#fff',
    },
    billTypeMoney: {
        width: px2dp(26),
        height: px2dp(26),
        marginLeft: px2dp(14),
    },
    billTypeThi: {
        width:0,
        height:0,
        borderStyle:'solid',    
        borderWidth:px2dp(39),
        borderTopColor:'transparent',  //下箭头颜色
        borderLeftColor:'transparent', //右箭头颜色
        borderRightColor:'transparent',    //左箭头颜色
        position: 'absolute',
        top: px2dp(-39),
        left: '50%',
        marginLeft: px2dp(-39),
    }
});
