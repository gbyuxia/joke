var app = getApp();
function moveSpace(str) {
    var temp="";
    var splitstring = str.split("　");
    for(var i = 0; i < splitstring.length; i++){
       temp += splitstring[i];        
    }
    return temp;
}
var apiUrl = 'http://japi.juhe.cn/joke/content/list.from';
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
                time: thisTime,
                sort:'desc',
                page:newPage,
                pagesize:20,
                key:'2fa3c3bf45116597121ad83f54004c13'
            },
            success: function(res) { 
                if(res.data.reason=="Success"){
                    let newJokes = res.data.result.data.reverse(),newData = oldData ? newJokes.concat(oldData):newJokes;
                    newData.map(function(c,i){                        
                        newData[i].content=moveSpace(c.content);
                    })
                    that.setData({lists:newData,page:newPage});
                }
            }
        })    
    }
})