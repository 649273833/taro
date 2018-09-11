import Taro,{Component} from '@tarojs/taro';
import Child from './child'
import {View,Button} from '@tarojs/components'
export default class Parent extends Component{
  onChild = (ref) =>{
    this.child = ref//通过这里将子组件的this赋值到this.child
  }
  onClick = () =>{
    this.child.handleChild()//这里就可以调用到子组件里面的方法了
  }
  render(){
    return(
      <View style={{marginTop:300}}>
        <Child onChild={this.onChild} num={this.state.num}/>
        <Button onClick={this.onClick}>
          执行子组件内的方法
        </Button>
      </View>
    )
  }
}
