import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
import { AtNavBar ,AtIcon} from 'taro-ui';
import '../list/list.scss'
import Api from '../../../ApiManager'
import h1 from '../../../assets/img/20180905100040.jpg'
import h2 from '../../../assets/img/20180905100051.jpg'
import WxParse from '../../../wxParse/wxParse'

import { connect } from '@tarojs/redux'
import {getList,add,userinfo} from '../../../actions/counter';
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
  }
  onShareAppMessage(){
    return {
      title: this.state.list.title,
    }
  }
  componentDidMount(){
    this.props.add()//辅助重新渲染页面，不知道为啥更新redux里面的数据后，没有更新页面
    this.handleGetContent()
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
          if(type !== 'reload'){
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
    Taro.switchTab({
      url:'/pages/index/index',
    })
  }
  handleClickRight = () =>{
    this.handleGetContent('reload')
  }

  render(){
    let {content,list } = this.state;
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
          {/*<View className='content' dangerouslySetInnerHTML = {{ __html:content}}/>*/}
          <View className='content'>
            <import src='../../../wxParse/wxParse.wxml' />
            <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
          </View>

        </View>
        <View className='bottom-info'>
          <Text className='readings'>最近阅读：</Text>
          <View className='avatars'>
            <Image className='items' src={h1}/>
            <Image className='items' src={h2}/>
            <Image className='items' src={h1}/>
            <Image className='items' src={h2}/>
            <Image className='items' src={h1}/>
          </View>
        </View>
      </View>
    )
  }
}
export default Detail
