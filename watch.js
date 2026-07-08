const loading = document.getElementById("loading");

const video = document.getElementById("video");
const source = document.getElementById("videoSource");

const playPause = document.getElementById("playPause");
const centerPlay = document.getElementById("centerPlay");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const seek = document.getElementById("seek");

const fullscreen = document.getElementById("fullscreen");

const overlay = document.getElementById("overlay");

const title = document.getElementById("videoTitle");
const description = document.getElementById("videoDescription");

const relatedVideos = document.getElementById("relatedVideos");

const leftTap = document.getElementById("leftTap");
const rightTap = document.getElementById("rightTap");
const seekPopup = document.getElementById("seekPopup");


let allVideos = [];
let currentVideo = 0;
let hideTimer;


fetch("videos.json")
.then(res => res.json())
.then(data => {

allVideos = data;

const params = new URLSearchParams(location.search);

const id = Number(params.get("id"));

currentVideo = allVideos.findIndex(v => v.id === id);

if(currentVideo < 0){
currentVideo = 0;
}

loadVideo(currentVideo);

});



function loadVideo(index){

const v = allVideos[index];

source.src = "videos/" + v.video;

video.load();
    
title.textContent = v.title;

description.textContent = v.description;
    
playPause.innerHTML = "▶";

centerPlay.style.display = "flex";

updateRelated(index);

}



function updateRelated(currentIndex){

relatedVideos.innerHTML = "";

allVideos.forEach((v,i)=>{

if(i===currentIndex) return;


relatedVideos.innerHTML += `

<div class="related-card"
onclick="loadVideo(${i})">

<img src="thumbnail/${v.thumbnail}">

<div class="related-info">

<h4>${v.title}</h4>

<p>${v.description}</p>

</div>

</div>

`;

});

}


function formatTime(sec){

if(isNaN(sec)) return "0:00";

sec = Math.floor(sec);

let m = Math.floor(sec / 60);

let s = sec % 60;

if(s < 10) s = "0" + s;

return m + ":" + s;

}



playPause.addEventListener("click",()=>{


if(video.paused){

video.play();

playPause.innerHTML="❚❚";

centerPlay.style.display="none";


}else{


video.pause();

playPause.innerHTML="▶";

centerPlay.style.display="flex";


}

});




centerPlay.onclick = ()=>{

video.play();

playPause.innerHTML="❚❚";

centerPlay.style.display="none";

};





video.addEventListener("loadedmetadata",()=>{

duration.textContent = formatTime(video.duration);

seek.max = Math.floor(video.duration);

});





video.addEventListener("timeupdate",()=>{


current.textContent = formatTime(video.currentTime);

seek.value = video.currentTime;


let percent = (video.currentTime / video.duration) * 100;


seek.style.background =
`linear-gradient(to right, red ${percent}%, #444 ${percent}%)`;


});





seek.oninput = ()=>{

video.currentTime = seek.value;

};





fullscreen.onclick = ()=>{


if(document.fullscreenElement){

document.exitFullscreen();

}

else{

document.querySelector(".video-container").requestFullscreen();

}


};





function showControls(){


overlay.classList.remove("hide");

overlay.classList.add("show");


clearTimeout(hideTimer);


hideTimer=setTimeout(()=>{


if(!video.paused){

overlay.classList.remove("show");

overlay.classList.add("hide");

}


},2500);


}






let tapTimer;


function showSeek(text){


seekPopup.innerHTML=text;

seekPopup.classList.add("show");


clearTimeout(tapTimer);


tapTimer=setTimeout(()=>{

seekPopup.classList.remove("show");

},700);


}






leftTap.ondblclick=()=>{


video.currentTime=Math.max(0,video.currentTime-10);

showSeek("-10s");


};





rightTap.ondblclick=()=>{


video.currentTime=Math.min(video.duration,video.currentTime+10);

showSeek("+10s");


};






video.addEventListener("waiting",()=>{


if(loading){

loading.classList.add("show");

}


});





video.addEventListener("playing",()=>{


if(loading){

loading.classList.remove("show");

}


});





video.addEventListener("ended",()=>{


if(currentVideo < allVideos.length-1){


currentVideo++;

loadVideo(currentVideo);


}


});






let clickTimer=0;


video.addEventListener("click",()=>{


let now=Date.now();



if(now-clickTimer < 300){


if(video.paused){

video.play();

}

else{

video.pause();

}


}



clickTimer=now;

showControls();


});




video.addEventListener("touchstart",showControls);