import { Component } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
export default class RNInput extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  changeTxt = text => {
    this.props.onDataChange(text, {})
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          value={''}
          keyboardType={'default'}
          // multiline={true}          // 多行显示
          // password={true}
          // maxLength={1}  // 长度
          editable={true} // 设置文本框是否可以编辑
          placeholder={''}
          clearButtonMode={'always'} // ios 才有
          onChangeText={text =>
            this.props.onDataChange({ text: text, item: {} })
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle: {}
})

// 2.autoCapitalize 控制TextInput输入的字符进行切换成大写

// none:不自动切换任何字符成大写
// sentences:默认每个句子的首字母变成大写
// words:每个单词的首字母变成大写
// characters:每个字母全部变成大写

// 3.autoCorrect bool 设置拼写自动修正功能 默认为开启(true)

// 4.autoFocus bool 设置是否默认获取到焦点默认为关闭(false)。该需要componentDidMount方法被调用之后才会获取焦点哦(componentDidMount是React组件被渲染之后React主动回调的方法)

// 5.defaultValue string 给文本输入设置一个默认初始值。

// 6.editable bool 设置文本框是否可以编辑 默认值为true,可以进行编辑

// 7.keyboardType 键盘类型(可选参数:"default", 'email-address', 'numeric', 'phone-pad', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search') 该用来选择默认弹出键盘的类型例如我们甚至numeric就是弹出数字键盘。鉴于平台的原因如下的值是所有平台都可以进行通用的

// default
// numeric 数字键盘
// email-address 邮箱地址
// 8.maxLength number 可以限制文本输入框最大的输入字符长度

// 9.multiline bool 设置可以输入多行文字，默认为false(表示无论文本输入多少，都是单行显示)

// 10.onBlur function 监听方法，文本框失去焦点回调方法

// 11.onChange function 监听方法,文本框内容发生改变回调方法

// 12.onChangeText function监听方法，文本框内容发生改变回调方法，该方法会进行传递文本内容

// 13.onEndEditing function监听方法，当文本结束文本输入回调方法

// 14.onFocus function 监听方法 文本框获取到焦点回调方法

// 15.onLayout function监听方法 组价布局发生变化的时候调用，调用方法参数为 {x,y,width,height}

// 16.onSubmitEditing function监听方法，当编辑提交的时候回调方法。不过如果multiline={true}的时候，该属性就不生效

// 17.placeholder string 当文本输入框还没有任何输入的时候，默认显示信息，当有输入的时候该值会被清除

// 18.placeholderText Color string 设置默认信息颜色(placeholder)

// 19.secureTextEntry bool 设置是否为密码安全输入框 ，默认为false

// 20.selectTextOnFocus bool 如果为true，当获得焦点的时候，所有的文字都会被选中。

// 21.selectionColor string 设置输入框高亮时的颜色（在iOS上还包括光标）

// 22.style 风格属性 可以参考Text组件风格

// 23.value string 输入框中的内容值

// Android

// 24.numberOfLines number设置文本输入框行数，该需要首先设置multiline为true,设置TextInput为多行文本。

// 25.textAlign 设置文本横向布局方式 可选参数('start', 'center', 'end')

// 26.textAlignVertical 设置文本垂直方向布局方式 可选参数('top', 'center', 'bottom')

// 27.underlineColorAndroid 设置文本输入框下划线的颜色

// ios

// 28.clearButtonMode enum('never', 'while-editing', 'unless-editing', 'always') 是否要在文本框右侧显示“清除”按钮。

// 29.clearTextOnFocus bool 如果为true，每次开始输入的时候都会清除文本框的内容。

// 30.enablesReturnKeyAutomatically bool 如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false。

// 31.keyboardAppearance enum('default', 'light', 'dark') 指定键盘的颜色。

// 32.onKeyPress function 当一个键被按下的时候调用此回调。被按下的键会作为参数传递给回调函数。会在onChange之前调用。

// 33.returnKeyType enum('default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call')决定“确定”按钮显示的内容。

// 34.selectionState DocumentSelectionState 参见DocumentSelectionState.js，可以控制一个文档中哪段文字被选中的状态。
