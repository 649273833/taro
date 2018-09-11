import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import './index.scss'
import TabBar from '../common/TabBar';
import List from './list/List'
import Api from '../../ApiManager'
import {connect} from '@tarojs/redux'
import {AtNavBar, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import { userinfo } from '../../actions/counter';
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  setuserinfo(data){
    dispatch(userinfo(data))
  },
}))
class Index extends Component {
  state = {
    isOpened:false,
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
        Taro.request({
          url:Api.userlist,
          data:{
            nickName:res.userInfo.nickName
          },
          success:((res)=>{
            if(res.data.code < 0){
              Taro.request({
                url:Api.useradd,
                data:userInfo,
                success:((res)=>{
                  _that.props.setuserinfo(userInfo)
                  console.log('添加一个新用户')
                })
              })
            }else {
              _that.props.setuserinfo(res.data.data)
              console.log('用户已存在')
            }
          })
        })

        let Time = Date.parse(new Date())
        let setDataTime = Time + 864000000//10天
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
      </View>
    )
  }
}
export default Index
