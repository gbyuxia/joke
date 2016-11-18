var app = getApp();
var apiUrl = 'http://route.showapi.com/255-1',t=29;
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
                    console.log(newJokes)
                    that.setData({lists:newData,page:newPage});
                 }
            }
        })    
    }
})