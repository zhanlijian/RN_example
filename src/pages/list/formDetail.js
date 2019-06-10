import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'
import { px2dp } from '../../utils/common'
import HttpUtils from '../../services/api'
import * as Animatable from 'react-native-animatable'
import LeftBack from '../component/left_back'
import RNDate from '../../components/base/RN_Date'
// import RNUpload from '../../components/base/RN_Upload'
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: global.memory.theme,
      form: {},
      buttonList: [],
      struct: [],
      initData: {}
    }
  }

  componentWillMount() {
    this.getData()
  }

  // 获取业务流程信息
  async getData() {
    const {
      params: { id }
    } = this.props.navigation.state
    try {
      const {
        data: { form, buttonList, initData }
      } = await HttpUtils.postRequest(`/bpm/instance/getInstanceData`, {
        defId: id
      })
      console.log('业务流程信息', form, buttonList)
      this.setState(
        {
          form,
          buttonList,
          initData
        },
        () => {
          this.getFormInfo({
            'key_^VLK': form.formValue,
            'name_^VLK': form.name
          })
        }
      )
    } catch (error) {
      console.error('error', error)
    }
  }

  // 获取表单简介信息
  async getFormInfo(qry) {
    const { form } = this.state
    try {
      const { rows } = await HttpUtils.postRequest(
        `/form/formDef/listJson?formType=pc_iview`,
        qry
      )
      this.setState(
        {
          form: { ...form, ...rows[0] }
        },
        () => {
          console.log('表单简介信息', this.state.form)
          this.getFormStructure({ boKey: rows[0].boKey })
        }
      )
    } catch (error) {
      console.error('error', error)
    }
  }

  // 获取表单的结构信息
  async getFormStructure(qry) {
    try {
      const data = await HttpUtils.postRequest(`/form/formDef/boTreeData`, qry)
      console.log('表单的结构信息', data)
      this.setState(
        {
          struct: data
        }
        // () => {
        //   data.forEach(i => {
        //     if (i.relationType) {
        //       // this.getBusForm({ 'key_^VLK': i.alias })
        //     }
        //   })
        // }
      )
    } catch (error) {
      console.error('error', error)
    }
  }

  // // 获取实体信息
  // async getBusForm(qry) {
  //   try {
  //     const { rows } = await HttpUtils.postRequest(
  //       `/bus/businessObject/listJson`,
  //       qry
  //     )
  //     console.log('业务实体信息', rows[0])
  //     this.getBusObject({ key: rows[0].relation.tableKey, fill: 1 })
  //   } catch (error) {
  //     console.error('error', error)
  //   }
  // }

  // 获取实体字段信息
  async getBusObject(qry) {
    const { struct } = this.state
    try {
      const { data } = await HttpUtils.postRequest(
        `/bus/businessTable/getObject`,
        qry
      )
      struct.forEach(i => {
        data.columns.forEach(j => {
          if (i.key === j.key) {
            Object.assign(i, j)
          }
        })
      })

      console.log('字段', data, struct)
      this.setState({
        struct
      })
    } catch (error) {
      console.error('error', error)
    }
  }

  btnFunc = item => {
    console.log(item, this.state)
  }

  changeTxt = (text, item) => {
    console.log('blur', text, item)
    // const data = Object.assign({}, this.state[item.tableKey], {
    //   [item.key]: text
    // })
    // this.setState({ [item.tableKey]: data })
  }

  // 数据列表展示
  renderBillList({ item }) {
    return (
      <TouchableOpacity style={[styles.purchaseList]}>
        <View style={styles.purchaseListLeft}>
          <Text style={styles.fontTGrey} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={[styles.purchaseListRight]}>
          {item.type === 'varchar' ? (
            <TextInput
              placeholder=""
              onChangeText={text => this.changeTxt(text, item)}
            />
          ) : (
            <RNDate item={item} onChangeText={this.changeTxt} />
            // <RNUpload item={item} onChangeText={this.changeTxt} />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  // renderBillList({ item }) {
  //   {item.type === 'varchar' ? (
  //   return (
  //     <TouchableOpacity style={styles.purchaseList} key={item.key}>
  //       <View style={{ flex: 1 }}>
  //         {item.isHidden && item.key === 'schoolId' ? (
  //           <RNDate item={item} onChangeText={this.changeTxt} />
  //         ) : (
  //           <InputItem
  //             clear
  //             error
  //             onChange={text => this.changeTxt(text, item)}
  //             extra="元"
  //             placeholder=""
  //           >
  //             {item.name}
  //           </InputItem>
  //         )}
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }

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
            <Text style={styles.headTitle}>表单</Text>
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
            data={this.state.struct}
            keyExtractor={(item, index) => index} //  Key
            renderItem={this.renderBillList.bind(this)}
            showsVerticalScrollIndicator={false} // 不显示垂直滚动条
          />
        </View>

        {/* 按钮序列 */}
        <View
          style={[
            styles.bottomNav,
            { backgroundColor: this.state.theme.themeColor }
          ]}
        >
          {this.state.buttonList.map((i, index) => (
            <TouchableOpacity
              style={styles.bottomNavList}
              key={index}
              onPress={() => this.btnFunc(i)}
            >
              <Image
                style={{ width: px2dp(40), height: px2dp(40) }}
                source={require('../../image/icon/orther/open_order_05.png')}
              />
              <Text style={styles.bottomNavText}>{i.name}</Text>
            </TouchableOpacity>
            // <View style={styles.bottomNavLine} />
          ))}
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
    height: px2dp(120),
    flexDirection: 'row',
    alignItems: 'center',
    width: px2dp(710),
    paddingTop: px2dp(10),
    borderBottomWidth: px2dp(null, 1),
    borderBottomColor: '#e7e7e7'
  },
  purchaseListLeft: {
    width: px2dp(180),
    paddingLeft: px2dp(10)
  },
  purchaseListRight: {
    flex: 1
  },
  purchaseListImg: {
    width: px2dp(15),
    height: px2dp(26)
  },
  // 底部导航
  bottomNav: {
    height: px2dp(98),
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: '#57beff',
    position: 'absolute',
    bottom: 0
  },
  bottomNavList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomNavLine: {
    width: px2dp(null, 1),
    height: '100%',
    backgroundColor: '#fff'
  },
  bottomNavText: {
    fontSize: px2dp(24),
    color: '#fff',
    marginTop: px2dp(5)
  }
})
