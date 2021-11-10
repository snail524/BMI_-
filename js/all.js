var out = document.querySelector('.out');
var text = document.querySelector('.text');
var outtext = document.querySelector('.outtext');
var change = document.querySelectorAll('.change');
var circle_out = document.querySelector('.circleout');
var remove_content = document.querySelector('.remove');
var resetdata= document.querySelector('.reset');
var list =document.querySelector('.list');
for (var i =0 ; i< change.length;i++){  
  change[i].setAttribute('style','display: none');
}



var data = JSON.parse(localStorage.getItem('bmi')) || [];


updateList(data);
resetdata.addEventListener('click',resetData,false);
out.addEventListener('click',calculate,false);
circle_out.addEventListener('click',calculate,false);
var bmi;
//純計算bmi

function calculate(){
  var height = parseInt(document.querySelector('.height').value);
  var weight = parseInt(document.querySelector('.weight').value);
  bmi_num = weight / (((height/100) ** 2));
  bmi_num = bmi_num.toFixed(2);  // 取2位

  var Today=new Date();
  console.log((Today.getMonth()+1) +'-'+ Today.getDate() +  '-' +Today.getFullYear());
  var date=(Today.getMonth()+1) +'-'+ Today.getDate() +  '-' +Today.getFullYear();


  var bmilist={
    content: bmi_num,
    wei : weight,
    hei : height,
    day: date,
  };

  data.push(bmilist);
  console.log(data)
  // localStorage.setItem('bmi',JSON.stringify(data)); 

  text.innerHTML=  '<h2>' + bmi_num + '</h2><span>bmi</span>';
  
  out.setAttribute('style','display: none')
  for (var i =0 ; i< change.length;i++){  
    change[i].setAttribute('style','display: block');
  }
  bmi_indicate(bmi_num);
};

function bmi_indicate(bmi_num){
  text.innerHTML=  '<h2>' + bmi_num + '</h2><span>bmi</span>';
  len = data.length-1;
  console.log(data.length);
  console.log(len);
  if(bmi_num<=18.5){
    outtext.innerHTML="體重過輕";
    data[len].status= "體重過輕" ;
    data[len].color= "#31BAF9" ;

    for (var i =0 ; i< change.length;i++){  
      change[i].setAttribute('style','color: #31BAF9;');
    }
    change[0].setAttribute('style','border:solid 3px #31BAF9');
    
  }else if(bmi_num>18.5 && bmi_num <=25){
    outtext.innerHTML="理想";
    data[len].status= "理想" ;
    data[len].color= "#86D73F" ;

    for (var i =0 ; i< change.length;i++){  
      change[i].setAttribute('style','color: #86D73F;');
    }
    change[0].setAttribute('style','border:solid 3px #86D73F');
  

  }else if(bmi_num>25 && bmi_num <=30){
    outtext.innerHTML="體重稍重";
    data[len].status= "體重稍重" ;
    data[len].color= "#FF982D" ;

    for (var i =0 ; i< change.length;i++){  
      change[i].setAttribute('style','color: #FF982D;');
    }
    change[0].setAttribute('style','border:solid 3px #FF982D');
  }else if(bmi_num>30){
    outtext.innerHTML="要注意一下體重唷";
    data[len].status= "要注意一下體重唷" ;
    data[len].color= "red" ;


    for (var i =0 ; i< change.length;i++){  
      change[i].setAttribute('style','color: red;');
    }
    change[0].setAttribute('style','border:solid 3px red');
  }
  localStorage.setItem('bmi',JSON.stringify(data)); 
  updateList(data);

};




function updateList(items){
  
  console.log(items);
  var str='';
  var len=items.length;
  for(var i=0; len>i;i++){
    border = '<li style="border-left: solid 8px ' +items[i].color+'">'
    status = '<p>'+items[i].status+'</p>';
    content='<p> BMI  '+ items[i].content + ' </p><p>weight ' + items[i].wei +'kg</p><p>height  '+ items[i].hei+'cm</p><p>';
    time = items[i].day + '</p>';
    str += border +status+ content+time+'</li>'


    console.log(items[i].content +'bbb'+ items[i].wei +'ttt'+ items[i].hei);
  }
  list.innerHTML= str;
};

remove_content.addEventListener('click',remove,false);


function remove(){
  for (var i =0 ; i< change.length;i++){  
    change[i].setAttribute('style','display: none');
  }
  out.setAttribute('style','display: block');
};


function resetData(){
  console.log('reset');
  data = [];
  localStorage.setItem('bmi',JSON.stringify(data)); 
  updateList(data);
};