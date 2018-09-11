import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/index/detail/detail',
      'pages/center/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#00ae66",
      backgroundColor: "#FBFBFB",
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "assets/img/tabbar-home-gray.png",
          selectedIconPath: "assets/img/tabbar-home-green.png"
        },{
          pagePath: "pages/center/index",
          text: "我的",
          iconPath: "assets/img/tabbar-my-gray.png",
          selectedIconPath: "assets/img/tabbar-my-green.png"
        },
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
