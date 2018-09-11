import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import TabBar from '../common/TabBar'
import Cpanel from './cpanel/Cpanel'
import './index.scss'
export default class Center extends Component{
  state = {

  }
  componentDidMount(){

  }

  render(){
    return(
      <View className='center'>
        <Cpanel/>
        <TabBar/>
      </View>
    )
  }
}
