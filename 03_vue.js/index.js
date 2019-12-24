
var app = new Vue({ 
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
      message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다'
    }
  })

  var app3 = new Vue({
    el: '#app-3',
    data: {
      seen: true
    },
    methods: {
        change: function (){
            if(this.seen == true){
              this.seen =false;
             
            }
            else{
               this.seen =true;
         
            }

        

      }
    }
    })


  


 