import Taro,{Component} from '@tarojs/taro';
import {View,Image,Text} from '@tarojs/components';
import {AtIcon} from 'taro-ui'
import './list.scss'

import zoomimg from '../../../assets/img/1556287878.png'

import { connect } from '@tarojs/redux'
import {getList} from '../../../actions/counter';

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  getList(list,type){
    dispatch(getList(list,type))
  },
}))
export default class TodoList extends Component{
  state ={
    distance:0,
  }
  handleToDetail = (item) =>{
    Taro.navigateTo({
      url:`/pages/index/detail/detail?id=${item.id}`
    })
  }
  onTouchStart = (id,e) =>{
    this.startX = e.touches[0].clientX;
    console.log('start:',e.touches[0].pageX)
  }
  onTouchMove = (id,e) =>{
    let _that = this;
    this.endX = e.touches[0].clientX;
    let right = _that.props.counter.list.find((data)=>data.id === id ).right
    let distance = (this.startX - this.endX) + this.state.distance;

    if(distance >= 200){
      distance = 200
      console.log(distance)
      this.setState({distance})
      _that.props.counter.list.find((data)=>data.id === id ).right = distance
      _that.props.getList(_that.props.counter.list,1)
    }else if(distance<=0){
      distance = 0
      this.setState({distance})
      console.log(distance)
      _that.props.counter.list.find((data)=>data.id === id ).right = distance
      _that.props.getList(_that.props.counter.list,1)
      return
    }else {
      this.setState({distance})
      _that.props.counter.list.find((data)=>data.id === id ).right = distance
      _that.props.getList(_that.props.counter.list,1)
    }
    // console.log(id)
    // console.log('end:',distance)
    // console.log('move:',e.touches[0].pageX)
  }
  onTouchEnd = (id,e) =>{
    let _that = this;
    let {distance} = this.state;
    // console.log(id)
    if(distance === 200){
      // console.log(distance)
      this.setState({distance:200})
      _that.props.counter.list.find((data)=>data.id === id ).right = 200
      _that.props.getList(_that.props.counter.list,1)
    }else {
      this.setState({distance:0})
      // console.log('e:',distance === 200)
      _that.props.counter.list.find((data)=>data.id === id ).right = 0
      _that.props.getList(_that.props.counter.list,1)
    }
  }
  onTouchCancel = (id,e) =>{
    let _that = this;
    this.setState({distance:0})
    _that.props.counter.list.find((data)=>data.id === id ).right = 0
    _that.props.getList(_that.props.counter.list,1)
    console.log('cancel')
    // console.log(id)
  }
  handleItemMove = (id,e) =>{
    let _that = this;
    let right = _that.props.counter.list.find((data)=>data.id === id ).right
    if(right === 0){
      _that.props.counter.list.filter((data)=>data.id === id ).right = 0
      _that.props.counter.list.find((data)=>data.id === id ).right = 200
      _that.props.getList(_that.props.counter.list,1)
    }else {
      _that.props.counter.list.find((data)=>data.id === id ).right = 0
      _that.props.getList(_that.props.counter.list,1)
    }
  }
  render(){
    let list = this.props.counter.list;
    let more = this.props.more;
    return(
      <View className='todolist'>
        {
          (list || []).map((item)=>
            <View className='box' key={item.id}>
              <View className='item'
                    style={{right:Taro.pxTransform(item.right)}}

                    // onTouchStart={this.onTouchStart.bind(this,item.id)}
                    // onTouchMove={this.onTouchMove.bind(this,item.id)}
                    // onTouchEnd={this.onTouchEnd.bind(this,item.id)}
                    // onTouchCancel={this.onTouchCancel.bind(this,item.id)}
              >
                <View className='l'>
                  <Image className='zoomimg' src={item.zoomimg ? item.zoomimg : zoomimg}/>
                </View>
                <View className='r' onClick={this.handleToDetail.bind(this,item)}>
                  <View className='title text-overflow'>{item.title}</View>
                  <View className='info-panel'>
                    <View className='type text-overflow'>{item.type}</View>
                    {/*<View className='zan'>*/}
                    {/*<Text className='text'>赞</Text>*/}
                    {/*<Text className='text'>{item.zan}</Text>*/}
                    {/*</View>*/}
                    <View className='read'>
                      <Text className='text'>阅读</Text>
                      <Text className='text'>{item.reading}</Text>
                    </View>
                  </View>
                </View>
                <View onClick={this.handleItemMove.bind(this,item.id)}>
                  <AtIcon value='settings' size='30' color='#e5e5e5'/>
                </View>
              </View>
              <View
                className='delete'
                style={{
                  right:item.right > 0
                    ? Taro.pxTransform(item.right - 200)
                    : Taro.pxTransform(-200)
                }}
              >删除</View>
            </View>
          )
        }
        {
          !more ? <View className='no-more'>没有跟多了</View> : null
        }

      </View>
    )
  }
}
TodoList.defaultProps = {
  list:'none',
  more:true
}
