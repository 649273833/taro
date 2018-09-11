import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
import TabBar from '../common/TabBar';
import List from './list/List'
import Api from '../../ApiManager'
import {AtNavBar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'

class Index extends Component {
  state = {
    isOpened:false,
    UserInfo:[]
  }
    config = {
    navigationBarTitleText: '首页'
  }


 componentDidMount(){
   this.handleGetTimeOut()
 }
  handleGetTimeOut = () =>{
   let _that = this
   Taro.getStorage({
     key:'timeout',
     success:((res)=>{
       let now = Date.parse(new Date())
       if(now > res.data){
         _that.setState({isOpened:true})
       }else {
         _that.handleGetSetting()
       }
     }),
     fail:(()=>{
       _that.setState({isOpened:true})
     })
   })
 }
  handleGetSetting = () =>{
    let _that = this
    Taro.getSetting({
      success:function(data) {
        if (data && data.errMsg === "getSetting:ok") {
          _that.handleGetUserInfo()
        } else {
          console.log('1获取getsetting数据失败')
        }
      },
      fail:function() {
        console.log('2获取getsetting数据失败')
      }
    })
  }
  handleGetUserInfo = () =>{
    let _that = this;
    _that.setState({isOpened:false})
    let timer = ''
    Taro.getUserInfo({
      success:((res)=>{
        let userInfo = res.userInfo
        _that.setState({UserInfo:res.userInfo})
        Taro.request({
          url:Api.userlist,
          data:{
            nickName:res.userInfo.nickName
          },
          success:((res)=>{
            Taro.setStorage({
              key:'userinfo',
              data:userInfo
            })
            if(res.data.code < 0){
              Taro.request({
                url:Api.useradd,
                data:userInfo,
                success:((res)=>{
                  console.log('添加一个新用户')
                })
              })
            }else {
              console.log('用户已存在')
            }
          })
        })

        let Time = Date.parse(new Date())
        let setDataTime = Time + 86400000//一天
        Taro.setStorage({
          key:'timeout',
          data:setDataTime
        })
      }),
      fail:(()=>{
        _that.setState({isOpened:true})
        // _that.handleGetUserInfo()
      }),
    })
  }

  getOpenIdTap = () =>{
    const APP_ID ='wx446269490f9b0020';//输入小程序appid
    const APP_SECRET ='864549ba6d0c8d1187a185591f587733';//输入小程序app_secret
    var OPEN_ID=''//储存获取到openid
    var SESSION_KEY=''//储存获取到session_key
    let that=this;
    Taro.login({
      success:((res)=>{
        Taro.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data:{
            appid:APP_ID,
            secret:APP_SECRET,
            js_code:res.code,
            grant_type:'authorization_code'
          },
          success:((res)=>{
            console.log(res.data)
            OPEN_ID = res.data.openid;//获取到的openid
            SESSION_KEY = res.data.session_key;//获取到session_key
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            console.log('openid:', res.data.openid.substr(0, 10) + '********' + res.data.openid.substr(res.data.openid.length - 8, res.data.openid.length))
            console.log('session_key:', res.data.session_key.substr(0, 8) + '********' + res.data.session_key.substr(res.data.session_key.length - 6, res.data.session_key.length))
          })
        })
      })
    })
  }

  handleCancel = () =>{
    let _that = this;
    _that.setState({isOpened:false})
  }
  handleClickLeft = () =>{
    this.child.handelGetList()
  }
  handleClickRight = () =>{
    console.log('right')
  }
  handleClickRightS = () =>{

  }
  onReload = (ref) =>{
    this.child = ref
  }
  render () {
    let {isOpened} = this.state
    return (
      <View className='index bg'>
        <AtNavBar
          fixed
          color='rgb(97, 144, 232)'
          title='文章列表'
          leftIconType='reload'
          // rightFirstIconType='add'
          // rightSecondIconType='chevron-left'
          onClickLeftIcon={this.handleClickLeft}
          onClickRgIconSt={this.handleClickRight}
          onClickRgIconNd={this.handleClickRightS}
        />
        <List onReload={this.onReload}/>
        <AtModal isOpened={isOpened}>
          <AtModalHeader>请求授权</AtModalHeader>
          <AtModalContent>
            <View style={{textAlign:'center'}}>是否同意小程序获取用户信息?</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancel}>取消</Button>
            <Button
              open-type="getUserInfo"
              onClick={this.handleGetSetting}
              style={{color:'#1AAD16'}}
            >确定</Button>
          </AtModalAction>
        </AtModal>
        <TabBar/>
      </View>
    )
  }
}
export default Index
