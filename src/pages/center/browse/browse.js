import Taro,{Component} from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtList, AtListItem ,AtNavBar} from "taro-ui";
import zoomimg from '../../../assets/img/1556287878.png'
import Api from '../../../ApiManager'
import './browse.scss'
class Browse extends Component{
  state = {
    list : []
  }
  componentDidMount(){
    this.handleGetBrowseList()
  }
  handleGetBrowseList = () =>{
    Taro.request({
      url:Api.browseSelect,
      success:((res)=>{
        console.log(res)
      })
    })
  }
  handleClickLeft = () =>{
    Taro.navigateBack({delta:1})
  }
  handleClickRight = () =>{
    console.log('right')
  }
  handleClickRightS = () =>{

  }
  onPullDownRefresh(){
    console.log('下拉');
  }
  render(){
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
          onClickRgIconSt={this.handleClickRight}
          onClickRgIconNd={this.handleClickRightS}
        />
        <View className='browse-list'>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
          <View className='item'>
            <View className='avatar'>
              <Image className='avatar-url' src={zoomimg}/>
            </View>
            <View className='content'>
              <View className='title text-overflow'>
                这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题这个是标题
              </View>
              <View className='intr-box'>
                <Text className='intr'>react</Text>
                <Text className='intr'>阅读</Text>
                <Text className='intr'>118</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default Browse
