import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import Cpanel from './cpanel/Cpanel'
import './index.scss'
export default class Center extends Component{

  componentDidMount(){
  }

  render(){
    return(
      <View className='center'>
        <Cpanel/>
      </View>
    )
  }
}
