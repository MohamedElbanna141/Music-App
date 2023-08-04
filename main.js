const music = [
    
];



function updatePlaying(index){
    playing = music[index.id].path;
    oldSongNum = currentSongNum;
    currentSongNum = Number(index.id);
    document.getElementById(currentSongNum).style.border = "2px solid white";
    document.getElementById(oldSongNum).style.border = "none";
    playSong();
}
function mouseOverLi(index){
    let Li = document.getElementById(index.id);
    Li.getElementsByTagName("p").style.color = "black";
}

function playSong(){
    let currentSong = document.getElementById("currentSong");
    if(oldPlaying == playing){
        currentSong.play();
    }else{
        oldPlaying = playing;
        currentSong.src = playing;
        currentSong.play();
    }
    document.getElementById("pause").style.display = "block";
    document.getElementById("play").style.display = "none";
}

document.getElementById("pause").onclick = function(){
    currentSong.pause();
    document.getElementById("play").style.display = "block";
    document.getElementById("pause").style.display = "none";
};

function previousSong(){
    currentSongNum--;
    if(currentSongNum < 0){
        currentSongNum = music.length - 1;
        document.getElementById("0").style.border = "none";
    }else{
        document.getElementById(currentSongNum+1).style.border = "none";
    }
    document.getElementById(currentSongNum).style.border = "2px solid white";
    playing = music[currentSongNum].path;
    playSong();
}

function nextSong(){
    currentSongNum++;
    if(currentSongNum >= music.length){
        currentSongNum = 0;
        document.getElementById(music.length-1).style.border = "none";
    }else{
        document.getElementById(currentSongNum-1).style.border = "none";
    }
    document.getElementById(currentSongNum).style.border = "2px solid white";
    playing = music[currentSongNum].path;
    playSong();
}

let oldPlaying;
let playing;
let AllLi;
let j = 0;
let i;
let listCom;
let songNum;
let songName;
let oldSongNum;
let currentSongNum;
let songRemove;

let sideBarOpen = false;

function displaySide(){
    for(let i = 0; i < music.length; i++){
        listCom = document.createElement("li");
        songNum = document.createElement("p");
        songName = document.createElement("p");

        listCom.setAttribute("id", i);
        songNum.innerHTML = i + 1;
        songName.innerHTML = music[i].name;

        document.getElementById("musicList").appendChild(listCom);
        document.getElementById(i).appendChild(songNum);
        document.getElementById(i).appendChild(songName);
    };

    document.getElementById("sideBar").style.display = "block";

    liTags();

}

function liTags(){
    AllLi = document.querySelectorAll("li");
    console.log(AllLi);
    while(j<AllLi.length){
        AllLi[j].setAttribute("onclick", "updatePlaying(this)");
        AllLi[j].setAttribute("onmouseover", "mouseOverLi(this)");
        j++;
    };
}

function hideSide(){
    document.getElementById("sideBar").style.display = "none";
    clearPlaylist();
}
function clearPlaylist(){
    for(let i = 0; i < music.length; i++){
        let element = document.getElementById(i);
        element.remove();
    };
    j = 0;
}

function addSong(){
    document.getElementById("add").style.display = "block";
    document.getElementById("musicList").style.display = "none";
}
function hideAdd(){
    clearPlaylist();
    document.getElementById("add").style.display = "none";
    document.getElementById("musicList").style.display = "block";
    displaySide();
}
function submitSong(){
    clearPlaylist();
    let newSongName = document.getElementById("newSongName").value;
    let newSongFile = "music/" + document.getElementById("newSongFile").files[0].name;
    console.log(newSongName);
    console.log(newSongFile);
    music.push({
        name: newSongName,
        path: newSongFile,
    });
    displaySide();
    document.getElementById("add").style.display = "none";
    document.getElementById("musicList").style.display = "block";
    document.getElementById("newSongName").value = "";
    
}
function search(){
    clearPlaylist();
    let searchWord = document.getElementById("search").value;
    if(searchWord != ""){
        for(i = 0; i < music.length; i++){
            if(searchWord == music[i].name){
                listCom = document.createElement("li");
                songNum = document.createElement("p");
                songName = document.createElement("p");
                

                listCom.setAttribute("id", i);
                songNum.innerHTML = i + 1;
                songName.innerHTML = music[i].name;

                document.getElementById("musicList").appendChild(listCom);
                document.getElementById(i).appendChild(songNum);
                document.getElementById(i).appendChild(songName);
            }else{
                console.log("Not Found");
            }
        }
        liTags();
    }else if(searchWord == ""){
        displaySide();
        console.log("write something");

    }  
}

var mu = document.getElementById("currentSong");
var progressed = document.getElementById("myprogressBar");
var Progress_Status = document.getElementById("Progress_Status");
mu.ontimeupdate = function(e){
    /* console.log("playing", e); */
    document.getElementById("myprogressBar").style.width =Math.floor(mu.currentTime * 100 / mu.duration) + "%"; 
}
Progress_Status.onclick = function(e){
    /* console.log(e.offsetX); */
    mu.currentTime = ((e.offsetX / Progress_Status.offsetWidth) * mu.duration);
}

