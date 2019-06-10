import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { px2dp } from '../../utils/common'
import HttpUtils from '../../services/api'
import * as Animatable from 'react-native-animatable'
import LeftBack from '../component/left_back'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeList: [], //  公告列表
      theme: global.memory.theme
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    try {
      const { rows } = await HttpUtils.postRequest(`/bpm/my/definitionList`, {
        order: 'asc'
      })
      console.log(rows)
      this.setState({
        noticeList: rows
      })
    } catch (error) {
      console.error('error', error)
    }
  }

  // 数据列表展示
  renderBillList({ item }) {
    return (
      <TouchableOpacity
        style={styles.purchaseList}
        onPress={() => {
          this.props.navigation.navigate('FormDetail', item)
        }}
      >
        <View style={styles.purchaseListLeft}>
          <Text style={styles.fontTGrey} numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.fontEBlack,
              { marginBottom: px2dp(5), marginTop: px2dp(5) }
            ]}
            numberOfLines={1}
          >
            {item.status}
          </Text>
        </View>
        <View style={styles.purchaseListRight}>
          <Text
            style={[styles.fontEBlack, { marginBottom: px2dp(5) }]}
            numberOfLines={1}
          >
            {item.createTime}
          </Text>
          <Text style={styles.fontTGrey} numberOfLines={1}>
            {item.key}
          </Text>
        </View>
        <Image
          style={styles.purchaseListImg}
          source={require('../../image/icon/orther/addshop_01.png')}
        />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <Animatable.View
        animation="slideInDown"
        useNativeDriver={true}
        style={styles.container}
      >
        {/**顶部导航栏**/}
        <View
          style={[
            styles.head,
            { backgroundColor: this.state.theme.themeColor }
          ]}
        >
          <LeftBack navigation={this.props.navigation} />
          <View>
            <Text style={styles.headTitle}>流程列表</Text>
          </View>
          <TouchableOpacity style={styles.headIcon}>
            <Image
              source={require('../../image/icon/orther/inventory_02.png')}
              style={{ width: px2dp(39), height: px2dp(39) }}
            />
          </TouchableOpacity>
        </View>
        {/* 列表 */}
        <View style={styles.purchaseMain}>
          <FlatList
            data={this.state.noticeList}
            keyExtractor={(item, index) => index} //  Key
            renderItem={this.renderBillList.bind(this)}
            showsVerticalScrollIndicator={false} // 不显示垂直滚动条
          />
        </View>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  head: {
    height: px2dp(88),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  fontFBlack: {
    fontSize: px2dp(24),
    color: '#333',
    width: px2dp(500),
    marginBottom: px2dp(15)
  },
  fontFGrey: {
    fontSize: px2dp(24),
    color: '#999'
  },
  headIcon: {
    padding: px2dp(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  headTitle: {
    fontSize: px2dp(34),
    color: '#fff'
  },
  headImg: {
    width: px2dp(60),
    height: px2dp(60)
  },
  purchaseMain: {
    flex: 1,
    alignItems: 'center'
  },
  purchaseList: {
    height: px2dp(157),
    flexDirection: 'row',
    alignItems: 'center',
    width: px2dp(710),
    paddingTop: px2dp(10),
    borderBottomWidth: px2dp(null, 1),
    borderBottomColor: '#e7e7e7'
  },
  purchaseListLeft: {
    width: px2dp(350)
  },
  purchaseListRight: {
    flex: 1
  },
  purchaseListImg: {
    width: px2dp(15),
    height: px2dp(26)
  }
})
