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
// Splash animation complete hone ke baad fade out

setTimeout(() => {
    document.getElementById("splash-screen").style.opacity = "0";
}, 2200);
window.addEventListener("load", () => {

    const splash = document.getElementById("splash-screen");

    // 2.3 sec baad splash hide
    setTimeout(() => {

        splash.classList.add("hide");

        // Animation complete hone ke baad remove
        setTimeout(() => {
            splash.remove();
        }, 600);

    }, 2300);

});