import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { px2dp } from '../../utils/common'
import Picker from 'react-native-picker'
export default class RNDate extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _createDateData() {
    let date = []
    for (let i = 1970; i < 2020; i++) {
      let month = []
      for (let j = 1; j < 13; j++) {
        let day = []
        if (j === 2) {
          for (let k = 1; k < 29; k++) {
            day.push(k + '日')
          }
          if (i % 4 === 0) {
            day.push(29 + '日')
          }
        } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
          for (let k = 1; k < 32; k++) {
            day.push(k + '日')
          }
        } else {
          for (let k = 1; k < 31; k++) {
            day.push(k + '日')
          }
        }
        let _month = {}
        _month[j + '月'] = day
        month.push(_month)
      }
      let _date = {}
      _date[i + '年'] = month
      date.push(_date)
    }
    return date
  }

  _showDatePicker() {
    Picker.init({
      pickerData: this._createDateData(),
      pickerFontColor: [255, 0, 0, 1],
      pickerTitleText: '日期选择器',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: (pickedValue, pickedIndex) => {
        // console.log('date', pickedValue, pickedIndex)
        this.setState({
          [this.props.item.key]: pickedValue
        })
        this.props.onChangeText(pickedValue, this.props.item)
        Picker.hide()
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        // console.log('date', pickedValue, pickedIndex)
        Picker.hide()
      },
      onPickerSelect: (pickedValue, pickedIndex) => {
        // console.log('date11', pickedValue, pickedIndex)
      }
    })
    Picker.show()
  }

  _showTimePicker() {
    let years = [],
      months = [],
      days = [],
      hours = [],
      minutes = []

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980 + '年')
    }
    for (let i = 1; i < 13; i++) {
      months.push(i + '月')
    }
    for (let i = 1; i < 32; i++) {
      days.push(i + '日')
    }
    for (let i = 0; i < 24; i++) {
      hours.push(i + '时')
    }
    for (let i = 0; i < 60; i++) {
      minutes.push(i + '分')
    }
    let pickerData = [years, months, days, hours, minutes]
    let date = new Date()
    let selectedValue = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      // date.getHours() > 11 ? 'pm' : 'am',
      date.getHours() === 12 ? 12 : date.getHours() % 12,
      date.getMinutes()
    ]
    Picker.init({
      pickerData,
      selectedValue,
      pickerTitleText: '时间选择器',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      wheelFlex: [2, 1, 1, 2, 1],
      onPickerConfirm: pickedValue => {
        this.setState({
          [this.props.item.key]: pickedValue
        })
        this.props.onChangeText(pickedValue, this.props.item)
        Picker.hide()
      },
      onPickerCancel: pickedValue => {
        Picker.hide()
      },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue]
        if (parseInt(targetValue[1]) === 2) {
          if (targetValue[0] % 4 === 0 && targetValue[2] > 29) {
            targetValue[2] = 29
          } else if (targetValue[0] % 4 !== 0 && targetValue[2] > 28) {
            targetValue[2] = 28
          }
        } else if (
          targetValue[1] in { 4: 1, 6: 1, 9: 1, 11: 1 } &&
          targetValue[2] > 30
        ) {
          targetValue[2] = 30
        }

        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v)
            }
          })
          Picker.select(targetValue)
          pickedValue = targetValue
        }
      }
    })
    Picker.show()
  }

  _toggle() {
    // 展示与关闭
    Picker.toggle()
  }

  _isPickerShow() {
    // picker是否显示
    Picker.isPickerShow(status => {
      alert(status)
    })
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
          onPress={this._showTimePicker.bind(this)}
          // onPress={this._showDatePicker.bind(this)}
        >
          <Text>{this.state[this.props.item.key] || '请选择'}</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity
          style={{ marginTop: 10, marginLeft: 20 }}
          onPress={this._showTimePicker.bind(this)}
        >
          <Text>TimePicker</Text>
        </TouchableOpacity>
        
          <TouchableOpacity
            style={{ marginTop: 10, marginLeft: 20 }}
            onPress={this._showAreaPicker.bind(this)}
          >
            <Text>AreaPicker</Text>
          </TouchableOpacity>  
          <TouchableOpacity
            style={{ marginTop: 10, marginLeft: 20 }}
            onPress={this._toggle.bind(this)}
          >
            <Text>toggle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 10, marginLeft: 20 }}
            onPress={this._isPickerShow.bind(this)}
          >
            <Text>isPickerShow</Text>
          </TouchableOpacity>
        
        */}
      </View>
    )
  }
}
