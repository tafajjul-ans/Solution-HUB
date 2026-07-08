let allVideos=[];


fetch("videos.json")
.then(r=>r.json())
.then(data=>{
    
    
allVideos=data;

show(data);

});


function show(list){

const box=document.getElementById("videos");

box.innerHTML="";

list.forEach((v,i)=>{

box.innerHTML+=`

<div class="card">

<img src="thumbnail/${v.thumbnail}">

<div class="info">

<h3>${v.title}</h3>

<p>${v.description}</p>

<a class="watch" href="watch.html?id=${v.id}">
▶ Watch
</a>

</div>

</div>

`;

});

}


document.getElementById("search").addEventListener("input",function(){

let text=this.value.toLowerCase();

show(

allVideos.filter(v=>

v.title.toLowerCase().includes(text) ||

v.description.toLowerCase().includes(text)

)

);

});