import Taro,{Component} from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtNavBar} from "taro-ui";
import zoomimg from '../../../assets/img/1556287878.png'
import Api from '../../../ApiManager'
import './browse.scss'
import { userinfo, } from '../../../actions/counter';
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  setuserinfo(data){
    dispatch(userinfo(data))
  },
}))
class Browse extends Component{
  state = {
    list : []
  }
  componentDidMount(){
    this.handleGetBrowseList()
  }
  handleGetBrowseList = () =>{
    let _that = this;
    Taro.request({
      url:Api.browseSelect,
      data:{uid:_that.props.counter.userinfo[0].id},
      success:((res)=>{
        _that.setState({list:res.data.data})
      })
    })
  }
  handleNavToDetail = (id) =>{
    Taro.navigateTo({
      url:`/pages/index/detail/detail?id=${id}&from=1`
    })
  }
  handleClickLeft = () =>{
    Taro.navigateBack({delta:1})
  }
  // handleClickRight = () =>{
  //   console.log('right')
  // }
  // handleClickRightS = () =>{
  //
  // }
  onPullDownRefresh(){
    console.log('下拉');
  }
  render(){
    let {list} =this.state;
    return(
      <View>
        <AtNavBar
          fixed
          color='rgb(97, 144, 232)'
          title='最近浏览'
          leftIconType='chevron-left'
          // rightFirstIconType='reload'
          // rightSecondIconType=''
          onClickLeftIcon={this.handleClickLeft}
          // onClickRgIconSt={this.handleClickRight}
          // onClickRgIconNd={this.handleClickRightS}
        />
        <View className='browse-list'>
          {
            list && (list || []).map((item)=>
              <View className='item'
                    key={item.id}
                    onClick={this.handleNavToDetail.bind(this,item.nid)}
              >
                <View className='avatar'>
                  <Image className='avatar-url' src={item && item.zoomimg ? item.zoomimg : zoomimg}/>
                </View>
                <View className='content'>
                  <View className='title text-overflow'>
                    {item && item.title ? item.title : ''}
                  </View>
                  <View className='intr-box'>
                    <Text className='intr'>{item && item.type ? item.type : ''}</Text>
                    <Text className='intr'>阅读</Text>
                    <Text className='intr'>{item && item.reading ? item.reading : ''}</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }
}
export default Browse
