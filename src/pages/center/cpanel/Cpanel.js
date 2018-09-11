import Taro,{Component} from '@tarojs/taro';
import {View,Image,Text,Button} from '@tarojs/components'
import {AtIcon,AtButton} from 'taro-ui'
import '../index.scss'
import Api from '../../../ApiManager';
import SettingModal from './SettingModal'
class Cpanel extends Component{
  state = {
    userinfo:'',
    id:'',
    isShow:false
  }
  componentDidMount(){
    this.handleGetUserInfoToStorage()
  }
  handleGetUserInfoToStorage = (id) =>{
    let _that = this
    Taro.getStorage({
      key:'userinfo',
      success:((res)=>{
        console.log(res)
        let data = ''
        if(!id){
          data = {nickName:res.data.nickName}
        }else {
          data = {id:id}
        }
        Taro.request({
          url:Api.userlist,
          data:data,
          success:((res)=>{
            console.log(res.data.data[0])
            if(res.data.code < 0){
              console.log('获取失败')
            }else {
              Taro.setStorage({
                key:'userinfo',
                data:res.data.data[0]
              })
              _that.setState({userinfo:res.data.data[0],id:res.data.data[0].id})
            }
          })
        })
      })
    })
  }
  handleSettings = () =>{
    let _that = this
    _that.setState({isShow:!_that.state.isShow})
    Taro.request({
      url:Api.userReloadIntro,
      data:{
        id:_that.state.id,
        intro:'更新了intro'
      },
      success:((res)=>{
        _that.handleGetUserInfoToStorage(_that.state.id)
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
            id:_that.state.id,
            nickName:userinfo.nickName,
            gender:userinfo.gender,
            language:userinfo.language,
            city:userinfo.city,
            province:userinfo.province,
            country:userinfo.country,
            avatarUrl:userinfo.avatarUrl,
          },
          success:((res)=>{
            _that.handleGetUserInfoToStorage(_that.state.id)
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
  render(){
    let {userinfo,isShow} = this.state;
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
            <View className='nickname'>{userinfo ? userinfo.nickName : ''}</View>
            <View className='icon-setting' onClick={this.handleSettings}>
                <AtIcon value='settings' color='#fff' size='20'/>
            </View>
            {
              isShow ? <SettingModal/> : null
            }
          </View>
          <View className='info-list'>
            <View className='bg'/>
            <View className='list'>
              <View className='item'>
                {userinfo ? '简介' : '请手动刷新数据！'}
                <AtButton

                  icon='reload'
                  circle
                  size='small'
                  open-type="getUserInfo"
                  className='icon-reload'
                  onClick={this.handleReload }
                >更新</AtButton>
              </View>
              <View className='item'>{userinfo && userinfo.intro != 0 ? userinfo.intro : '没有简介，不想写简介。'}</View>
            </View>
            <View className='list'>
              <View className='item'>个人信息：</View>
              <View className='item'>昵称：{userinfo ? userinfo.nickName : ''}</View>
              <View className='item'>性别：{userinfo && userinfo.gender == 1 ? '男' : userinfo.gender == 2 ? '女' : ''}</View>
              <View className='item'>地址：
                {userinfo ? userinfo.country : ''}
                {userinfo ?'-' + userinfo.province : ''}
                {userinfo ?'-' + userinfo.city : ''}
                </View>
            </View>
          </View>
        </View>

      </ScrollView>
    )
  }
}
export default Cpanel
