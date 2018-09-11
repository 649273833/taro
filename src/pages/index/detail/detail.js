import Taro,{Component} from '@tarojs/taro';
import {View,Text,Image,Button} from '@tarojs/components';
import { AtNavBar ,AtIcon} from 'taro-ui';
import '../list/list.scss'
import Api from '../../../ApiManager'
import h1 from '../../../assets/img/20180905100040.jpg'
import h2 from '../../../assets/img/20180905100051.jpg'
import WxParse from '../../../wxParse/wxParse'

import { connect } from '@tarojs/redux'
import {getList,add} from '../../../actions/counter';
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  getList(list,type){
    dispatch(getList(list,type))
  },
  add(){
    dispatch(add())
  }
}))
class Detail extends Component{
  state = {
    id : this.$router.params.id,
    content:'',
    list:[]
  }
  onShareAppMessage(){
    return {
      title: this.props.counter.list.filter((data)=>data.id === _that.$router.params.id )[0].title,
    }
  }
  componentDidMount(){
    this.props.add()//辅助重新渲染页面，不知道为啥更新redux里面的数据后，没有更新页面
    let _that = this
    this.handleGetContent()
  }
  handleGetContent = () =>{
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
            let {list} = _that.state || []
            let reading = _that.props.counter.list.find((data)=>data.id === _that.$router.params.id ).reading
            reading = parseFloat(reading) + 1
            _that.props.counter.list.find((data)=>data.id === _that.$router.params.id ).reading = reading
            _that.props.getList(_that.props.counter.list,1)
            // Taro.getStorage({
            //   key:'list',
            //   success:((res)=>{
            //     let reading = res.data.find((data)=>data.id === _that.$router.params.id ).reading
            //     reading = parseFloat(reading) + 1
            //     res.data.find((data)=>data.id === _that.$router.params.id ).reading = reading
            //     Taro.setStorage({
            //       key:'list',
            //       data:res.data
            //     })
            //   })
            // })
          })
        })
      })
  }

  handleClickLeft = () =>{
    Taro.navigateBack({
      delta: 1
    })
  }
  handleClickRight = () =>{
    this.handleGetContent()
  }

  render(){
    let {content} = this.state;
    let list = this.props.counter.list.filter((data)=>data.id === this.$router.params.id )[0]
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
            <View className='names text-overflow'>{list.title}</View>
            <View className='reload' onClick={this.handleClickRight}>
              <AtIcon color='rgb(97, 144, 232)' value='reload'/>
            </View>
          </View>
          <View className='info'>
            <Text>{list.type}</Text>
            <Text>{list.writetime}</Text>
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
