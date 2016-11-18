var app = getApp();
var apiUrl = 'http://route.showapi.com/255-1',t=10;
// type=10 图片 
// type=29 段子 
// type=31 声音 
// type=41 视频


let appid = 27253,secret = "b7b9677deeac49d1a422a71e429599f4";
Page({
    data:{
        lists:[],
        page:1
    },    
    onLoad:function(){
        this.getLists();
    },
    onPullDownRefresh: function() {              
        this.getLists();
    },
    onRefresh: function() {              
        this.getLists();
    },
    getLists(){
        var that = this,oldData = that.data.lists,newPage = this.data.page+1,newData;
        let thisTime =String(Date.parse(new Date())).substring(0,10); 
        wx.request({    
            url: apiUrl,    
            data: {     
                showapi_appid: appid,
                showapi_sign:secret,
                page:newPage,
                type:t                
            },
            success: function(res) { 
                 if(res.statusCode==200){                                        
                    let newJokes = res.data.showapi_res_body.pagebean.contentlist.reverse(),newData = oldData ? newJokes.concat(oldData):newJokes;
                    that.setData({lists:newData,page:newPage});
                 }
            }
        })    
    },
    resetImgHeight(e){       
       let imgH = e.detail.height+"rpx",that = this,listArr = this.data.lists, imgId = e.target.dataset.id;
       listArr.map(function(j,i){
           if(j.id == imgId){
               listArr[i].h = imgH;
           }
       })
       this.setData({lists:listArr})
    }
})