// index.js
//import requestPromise from '../../utils/util'
import request from '../../utils/request'
Page({
  data: {
    url:getApp().globalData.url,
    idiom :'一心一意',
    userInput:'',//用户输入
    userInputSaved:'',//用户输入保存
    pcSaved:'虎虎生威',//电脑接口返回
    inputDisabled:false,//输入框是否禁用
    chatData:[
    ],
    game :{
      //回合数
      round:1,//当前关数
      totalRound:20,//总关数
      singleRoundCount:1,//单关回合数
      pass:true,
      toolCount:0,//道具数量
      rewardSet:2,//表示连通多少关奖励道具
      score:0,//游戏分数
      //游戏规则框
      ruleDialog :{
        //是否显示
        show:true
      },
      //游戏关数弹窗
      roundDialog:{
        //题目
        title:'第一关',
        //按钮
        buttons:[{text: '开始'}],
        //内容
        content:'小试牛刀，本关接上一个成语即可通关哦！',
        //是否显示
        show:false,
      },
      //通用弹窗
      dialog:{
        //题目
        title:'提示',
        //按钮
        buttons:[{text: '确定'},{text:'再玩一次'}],
        //内容
        content:'很遗憾',
        //是否显示
        show:false,
      },
      //顶部提示组件
      toptip:{
        msg:'没有道具可以使用了',
        type:'error',
        show:false
      },
    }
  },
  //点击规则确认框
  tapRuleOkButton(e){
    //关闭规则弹窗
    this.setData({
      'game.ruleDialog.show':false,
      //'game.roundDialog.show':true,
    })
    this.openRoundDialog();
  },
    //开启结束弹窗
    openGameOverDialog(){
      let show = true;
      this.setData({
        'game.dialog.title':'胜利',
        'game.dialog.content':'恭喜你已经全部通关',
        'game.dialog.show':show,
      })
    },
  //开启游戏失败弹窗
  openGameFailDialog(){
        let show = true;
        this.setData({
          'game.dialog.title':'失败',
          'game.dialog.content':'很遗憾您未能通关，继续加油吧！',
          'game.dialog.show':show,
        })
      },
  //开启关卡弹窗
  openRoundDialog(){
    let show = true;
    this.setData({
      'game.roundDialog.title':'第'+this.data.game.round+'关',
      'game.roundDialog.content':'本关一共'+this.data.game.round+'个来回，点击开始按钮开始游戏把',
      'game.roundDialog.show':show,
    })
  },
  // 失败胜利弹窗按钮触发
  tapDialogButton(e){
    console.log(e)
    //点击确定按钮
    if(e.detail.index==0){
      //console.log('点击确定按钮')
      this.setData({
        'game.dialog.show':false,
      })
    }else if(e.detail.index==1){
      //点击再玩一次
      //console.log('点击再来一次按钮')
      this.setData({
        'game.dialog.show':false,
      })
      wx.reLaunch({
        url: './index'
      })

    }
  },
  //点击回合数弹窗
  async taproundDialogButton(e){
    let result = await request(this.data.url+'/idiom/getIdiomRandom')
    this.data.idiom = result.data.name;
    let idiom =   {
      type:'1',//1 电脑  2 游戏玩家
      content:this.data.idiom
    }
    this.data.chatData.push(idiom)
    this.setData({
      'game.roundDialog.show':false,
      'chatData': this.data.chatData
    })
      //请求随机成语接口
    //  this.getIdiomRandom().then(v=>{
    //     //成语添加到聊天框
    //     this.data.idiom = v
    //     let idiom =   {
    //       type:'1',//1 电脑  2 游戏玩家
    //       content:this.data.idiom
    //     }
    //     this.data.chatData.push(idiom)
    //     this.setData({
    //       'game.roundDialog.show':false,
    //       'chatData': this.data.chatData
    //     })
    //  });

  },
  //随机获取成语接口 暂时没有调用
  async getIdiomRandom(){
   //this.data.idiom = Math.round(Math.random()*9)+'pc'+ Math.round(Math.random()*9)
   let result = await request(this.data.url+'/idiom/getIdiomRandom')
   this.data.idiom = result.data.name;
   return  this.data.idiom
  },
  //根据第一个汉字获取成语接口
  getIdiomByHead(head){
    this.data.idiom = head+'pd'+Math.round(Math.random()*9)
    return this.data.idiom
  },
  //使用道具
  async useTool(){
    console.log('使用道具,道具数量:'+this.data.game.toolCount)
    if(this.data.game.round>this.data.game.rewardSet&&this.data.game.toolCount>0){
      let head = this.data.idiom.substr(3,1)
      let result = await request(this.data.url+'/idiom/getIdiomByHead',{head:head})
      if(result.code=='211'){
        console.log('无此字开头的成语')
        return
      }
      this.setData({
        'userInput':result.data.name, //输入框清空
        'userInputSaved':result.data.name, //输入框禁用
        'game.toolCount':--this.data.game.toolCount//道具次数减1
      })
    }else{
      console.log('没有充足的道具：'+this.data.game.toolCount)
      this.setData({
        'game.toptip.show':true
      })
    }
  },
  //玩家点击确定按钮
  async sendBtn(){
    //更新聊天框
    if(this.data.userInput==''){
      return
    }
    let idiom =       {
      type:'2',//1 电脑  2 游戏玩家
      content:this.data.userInput
    }
    this.data.chatData.push(idiom)
    this.data.userInputSaved = this.data.userInput;
    this.setData({
      'chatData': this.data.chatData,
      //'game.round':this.data.game.round + 1,
      //'game.singleRoundCount':this.data.game.singleRoundCount+1,
      'userInput':'', //输入框清空
      'inputDisabled':true //输入框禁用
    })
    //检查用户输入是否正确
    let pass = true
    if(this.data.userInputSaved.length!=4){
      console.log('游戏结:长度不对'+this.data.userInputSaved)
      pass = false;
    }
    if(this.data.userInputSaved.substr(0,1)!=this.data.idiom.substr(3,1)){
      console.log('游戏结最后一个字不符合'+this.data.idiom+'--'+this.data.userInputSaved)
      pass = false;
    }
    //调用接口看看用户输入的成语是否存在
    let result = await request(this.data.url+'/idiom/isPass',{idiom:this.data.userInputSaved})
    if(!result.data){
      pass = false;
    }
    // 接龙失败
    if(!pass){
      console.log('游戏失败！--'+this.data.game.round)
      this.openGameFailDialog()
      return
    }
    //分数刷新
    this.data.game.score += 10
    console.log('刷新分数：'+ this.data.game.score)
    this.setData({
      'game.score':this.data.game.score
    })
    // if(this.isPass(this.data.userInputSaved)){
      //接龙正确
      if(this.data.game.round<=this.data.game.totalRound){
        let nowRound = this.data.game.round
        let nowSingleRoundCount = this.data.game.singleRoundCount
       console.log('目前游戏关数'+nowRound+'，本关剩余接龙数'+(nowRound-nowSingleRoundCount))
        if(nowSingleRoundCount<nowRound){
          //代表本关还没有结束
          nowSingleRoundCount++
          //根据开头获取一个成语 
          let head = this.data.userInputSaved.substr(3,1)
          //根据开头请求成语接口
          let result = await request(this.data.url+'/idiom/getIdiomByHead',{head:head})
          if(result.code=='211'){
            console.log('无此字开头的成语')
            return
          }
          this.data.idiom = result.data.name;
          let idiom =       {
            type:'1',//1 电脑  2 游戏玩家
            content: result.data.name
          }
          this.data.chatData.push(idiom)
          this.setData({
            'game.singleRoundCount':nowSingleRoundCount,
            'chatData':this.data.chatData,
            'inputDisabled':false,
          })

        }else{
          //代表本关结束
          console.log('本关已经结束:'+this.data.game.round);
          // 道具刷新
          if(this.data.game.round%this.data.game.rewardSet==0){
            this.data.game.toolCount++
          }
          nowRound++
          if(nowRound>this.data.game.totalRound){
            console.log('游戏胜利结束----')
            this.openGameOverDialog();
            return
          }
          nowSingleRoundCount = 1
           //------------------------
          this.setData({
            'game.singleRoundCount':nowSingleRoundCount,   
            'game.toolCount':this.data.game.toolCount,        
            'inputDisabled':false,
            'game.round': nowRound,
          })
           //------------------------
          this.openRoundDialog()
          //this.taproundDialogButton()
         
        }
        // this.setData({
        //   'inputDisabled':false,
        //   'game.round': nowRound,
        //   'game.singleRoundCount':nowSingleRoundCount,
        // })    
      }else{
        //游戏全部通关 游戏结束
        console.log('恭喜你全部通关'+this.data.game.round)
        return
      }

    // }else{
    //   //接龙失败
    //   console.log('游戏结束'+this.data.game.round)
    //   return
    // }
  },
    //成语是否正确接口
    isPass(){
      if(this.data.userInputSaved.length!=4){
        console.log('游戏结:长度不对'+this.data.userInputSaved)
        return false;
      }
      if(this.data.userInputSaved.substr(0,1)!=this.data.idiom.substr(3,1)){
        console.log('游戏结最后一个字不符合'+this.data.idiom+'--'+this.data.userInputSaved)
        return false;
      }
      //调用接口看看用户输入的成语是否存在
      //let result = await request('http://localhost:7777/idiom/isPass',{idiom:input})
      return true;
    },
    //用户输入离开input
    userInputBlur(event){
      this.data.userInput = event.detail.value;
  },
})
