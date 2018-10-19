import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
import { AtNavBar ,AtIcon} from 'taro-ui';
import '../list/list.scss'
import Api from '../../../ApiManager'
import h1 from '../../../assets/img/20180905100040.jpg'
import h2 from '../../../assets/img/20180905100051.jpg'
import { connect } from '@tarojs/redux'
import {getList,add,userinfo} from '../../../actions/counter'
let WxParse = null;
if(Taro.getEnv() === 'WEAPP'){
  WxParse = require('../../../wxParse/wxParse')
}
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  getList(list,type){
    dispatch(getList(list,type))
  },
  add(){
    dispatch(add())
  },
  setuserinfo(data){
    dispatch(userinfo(data))
  }
}))
class Detail extends Component{
  state = {
    id : this.$router.params.id,
    content:'',
    list:[],
    browseUser:[],
    next:[],
    prev:[]
  }
  onShareAppMessage(){
    return {
      title: this.state.list.title,
      success:()=>{
        Taro.showToast({
          title:'转发成功！',
          icon:'success'
        })
        Taro.hideToast()
      }
    }
  }
  componentDidMount(){
    this.props.add()//辅助重新渲染页面，不知道为啥更新redux里面的数据后，没有更新页面

    this.handleGetContent()
    this.handleGetBrowseUser()
    this.handleNewsNP()
  }
  handleAddBrowse = () =>{
    let _that = this
    let {list} = _that.state;
    if(_that.props.counter.userinfo[0].id && list.id){
      Taro.request({
        url:Api.browseExists,
        data:{
          uid:_that.props.counter.userinfo[0].id,
          nid:list.id
        },
        success:((res)=>{
          if(res.statusCode === 200){
            Taro.request({
              url:Api.browseAdd,
              data:{
                uid:_that.props.counter.userinfo[0].id,
                nid:list.id,
                title:list.title,
                type:list.type,
                avatarUrl:_that.props.counter.userinfo[0].avatarUrl,
                reading:list.reading,
                zoomimg:list.zoomimg,
              },
              success:((res)=>{

              })
            })
          }
        })
      })
    }
  }
  handleGetBrowseUser = () =>{
    let _that = this;
    Taro.request({
      url:Api.browseUser,
      data:{nid:_that.$router.params.id},
      success:((res)=>{
        _that.setState({browseUser:res.data.data})
      })
    })
  }
  handleGetContent = (type) =>{
    Taro.showLoading({
      title:'loading'
    })
    let _that = this
    Taro.request({
      url:Api.newsdetail,
      data:{
        id:_that.$router.params.id
      }
    })
      .then((res)=>{
        _that.setState({list:res.data.data[0]}, ()=>{
          let from = this.$router.params.from
          if(type !== 'reload' && !from){
            _that.handleAddBrowse()
          }
        })
        if(Taro.getEnv() === 'WEAPP'){
          let article = res.data.data[0].content
          WxParse.wxParse('article', 'html',article , _that.$scope, 5)
          Taro.hideLoading()
        }else if(Taro.getEnv() === 'WEB'){
          _that.setState({content:res.data.data[0].content})
          Taro.hideLoading()
        }
        Taro.request({
          url:Api.newsupreading,
          data:{
            id:_that.$router.params.id
          },
          success:((res)=>{
            if(_that.props.counter.list){
              let reading = _that.props.counter.list.find((data)=>data.id === _that.$router.params.id ).reading
              reading = parseFloat(reading) + 1
              _that.props.counter.list.find((data)=>data.id === _that.$router.params.id ).reading = reading
              _that.props.getList(_that.props.counter.list,1)
            }
          })
        })
      })
  }

  handleClickLeft = () =>{
    let from = this.$router.params.from
    if(from == '1'){
      Taro.navigateBack({delta:1})
    }else {
      Taro.switchTab({
        url:'/pages/index/index',
      })
    }
  }
  handleClickRight = () =>{
    this.handleGetContent('reload')
  }
  handleNewsNP = () =>{
    let _that = this;
    Taro.request({
      url:Api.newsN,
      data:{
        id:_that.$router.params.id
      },
      success:res=>{
        _that.setState({next:res.data.data})
      },
      fail:err=>{
        console.log(err)
      }
    })
    Taro.request({
      url:Api.newsP,
      data:{
        id:_that.$router.params.id
      },
      success:res=>{
        _that.setState({prev:res.data.data})
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
  handleGoNewsNP = (item) =>{
    Taro.navigateTo({
      url:`/pages/index/detail/detail?id=${item[0].id}&from=2`
    })
  }
  render(){
    let {content,list ,browseUser,prev,next} = this.state;
    let Content = null;
    if (Taro.getEnv() === 'WEAPP') {
      Content =
        <View className='content'>
         <import src='../../../wxParse/wxParse.wxml' />
         <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
       </View>
    } else if(Taro.getEnv() === 'H5'){
      Content = <View className='content' dangerouslySetInnerHTML = {{ __html:content}}/>
    }
    return(
      <View className='detail'>
        <AtNavBar
          fixed
          color='rgb(97, 144, 232)'
          title='文章详情'
          leftIconType='chevron-left'
          onClickLeftIcon={this.handleClickLeft}
        />
        <View className='detail-panel'>
          <View className='title'>
            <View className='names text-overflow'>{list ? list.title : ''}</View>
            <View className='reload' onClick={this.handleClickRight}>
              <AtIcon color='rgb(97, 144, 232)' value='reload'/>
            </View>
          </View>
          <View className='info'>
            <Text>{list ? list.type : ''}</Text>
            <Text>{list ? list.writetime : ''}</Text>
          </View>
          {Content}
          <View className='next-prev'>
            {
              prev && prev.length > 0 ?
                <View className='prev text-overflow' onClick={this.handleGoNewsNP.bind(this,prev)}>{prev[0].title}</View>
                :
                <View className='prev text-overflow'>没有更多了</View>
            }
            {
              next && next.length > 0  ?
                <View className='next text-overflow' onClick={this.handleGoNewsNP.bind(this,next)}>{next[0].title}</View>
                :
                <View className='next text-overflow'>没有更多了</View>
            }
          </View>
        </View>
        <View className='bottom-info'>
          <Text className='readings'>最近阅读：</Text>
          <View className='avatars'>
            {
              browseUser && (browseUser || []).map((item)=>
                <Image key={item.id} className='items' src={browseUser && browseUser.avatarUrl ? browseUser.avatarUrl : h2}/>
              )
            }
          </View>
        </View>
      </View>
    )
  }
}
export default Detail
