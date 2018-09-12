import Taro,{Component} from '@tarojs/taro';
import {View,Image,Text,Button} from '@tarojs/components'
import {AtIcon,AtButton} from 'taro-ui'
import {connect} from '@tarojs/redux'
import '../index.scss'
import Api from '../../../ApiManager';
import SettingModal from './SettingModal'
import { userinfo, isShow} from '../../../actions/counter';
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  setuserinfo(data){
    dispatch(userinfo(data))
  },
  setIsShow(){
    dispatch(isShow())
  }
}))
class Cpanel extends Component{
  state = {
  }
  componentDidMount(){
    // this.onHandleGetUserInfoToStorage()
  }
  onHandleGetUserInfoToStorage = () =>{
    let _that = this
    let id = this.props.counter.userinfo.id
    let data = {id:id}
    Taro.request({
      url:Api.userlist,
      data:data,
      success:((res)=>{
        if(res.data.code < 0){
          console.log('获取失败')
        }else {
          Taro.setStorage({
            key:'userinfo',
            data:res.data.data[0]
          })
          _that.props.setuserinfo(res.data.data[0])
        }
      })
    })
  }

  handleReload = () =>{
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
    let _that = this
    Taro.getUserInfo({
      success:function(res) {
        let userinfo = res.userInfo
        Taro.setStorage({
          key:'userinfo',
          data:userinfo
        })
        Taro.request({
          url:Api.userReload,
          data:{
            id:_that.props.counter.userinfo.id,
            nickName:userinfo.nickName,
            gender:userinfo.gender,
            language:userinfo.language,
            city:userinfo.city,
            province:userinfo.province,
            country:userinfo.country,
            avatarUrl:userinfo.avatarUrl,
          },
          success:((res)=>{
            _that.onHandleGetUserInfoToStorage()
            Taro.showToast({
              title:'更新成功！'
            })
          }),
          fail:(()=>{
            Taro.showToast({
              title:'请重试！'
            })
          })
        })
      }
    })
  }
  handleToBrowse = () =>{
    Taro.navigateTo({
      url:'/pages/center/browse/browse'
    })
  }
  render(){
    let isShow = this.props.counter.isShow
    let userinfo = this.props.counter.userinfo[0]
    let scrollStyle = {
      height:'100%',
    }
    return(
      <ScrollView
        scrollY
        style={scrollStyle}
        scrollWithAnimation={true}
        enableBackToTop={true}
        // onScrolltoupper={this.handleScrolltoupper}
        // onScrolltolower={this.handleScrolltolower}
      >
        <View className='cpanel'>
          <View className='panel-top'>
            <Image className='bgs' src={userinfo ? userinfo.avatarUrl : ''}/>
            <Image className='avatar img-responsive center-block' src={userinfo ? userinfo.avatarUrl : ''}/>
            <View className='nickname'>{userinfo && userinfo.nickName ? userinfo.nickName : '我是个没有名字的人'}</View>
            {/*<View className='icon-setting' onClick={this.handleSettings}>*/}
                {/*<AtIcon value='settings' color='#fff' size='20'/>*/}
            {/*</View>*/}
            {
              isShow ? <SettingModal/> : null
            }
          </View>
          <View className='info-list'>
            <View className='bg'/>
            <View className='list'>
              <View className='item'>
                {userinfo ? '我的' : '请手动刷新数据！'}
              </View>
              <View className='item'>{userinfo && userinfo.intro ? userinfo.intro : '没有简介，不想写简介。'}</View>
              <View className='item'>
                <View>
                  <Text onClick={this.props.setIsShow}>个人资料</Text>
                  <AtIcon value='edit' color='#ccc' size='18'/>
                </View>
                <AtButton
                  icon='reload'
                  circle
                  size='small'
                  open-type="getUserInfo"
                  className='icon-reload'
                  onClick={this.handleReload }
                >更新</AtButton>
              </View>
              <View className='item' onClick={this.handleToBrowse}>
                <Text>最近浏览</Text>
                <Text>8条</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    )
  }
}
Cpanel.defaultProps = {
  userinfo:['none'],
  isShow:false
}
export default Cpanel

