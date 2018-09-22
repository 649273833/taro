
let postApi = (path, mock) => {
  if(mock){
    return  'https://easy-mock.com/mock/5b5832f25cdf1e2d21eb25cd/example/' + path.slice(path.lastIndexOf('/') + 1).split('.')[0]
  }else {
    return path
  }
};
//如果下面请求的列表后面参数为1就是使用mockjs，通过截取最后一个斜杆 / 后的 xxx ，
// 去命中mock.js的相对假接口，当然需要自己设置好路径，路径根据自己实际情况修改
export default {
  'list':postApi('https://wx.zzwio.com/api/list.php',1),
  'modbox':postApi('https://wx.zzwio.com/api/modbox.php',1),
  'toolbox':postApi('https://wx.zzwio.com/api/toolbox.php',1),
  'msglist':postApi('https://wx.zzwio.com/api/msglist.php',1),
  'newslist':postApi('https://wx.zzwio.com/api/news_select.php',0),
  'newstypelist':postApi('https://wx.zzwio.com/api/news_type_select.php',0),
  'newsupzan':postApi('https://wx.zzwio.com/api/news_up_zan.php',0),
  'newsdetail':postApi('https://wx.zzwio.com/api/news_detail.php',0),
  'useradd':postApi('https://wx.zzwio.com/api/user_add.php',0),
  'userlist':postApi('https://wx.zzwio.com/api/user_select.php',0),
  'newsupreading':postApi('https://wx.zzwio.com/api/news_up_reading.php',0),
  'userReload':postApi('https://wx.zzwio.com/api/user_reload.php',0),
  'userReloadInfo':postApi('https://wx.zzwio.com/api/user_reload_info.php',0),
  'newsDelete':postApi('https://wx.zzwio.com/api/news_delete.php',0),
  'browseAdd':postApi('https://wx.zzwio.com/api/browse_add.php',0),
  'browseExists':postApi('https://wx.zzwio.com/api/browse_exists.php',0),
  'browseSelect':postApi('https://wx.zzwio.com/api/browse_select.php',0),
  'browseCountSelect':postApi('https://wx.zzwio.com/api/browse_count_select.php',0),
  'browseUser':postApi('https://wx.zzwio.com/api/browse_user.php',0),
}
