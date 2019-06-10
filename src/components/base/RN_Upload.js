import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import RNFileSelector from 'react-native-file-selector'
// import { ActionSheet, Toast, Modal } from 'antd-mobile-rn'
import { px2dp } from '../../utils/common'

/**
 *https://www.jianshu.com/p/166ad6661d3a
 *
 * @export
 * @class RNUpload
 * @extends {Component}
 */
export default class RNUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showFile() {
    console.log(43)
    // RNFileSelector.Show({
    //   title: '文件上传',
    //   onDone: path => {
    //     console.log('file selected: ' + path)
    //   },
    //   onCancel: () => {
    //     console.log('cancelled')
    //   }
    // })
    this.setState({ visible: true })

    // Toast.hide()
    // let that = this
    // const BUTTONS = ['拍摄', '选择图片', '选择文件', '取消']
    // ActionSheet.showActionSheetWithOptions(
    //   {
    //     maskClosable: false,
    //     options: BUTTONS,
    //     cancelButtonIndex: 3
    //   },
    //   buttonIndex => {
    //     if (BUTTONS[buttonIndex] === '拍摄') {
    //       // Toast.loading('加载中...', 0)
    //       this.timer = setTimeout(() => {
    //         // that.upLoadImage('camera')
    //         console.log(`4324相机`)
    //       }, 200)
    //     } else if (BUTTONS[buttonIndex] === '选择图片') {
    //       // Toast.loading('加载中...', 0)
    //       that.timer = setTimeout(() => {
    //         // that.upLoadImage()
    //         console.log(`4324帐篷`)
    //       }, 200)
    //     } else if (BUTTONS[buttonIndex] === '选择文件') {
    //       // Toast.loading('加载中...', 0)
    //       that.timer = setTimeout(() => {
    //         // that.upLoadFile()
    //         console.log('324文件')
    //       }, 200)
    //     } else {
    //       console.log('取消')
    //     }
    //   }
    // )
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            marginLeft: px2dp(20),
            // backgroundColor: '#ff0',
            height: px2dp(30),
            justifyContent: 'center'
          }}
          onPress={this.showFile.bind(this)}
          // onPress={this._showDatePicker.bind(this)}
        >
          <Text>请选择</Text>
        </TouchableOpacity>

        <RNFileSelector
          title={'文件上传'}
          visible={this.state.visible}
          onDone={() => {
            console.log('file selected: ' + path)
          }}
          onCancel={() => {
            console.log('cancelled')
          }}
        />
      </View>
    )
  }
}
