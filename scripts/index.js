  function Carsole(json){
      // console.log(this);
      //得到div
       this.dom = document.getElementById(json.id);
       //设置ul属性
       this.aImgUl = null;
       this.oLeftBtn = null;
       this.oRightBtn = null;
       this.oBttomBtn = null;
       this.now = 0;
       //设置img属性
       this.aImg = json.aImg;
       this.width = json.width;
       this.height = json.height;
       this.playDru = json.playDru;


       this.init();

       this.blindEvent();

       this.playAuto();
    }
    Carsole.prototype.init = function(){
      // console.log(this);
      //创建ul
      this.dom.style.position = 'relative';
      this.dom.style.width = this.width + 'px';
      this.dom.style.height = this.height + 'px';
      this.dom.style.marginLeft = 'auto';
      this.dom.style.marginRight = 'auto';
      this.dom.style.marginTop = 30 + 'px';
      this.aImgUl = document.createElement('ul');
      for(var i=0;i<this.aImg.length;i++){
        var oLi = document.createElement('li');
        var oImg = document.createElement('img');
        oImg.src = this.aImg[i];

        oImg.style.width = this.width + 'px';
        oImg.style.height = this.height + 'px';

        oLi.style.listStyle = 'none';
        oLi.style.position = 'absolute';
        oLi.style.top = 0;
        oLi.style.left = 0;
        oLi.style.zIndex = 0;
        oLi.style.opacity = 0.5;
        if(i==0){
          oLi.style.zIndex = 50;
          oLi.style.opacity = 1;
        }
        
        oLi.appendChild(oImg);
        this.aImgUl.appendChild(oLi);

      }
      //将其放入div
      this.dom.appendChild(this.aImgUl);
      //左右按钮
      this.oLeftBtn = document.createElement('span');
      this.oLeftBtn.innerHTML = '&lt;';
      this.oLeftBtn.style.zIndex = 100;
      this.oLeftBtn.className = 'leftBtn';


      this.oRightBtn = document.createElement('span');
      this.oRightBtn.innerHTML = '&gt;';
      this.oRightBtn.style.zIndex = 100;
      this.oRightBtn.className = 'rightBtn';

      this.dom.appendChild(this.oLeftBtn);
      this.dom.appendChild(this.oRightBtn);
      //底部按钮

      this.oBttomBtn = document.createElement('ul');
      this.oBttomBtn.className = 'bttomBtn';
      this.oBttomBtn.style.zIndex = 100;
      for(var i=0;i<this.aImg.length;i++){
        var oLi = document.createElement('li');
        if(i==0){
          oLi.className = 'active';
        }
        this.oBttomBtn.appendChild(oLi);
      }

      
      this.dom.appendChild(this.oBttomBtn);
      this.oBttomBtn.style.marginLeft = -this.oBttomBtn.offsetWidth/2 + 'px';

    }
    Carsole.prototype.playAuto = function(){
      var _self = this;
      var timer = setInterval(function(){
        _self.next();
      },this.playDru);
      this.dom.onmouseover = function(){
      clearInterval(timer);
      }
      this.dom.onmouseout = function(){
        timer = setInterval(function(){
        _self.next();
      },_self.playDru);
      }
    }
    
    Carsole.prototype.blindEvent = function(){
      var _self = this;
      this.oRightBtn.onclick = function(){
        _self.next();
      }
      this.oLeftBtn.onclick = function(){
        _self.pre();
      }
      for(var i=0;i<this.oBttomBtn.children.length;i++){
        this.oBttomBtn.children[i].index = i;
        this.oBttomBtn.children[i].onclick = function(){
          _self.now = this.index;
          _self.tab();
        }
      }
      
    }
    Carsole.prototype.pre = function(){
      this.now--;
      if(this.now < 0){
        this.now = this.aImg.length - 1; 
      }
      this.tab();
    }
    Carsole.prototype.next = function(){
      this.now++;
      if(this.now == this.aImg.length){
        this.now = 0;
      }
      this.tab();
    }
    Carsole.prototype.tab = function(){
      for(var i=0;i<this.aImg.length;i++){
        this.oBttomBtn.children[i].className = '';
        this.aImgUl.children[i].style.zIndex = '';
        this.aImgUl.children[i].style.opacity = '0.5';
      }
      this.oBttomBtn.children[this.now].className = 'active';
      this.aImgUl.children[this.now].style.zIndex = 50;
      // this.aImgUl.children[this.now].style.zIndex = ;
      move(this.aImgUl.children[this.now],{opacity:100});
    }
    new Carsole({
      id:"a-img",
      aImg:[
      "images/c_1.jpg",
      "images/c_2.jpg",
      "images/c_3.jpg",
      "images/c_4.jpg",
      "images/c_5.jpg",
      ],
      width:1226,
      height:460,
      playDru:1000
    });

