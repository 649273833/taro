import Taro,{Component} from '@tarojs/taro';
import {View,Button} from '@tarojs/components'
export default class Child extends Component{

  componentDidMount(){
    this.props.onChild(this)//通过在这里将this传递到父组件去
  }
  handleChild = () =>{
    console.log('这是子组件')
  }
  render(){
    return(
      <View>
        <Button onClick={this.handleChild}>
          子组件
        </Button>
      </View>
    )
  }
}

