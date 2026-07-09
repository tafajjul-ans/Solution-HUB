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
const search = document.getElementById("search");

function searchVideos(){
    const text = search.value.toLowerCase();

    show(
        allVideos.filter(v =>
            v.title.toLowerCase().includes(text) ||
            v.description.toLowerCase().includes(text)
        )
    );
}

search.addEventListener("input", searchVideos);
document.getElementById("searchBtn").addEventListener("click", searchVideos);

document.getElementById("searchBtn").onclick = () => {
    searchVideos();
    document.getElementById("search").blur();
};

const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("search");

searchInput.addEventListener("focus", () => {
    searchBox.classList.add("active");
});

searchInput.addEventListener("blur", () => {
    if(searchInput.value.trim()==="")
        searchBox.classList.remove("active");
});
/* ==========================
   INSTALL POPUP
========================== */

let deferredPrompt = null;

const installPopup = document.getElementById("install-popup");
const installBtn = document.getElementById("install-btn");
const closeInstall = document.getElementById("close-install");

/* Install available */

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    const nextShow = Number(localStorage.getItem("installPopupNextShow")) || 0;

    if (Date.now() >= nextShow) {

        installPopup.style.display = "flex";

    }

});

/* Install button */

installBtn.addEventListener("click", async () => {

    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {

        installPopup.style.display = "none";

    }

    deferredPrompt = null;

});

/* Close button */



closeInstall.addEventListener("click", () => {

    installPopup.classList.add("hide");

    const nextShow = Date.now() + (3 * 24 * 60 * 60 * 1000);

    localStorage.setItem("installPopupNextShow", nextShow);

    setTimeout(() => {

        installPopup.style.display = "none";
        installPopup.classList.remove("hide");

    }, 300);

});

/* Installed */

window.addEventListener("appinstalled", () => {

    installPopup.style.display = "none";

    localStorage.removeItem("installPopupClosed");

});