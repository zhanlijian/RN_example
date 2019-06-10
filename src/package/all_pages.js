/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 配置所有新增页面
 */

import App from '../app'

// 项目首次进入页面
import ComePage from '../pages/welcome/come_page'

// 订单
import Bill from '../pages/bill/bill'

// 开单收钱
import OpenOrder from '../pages/order/open_order'

// 登录
import Login from '../pages/login/login'

// list列表 发起申请
import List from '../pages/list/list'
import FormDetail from '../pages/list/formDetail'

export default function allPages() {
  let allPages = {
    Home: {
      screen: App
    },
    Login: {
      screen: Login
    },
    ComePage: {
      screen: ComePage
    },
    Bill: {
      screen: Bill
    },
    OpenOrder: {
      screen: OpenOrder
    },
    List: {
      screen: List
    },
    FormDetail: {
      screen: FormDetail
    }
  }

  return allPages
}