$("#signup").click(function() {
  $("#sign").css({"display":"block"})
})
  function show(obj){
      obj.style.display = "block";
    }
    function hide(obj){
      obj.style.display = "none";
    }
    function getLength(str){
      return str.replace(/[\u4e00-\u9fa5]/g,"ok").length;
    }
    function setCancel(oInput,oSpan){
      if(oInput.value.length > 0){
          show(oSpan);
        }else{
          hide(oSpan);
        }
    }
    window.onload = function(){
      //获取用户表单元素
      var bUserflag = false;
      var bPhoneflag = false;
      var bCodeflag = false;
      var bPwflag = false;
      var oFrom = document.forms[0];
      var oDiv1 = document.getElementById("userinput");
      var aDiv = oDiv1.getElementsByTagName("span");
      var oUserinput = oFrom[0];
      // console.log(oUserinput);
      
      //获取手机表单元素
      var oPhoneinput = oFrom[1];
      // console.log(oPhoneinput);
      var oDiv2 = document.getElementById("phoneinput");
      var aDiv2 = oDiv2.getElementsByTagName("span");

      //获取验证码表单元素
      var oCodeinput = oFrom[2];
      // console.log(codeinput);
      var oDiv3 = document.getElementById("codeinput");
      var aDiv3 = oDiv3.getElementsByTagName("span");
      
      //获取密码表单元素
      var oPwinput = oFrom[3];
        // console.log(oPwinput);
      var oDiv4 = document.getElementById("pwinput");
      var oUl = document.getElementById("ul2");
      var aDiv4 = oDiv4.getElementsByTagName("span");
      var aLi = oUl.getElementsByTagName("li");
      var bPwd1 = false;
      var bPwd2 = false;
      var bPwd3 = false;
      // console.log(aLi[1]);

      var oBtn = document.getElementById("register");
      //用户输入
      oUserinput.focus();

      oUserinput.onkeyup = function(){
        setCancel(oUserinput,aDiv[0]);
      }
      aDiv[0].onclick = function(){
        oUserinput.value = "";  
        hide(aDiv[1]);
        hide(aDiv[2]);
        show(aDiv[3]);
        oUserinput.focus();
      }

      //验证用户名
      oUserinput.onblur = function(){

        hide(aDiv[1]);
        hide(aDiv[2]);
        hide(aDiv[3]);

        var sVal = oUserinput.value;
        var reg1 = /[a-z\u4e00-\u9fa50-9_]+/g;
        var reg2 = /^[0-9]+$/g;
        //用户名不能超过7个汉字或14个字符
        if(sVal == ""){
          bUserflag = false;
        }else if(getLength(oUserinput.value) > 14){
          show(aDiv[2]);
          aDiv[2].innerHTML = "用户名不能超过7个汉字或14个字符";
        }
        //用户名仅支持中英文、数字或下划线，且不能为纯数字
        else if(!reg1.test(sVal) || reg2.test(sVal)){
          show(aDiv[2]);
          aDiv[2].innerHTML = "用户名仅支持中英文、数字或下划线，且不能为纯数字";
        }
        else{
          ajax(   //?
            'http://127.0.0.1:3000/checkData?username='+sVal,
            function(str){
              var bCanReg = eval(str);
              if(bCanReg){
                show(aDiv[1]);
                bUserflag = true;
              }else{
                show(aDiv[2]);
                aDiv[2].innerHTML = "此用户名太受欢迎，请更换一个";
              }
            },
            function(str){
              console.log("err:"+str) 
            }
          );
        }
      }
      
      oUserinput.onfocus = function(){
        hide(aDiv[1]);
        hide(aDiv[2]);
        show(aDiv[3]);
      }


      //手机号验证
      //取消按钮
      oPhoneinput.onkeyup = function(){
        setCancel(oPhoneinput,aDiv2[0]);
      }

      //取消操作
      aDiv2[0].onclick = function(){
        oPhoneinput.value = ""; 
        hide(aDiv2[0]);
        hide(aDiv2[1]);
        show(aDiv2[2]);
        oPhoneinput.focus();
      }

      //限制手机位数
      oPhoneinput.onkeydown = function(ev){
        var oEvent = ev || event;

        if(oPhoneinput.value.length > 10 && oEvent.keyCode !=8 &&oEvent.keyCode !=37 && oEvent.keyCode!=39){
          return false;
        }
      }
      //验证
      oPhoneinput.onblur = function(){
        hide(aDiv2[1]);
        hide(aDiv2[2]);
        hide(aDiv2[3]);

        var sVal = oPhoneinput.value;
        var reg = /1[3578][\d]{9}/g;
        //用户名不能超过7个汉字或14个字符
        if(sVal == ""){
          bPhoneflag = false;
        }
        else if(!reg.test(sVal)){
          show(aDiv2[2]);
          aDiv2[2].innerHTML = "手机号码格式不正确";
          bPhoneflag = false;
        }else{
          //此处省略ajax
          show(aDiv2[1]);
          bPhoneflag = true;
        }     
      }
      //当得到焦点时显示的信息
      oPhoneinput.onfocus = function(){
        hide(aDiv2[1]);
        hide(aDiv2[2]);
        show(aDiv2[3]);
      }
      //验证码验证

      oCodeinput.onkeyup = function(){
        setCancel(oCodeinput,aDiv3[0]);
      }

      //取消操作
      aDiv3[0].onclick = function(){
        oCodeinput.value = "";  
        hide(aDiv3[0]);
        hide(aDiv3[1]);
        show(aDiv3[2]);
        oCodeinput.focus();

        bCodeflag = false;
      }

      //限制手机位数
      oCodeinput.onkeydown = function(ev){
        var oEvent = ev || event;

        if(oCodeinput.value.length > 5 && oEvent.keyCode !=8 &&oEvent.keyCode !=37 && oEvent.keyCode!=39){
          return false;
        }
      }
      //验证
      oCodeinput.onblur = function(){
        hide(aDiv3[1]);
        hide(aDiv3[2]);

        var sVal = oCodeinput.value;
        var reg = /\d{6}/g;

        if(sVal == ""){
          bCodeflag = false;
        }
        else if(!reg.test(sVal)){
          show(aDiv3[2]);
          bCodeflag = false;
        }else{
          show(aDiv3[1]);
          bCodeflag = true;
        }     
      }
      //当得到焦点时显示的信息
      oCodeinput.onfocus = function(){
        hide(aDiv3[1]);
        hide(aDiv3[2])
      }

      //密码验证


      oPwinput.onkeyup = function(){
        setCancel(oPwinput,aDiv4[0]);

        var sSuc = "li1 li1_suc";
        var sErr = "li1 li1_err";
        var sVal = oPwinput.value;
        var reg1 = /[\da-z\~\`\!\@\#\$\%\^\&\*\(\)\_\-\=\+\[\]\{\}\|\\\,\<\.\>\/\?\;\'\:\"]+/ig;
        var reg2 = /\s/g;

        //长度为6-14个字符
        if(sVal.length >= 6 && sVal.length <=14){
          aLi[0].className = sSuc;
          bPwd1 = true;
        }else{
          aLi[0].className = sErr;
        }
        //支持数字大小写字母和标点符号
        if(reg1.test(sVal)){
          aLi[1].className = sSuc;
          bPwd2 = true;
        }else{
          aLi[1].className = sErr;
        }
        //不允许有空格
        if(!reg2.test(sVal)){
          aLi[2].className = sSuc;
          bPwd3 = true;
        }else{
          aLi[2].className = sErr;
        }
      }
      
      //取消操作
      aDiv4[0].onclick = function(){
        oPwinput.value = "";

        hide(aDiv4[0]);
        hide(aDiv4[1]);
        hide(aDiv4[2]);

        bPwd1 = false;
        bPwd2 = false;
        bPwd3 = false;
        bPwflag = false;
        for(var i=0;i<aLi.length-1;i++){
          aLi[i].className = "li1";
        }
        show(oUl);
        oPwinput.focus();
      }
      
      //得到隐藏焦点信息
      oPwinput.onfocus = function(){
        show(oUl);
        hide(aDiv4[1]);
        hide(aDiv4[2]);
        if(bPwd1 && bPwd2 &&bPwd3){
          for(var i=0;i<aLi.length-1;i++){
          aLi[i].className = "li1_suc";
          }
        }else{
          bPwflag = false;
        }
        
      }

      //失去焦点时
      oPwinput.onblur = function(){

        if(bPwd1 && bPwd2 && bPwd3){  
          hide(oUl);
          show(aDiv4[1]);
          bPwflag = true;
        }else{
          bPwflag = false;
        }
        if(oPwinput.value == ""){
          hide(oUl);
          bPwflag = false;
        }
      }
      oBtn.onclick = function(){
        if(oUserinput.value == ""){
          show(aDiv[2]);
          aDiv[2].innerHTML = "请您输入用户名";
          bUserflag = false;
        }
        if(oPhoneinput.value == ""){
          show(aDiv2[2]);
          aDiv2[2].innerHTML = "请您输入手机号";
          bPhoneflag = false;
        }
        if(oCodeinput.value == ""){
          show(aDiv3[2]);
          aDiv3[2].innerHTML = "请您输入验证码";
          bCodeflag = false;
        }
        if(oPwinput.value == ""){
          show(aDiv4[2]);
          aDiv4[2].innerHTML = "请您输入密码";
          bPwflag = false;
        }
        if(bUserflag && bPhoneflag && oCodeinput && oPwinput){
          oFrom.submit();
        }
      }
    }