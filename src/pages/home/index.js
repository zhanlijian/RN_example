/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 首页
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native'
import { px2dp } from '../../utils/common'
import PageScrollView from 'react-native-page-scrollview'
import * as Animatable from 'react-native-animatable'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [1, 2, 3, 4], //  公告列表
      theme: global.memory.theme
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/**顶部导航栏**/}
        <Animatable.View
          style={[
            styles.head,
            { backgroundColor: this.state.theme.themeColor }
          ]}
          animation="fadeInDown"
          useNativeDriver={true}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login')
            }}
          >
            <Image
              source={require('../../image/icon/home/head_1.png')}
              style={styles.headImg}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../image/icon/home/head_2.png')}
              style={styles.headImg}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../image/icon/home/head_3.png')}
              style={styles.headImg}
            />
          </TouchableOpacity>
        </Animatable.View>
        <ScrollView>
          {/**头部卡片内容**/}
          <Animatable.View
            style={styles.headCard}
            animation="pulse"
            useNativeDriver={true}
          >
            <ImageBackground
              style={styles.headCardBg}
              source={require('../../image/icon/home/title_bg.png')}
            >
              <Text style={styles.headCardTitle}>今日销售额（元）</Text>
              <Text style={styles.headCardPrice}>0.00</Text>
              <Text style={styles.headCardAll}>本月总收入：100000.00元</Text>
            </ImageBackground>
          </Animatable.View>
          <Animatable.View
            animation="pulse"
            useNativeDriver={true}
            style={styles.headNumber}
          >
            <TouchableOpacity style={styles.headNumList}>
              <Text style={styles.fontEGray}>0.00</Text>
              <Text style={styles.headNumText}>今日利润</Text>
            </TouchableOpacity>
            <View style={styles.headNumLine} />
            <TouchableOpacity style={styles.headNumList}>
              <Text style={styles.fontEGray}>0.00</Text>
              <Text style={styles.headNumText}>今日支出</Text>
            </TouchableOpacity>
            <View style={styles.headNumLine} />
            <TouchableOpacity style={styles.headNumList}>
              <Text style={styles.fontEGray}>0.00</Text>
              <Text style={styles.headNumText}>本月利润</Text>
            </TouchableOpacity>
          </Animatable.View>
          {/**公告**/}
          <Animatable.View
            animation="fadeInUp"
            useNativeDriver={true}
            style={styles.notice}
          >
            <Image
              style={styles.noticeImg}
              source={require('../../image/icon/home/icon01.png')}
            />
            <PageScrollView
              style={styles.noticeSwiper}
              HorV="v" //  垂直滚动
              ifShowPointerView={false} //  是否显示指示器
              datas={this.state.noticeList} //  轮播的数据
              infiniteInterval={2500} //  切换的时间，毫秒
              ifShowPointerView={false} //  用户禁止滚动
              view={(i, data) => {
                return (
                  <TouchableOpacity style={styles.noticeBtn} key={i}>
                    <Text style={styles.noticeText} numberOfLines={1}>
                      公告：{i + 1}
                      .根据会员卡使用规则，商城对2017年会员积分进行清除
                    </Text>
                  </TouchableOpacity>
                )
              }}
            />
          </Animatable.View>
          {/**快捷页面入口**/}
          <Animatable.View
            animation="fadeInUp"
            useNativeDriver={true}
            style={styles.navAll}
          >
            <TouchableOpacity
              style={styles.navList}
              onPress={() => {
                this.props.navigation.navigate('List')
              }}
            >
              <Image
                source={require('../../image/icon/home/icon02.png')}
                style={{ width: px2dp(45), height: px2dp(43) }}
              />
              <Text style={styles.navListText}>客户</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon03.png')}
                style={{ width: px2dp(48), height: px2dp(46) }}
              />
              <Text style={styles.navListText}>收银</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon04.png')}
                style={{ width: px2dp(48), height: px2dp(46) }}
              />
              <Text style={styles.navListText}>账户</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon05.png')}
                style={{ width: px2dp(45), height: px2dp(41) }}
              />
              <Text style={styles.navListText}>供应商</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon06.png')}
                style={{ width: px2dp(42), height: px2dp(42) }}
              />
              <Text style={styles.navListText}>扫码开单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon07.png')}
                style={{ width: px2dp(45), height: px2dp(41) }}
              />
              <Text style={styles.navListText}>账单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon08.png')}
                style={{ width: px2dp(43), height: px2dp(41) }}
              />
              <Text style={styles.navListText}>进货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList}>
              <Image
                source={require('../../image/icon/home/icon09.png')}
                style={{ width: px2dp(42), height: px2dp(42) }}
              />
              <Text style={styles.navListText}>统计</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navList} />
          </Animatable.View>
          <View style={{ height: px2dp(141) }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fontEGray: {
    fontSize: px2dp(28),
    color: '#999'
  },
  // 顶部导航
  head: {
    height: px2dp(88),
    alignItems: 'center',
    flexDirection: 'row'
  },
  headImg: {
    width: px2dp(60),
    height: px2dp(60),
    marginLeft: px2dp(20)
  },
  // 头部卡片
  headCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(21)
  },
  headCardBg: {
    width: px2dp(714),
    height: px2dp(233),
    padding: px2dp(22)
  },
  headCardTitle: {
    backgroundColor: 'transparent',
    fontSize: px2dp(28),
    color: '#fff'
  },
  headCardPrice: {
    backgroundColor: 'transparent',
    fontSize: px2dp(45),
    color: '#fff'
  },
  headCardAll: {
    backgroundColor: 'transparent',
    fontSize: px2dp(24),
    color: '#fff',
    marginTop: px2dp(50)
  },
  headNumber: {
    height: px2dp(145),
    flexDirection: 'row',
    alignItems: 'center'
  },
  headNumList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headNumText: {
    fontSize: px2dp(28),
    color: '#333',
    marginTop: px2dp(20)
  },
  headNumLine: {
    width: px2dp(null, 1),
    height: px2dp(47),
    backgroundColor: '#e7e7e7'
  },
  // 公告
  notice: {
    height: px2dp(81),
    backgroundColor: '#f6f6f6',
    flexDirection: 'row',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(18),
    alignItems: 'center'
  },
  noticeImg: {
    width: px2dp(41),
    height: px2dp(34),
    marginRight: px2dp(14)
  },
  noticeSwiper: {
    flex: 1
  },
  noticeBtn: {
    flex: 1,
    height: px2dp(81),
    justifyContent: 'center'
  },
  noticeText: {
    fontSize: px2dp(24),
    color: '#333'
  },
  // 快捷页面入口
  navAll: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  navList: {
    width: px2dp(250),
    height: px2dp(189),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: px2dp(null, 1),
    borderBottomColor: '#e7e7e7'
  },
  navListText: {
    fontSize: px2dp(28),
    color: '#999',
    marginTop: px2dp(20)
  }
})
