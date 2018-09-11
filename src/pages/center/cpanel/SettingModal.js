import Taro,{Component} from '@tarojs/taro';
import {View,Input} from  '@tarojs/components';
import {AtIcon,AtButton,} from 'taro-ui'
import {connect} from '@tarojs/redux'
import '../index.scss'
import { userinfo ,isShow } from '../../../actions/counter';
import {getCity,isMobile} from '../../../utils';
import Api from '../../../ApiManager';
import close from '../../../assets/img/close.png'
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  setuserinfo(data){
    dispatch(userinfo(data))
  },
  setIsShow(){
    dispatch(isShow())
  },
}))
export default class SettingModal extends Component{
  state ={
    age:'',
    phone:'',
    intro:''
  }
  componentDidMount(){
    this.setState({
      age:this.props.counter.userinfo.age,
      phone:this.props.counter.userinfo.phone,
      intro:this.props.counter.userinfo.intro,
    })
  }
  handleClose = () =>{
    let _that = this;
    _that.props.setIsShow()
  }
  handleSettings = () =>{
    let _that = this
    let {age,phone,intro} = _that.state;
    Taro.request({
      url:Api.userReloadInfo,
      data:{
        id:this.props.counter.userinfo.id,
        intro:intro,
        age:age,
        phone:phone
      },
      success:((res)=>{
        _that.handleSetUserInfo()
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
  handleSetUserInfo = () =>{
    let _that = this
    let id = this.props.counter.userinfo.id
    Taro.request({
      url:Api.userlist,
      data:{id:id},
      success:((res)=>{
        if(res.data.code < 0){
          console.log('获取失败')
        }else {
          Taro.setStorage({
            key:'userinfo',
            data:res.data.data[0]
          })
          _that.props.setuserinfo(res.data.data[0])
          console.log(res.data.data[0])
        }
      })
    })
  }
  handleChange = (type,e) =>{
    if(type === 'phone'){
      if(isMobile(e.target.value)){
        this.setState({[type]:e.target.value})
      }else {
        Taro.showToast({
          title:'这不是个手机号码！',
          image:close
        })
      }
    }
    this.setState({[type]:e.target.value})
  }
  render(){
    let userinfo = this.props.counter.userinfo
    return(
      <View className='setting-modal'>
        <View className='close' onClick={this.handleClose}>
          <AtIcon value='close' color='#333' size='30'/>
        </View>
        <View className='list'>
          <View className='item'>个人信息：</View>
          <View className='item'>
            <Text className='label'>昵称：</Text>
            <Text className='text'>{userinfo && userinfo.nickName? userinfo.nickName : ''}</Text>
          </View>
          <View className='item'>
            <Text className='label'>性别：</Text>
            <Text className='text'>{userinfo && userinfo.gender == 1 ? '男' : userinfo.gender == 2 ? '女' : ''}</Text>
          </View>
          <View className='item'><Text className='label'>年龄：</Text>
            <Input
              name='age'
              type='number'
              maxlength={3}
              value={userinfo && userinfo.age ? userinfo.age : '未填写'}
              onChange={this.handleChange.bind(this,'age')}
            />
          </View>
          <View className='item'><Text className='label'>手机：</Text>
            <Input
              name='phone'
              type='number'
              maxlength={16}
              value={userinfo && userinfo.phone ? userinfo.phone : '未填写'}
              onChange={this.handleChange.bind(this,'phone')}
            />
          </View>
          <View className='item'>
            <Text className='label'>简介：</Text>
            <Input
              name='phone'
              type='number'
              maxlength={64}
              value={userinfo && userinfo.intro ? userinfo.intro : '没有简介，不想写简介。'}
              onChange={this.handleChange.bind(this,'intro')}
            />
            </View>
          <View className='item'><Text className='label'>地址：</Text>
            <Text className='text'>
              {userinfo && userinfo.country === 'China' ? '中国' : userinfo ? userinfo.country : ''}
              {userinfo ? '-' + getCity([userinfo.province,userinfo.city]) : '可能是外星人'}
            </Text>
          </View>
          <View className='item btn' >
            <AtButton type='primary' size='small' onClick={this.handleSettings}>save</AtButton>
          </View>
        </View>
      </View>
    )
  }
}
SettingModal.defaultProps={
  userinfo:['none']
}
