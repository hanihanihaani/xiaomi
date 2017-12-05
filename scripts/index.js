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