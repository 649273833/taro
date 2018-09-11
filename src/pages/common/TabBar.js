import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import '../../app.scss'
export default class TabBar extends Component{
  state = {
    current:0
  };
  componentDidMount(){
    let _that = this;

    if(Taro.getEnv() === 'WEAPP'){
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length-1] //获取当前页面的对象
      var url = currentPage.route
      if(url === 'pages/index/index'){
        _that.setState({current:0});
      }else if(url === 'pages/center/index'){
        _that.setState({current:1});
      }
    }else {
      Taro.getStorage({
        key:'current',
        success:function(res) {
          _that.setState({current:res.data})
        }
      })
    }
  }
  componentDidHide(){
    console.log('hide')
  }
  handleClick = (e) =>{
    let {current} = this.state;
    let url ='';
    e === 0 ? url = '/pages/index/index'
      : e === 1 ? url = '/pages/center/index'
      : url = '';
    this.setState({current:e});
    Taro.setStorage({
      key:'current',
      data:e
    });
    if(e !== current){
      Taro.navigateTo({
        url:url
      })
    }
  };
  render(){
    let {current} = this.state;
    return(
      <View>
        <AtTabBar
          fixed
          color='#666'
          backgroundColor='transparent;'
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '我的', iconType: 'user' },
          ]}
          onClick={this.handleClick}
          current={current}
        />
      </View>
    )
  }
}
