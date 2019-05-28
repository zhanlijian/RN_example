/**
 * @author jorrci
 * @repo lxshopTeam
 * @explain 配置所有新增页面
 */

import App from '../app';

// 项目首次进入页面
import ComePage from '../pages/welcome/come_page';

// 订单
import Bill from '../pages/bill/bill';

// 开单收钱
import OpenOrder from '../pages/order/open_order';

// 登录
import Login from '../pages/login/login';

export default function allPages() {
    let allPages = {
        Home: {
            screen: App,
        },
        Login: {
            screen: Login,
        },
        ComePage: {
            screen: ComePage,
        },
        Bill: {
            screen: Bill,
        },
        OpenOrder: {
            screen: OpenOrder,
        },
        Login: {
            screen: Login,
        }
    }

    return allPages;
}