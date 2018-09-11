import Taro,{Component} from '@tarojs/taro';
import './list.scss'
import {View,ScrollView} from '@tarojs/components';
import Api from '../../../ApiManager'
import TodoList from './TodoList'
import close from '../../../assets/img/close.png'
import { connect } from '@tarojs/redux'
import {getList} from '../../../actions/counter';
let start= 5;
@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  getList(list,type){
    dispatch(getList(list,type))
  },
}))

export default class List extends Component{
  state = {
    start:0,
    page:10,
    list:'',
    more:true,
    distance:''
  }
  componentDidMount(){
    this.props.onReload(this)
    this. handelGetList()

  }
  handleGetStorage = () =>{
    let _that = this;
    Taro.getStorage({
      key:'list',
      success:((res)=>{
        _that.setState({list:res.data})
      }),
      fail:(()=>{
        _that.handelGetList()
      })
    })
    Taro.getStorage({
      key:'more',
      success:((res)=>{
        _that.setState({more:res.data})
      })
    })
  };
  handelGetList = () =>{
    Taro.showLoading({
      title:'loading'
    })
    Taro.setStorage({
      key:'more',
      data:true
    });
    Taro.setStorage({
      key:'start',
      data:5
    });
    let _that = this;
    _that.setState({more:true});
    let {start,page} = _that.state;
    let data = {
      start:start,
      page:page
    };
    Taro.request({
      url:Api.newslist,
      data:data
    })
      .then((res)=>{
        console.log(res)
        if(res.statusCode === 200 && res.data.code > 0){
          // _that.setState({list:res.data.data});
          // Taro.setStorage({
          //   key:'list',
          //   data:res.data.data
          // });

          res.data.data.forEach(function(item, index) {
            item.right = 0
          })
          _that.props.getList(res.data.data,1)
          Taro.hideLoading()
        }else if(res.statusCode === 200 && res.data.code < 0) {
          _that.setState({more:false});
          Taro.showToast({
            title:'没有跟多数据了',
            image:close
          });
          Taro.hideLoading()
          Taro.setStorage({
            key:'more',
            data:false
          });
        }
      })
  };
  handelGetMoreList = () =>{
    Taro.showLoading({
      title:'loading'
    })
    let _that = this;
    let {more} = _that.state;
    Taro.getStorage({
      key:'start',
      success:((res)=>{
        if(more){
          start = res.data + 5
        }else {
          start = res.data
        }
      }),
      // fail:(()=>{
      //   start = start + 5
      // })
    })
    // start = start + 5;

    console.log(start);
    let data = {
      start:start,
      page:5
    };
    Taro.request({
      url:Api.newslist,
      data:data
    })
      .then((res)=>{
        if(res.statusCode === 200 && res.data.code > 0){
          // _that.setState({list:_that.state.list.concat(res.data.data)});
          // Taro.setStorage({
          //   key:'list',
          //   data:_that.state.list.concat(res.data.data)
          // });
          _that.props.getList(res.data.data)
        }else if(res.statusCode === 200 && res.data.code < 0) {
          _that.setState({more:false});
          Taro.showToast({
            title:'没有跟多数据了',
            image:close
          })
          Taro.setStorage({
            key:'more',
            data:false
          });
        }
        Taro.hideLoading()
        Taro.setStorage({
          key:'start',
          data:start
        });
      })
  };
  handleScrolltoupper = () =>{
    console.log('到顶了');
    // this.handelGetList()
  };
  handleScrolltolower = () =>{
    console.log('到底了');
    this.handelGetMoreList()
  };
  onPullDownRefresh(){
    console.log('下拉');
  }


  render(){
    let scrollStyle = {
      height:'100%',
    }
    let {more,distance} = this.state;
    return(
      <View className='list' >
        <ScrollView
          scrollY
          style={scrollStyle}
          scrollWithAnimation={true}
          enableBackToTop={true}
          onScrolltoupper={this.handleScrolltoupper}
          onScrolltolower={this.handleScrolltolower}
        >
          <TodoList
            more={more}
          />
        </ScrollView>
      </View>
    )
  }
}

