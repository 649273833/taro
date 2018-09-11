import Taro,{Component} from '@tarojs/taro';
import {View,Image,Text} from '@tarojs/components';
import {AtIcon} from 'taro-ui'
import './list.scss'

import zoomimg from '../../../assets/img/1556287878.png'

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
export default class TodoList extends Component{
  state ={
    distance:0,
  }
  handleToDetail = (item) =>{
    Taro.navigateTo({
      url:`/pages/index/detail/detail?id=${item.id}`
    })
  }
  handleItemMove = (id,e) =>{
    let _that = this;
    _that.props.add()//不知道啥子bug导致不更新页面，用这个辅助更新页面
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
  handleItemDel = (id) =>{
    console.log(id)
  }
  render(){
    let list = this.props.counter.list;
    let Admin = this.props.counter.userinfo[0]
    let more = this.props.more;
    return(
      <View className='todolist'>
        {
          (list || []).map((item)=>
            <View className='box' key={item.id}>
              <View className='item' style={{right:Taro.pxTransform(item.right)}}>
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
                {
                  Admin && Admin.admin == 1 ?
                    <View onClick={this.handleItemMove.bind(this,item.id)}>
                      <AtIcon value='settings' size='30' color='#e5e5e5'/>
                    </View>
                    : null
                }
              </View>
              <View
                className='delete'
                onClick={this.handleItemDel.bind(this,item.id)}
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
          !more ? <View className='no-more'>没有更多了</View> : null
        }

      </View>
    )
  }
}
TodoList.defaultProps = {
  list:'none',
  more:true
}
