//Initializing variables
var play = document.querySelector(".play");
var prevSong = document.querySelector(".previousSong");
var nextSong = document.querySelector(".nextSong");
var playingGif = document.querySelector("#gif");
var thumbImg = document.querySelector("#thumbImg");
var songProgBar = document.querySelector("#songProgressBar");
var songTime = document.querySelector(".songTime");
var album = document.querySelector("#album");
var slide = document.querySelector(".slide");
var cat = document.querySelectorAll(".cat");
var songList = document.querySelector(".songList");
let repeat = document.querySelector('.repeat');
let shuffle = document.querySelector('.shuffle');
let repeatOn = false, shuffleOn = false;
var songIndex = 0, oldSongIndex;

//array of songs has provided by songs.js script
let albums = [bollySongs, bhajan];
let songs = albums[0];

//function to create song items in the song list
for (let i = 0; i < songs.length; i++) {
  createElements();
}


var currentSong = new Audio(`${songs[0].filePath}`);
var songItem = document.querySelectorAll(".songItem");
var songItemPlay = document.querySelectorAll(".songItemPlay");
var musicGif = document.querySelectorAll(".musicGif");

songItemFunc();
songItemPlayFunc();
songItemFunc2();

// when you click the play-pause button
play.onclick = () => {
  if (currentSong.paused || currentSong.currentTime <= 0) {
    currentSong.play();
    play.classList.replace("fa-circle-play", "fa-circle-pause");
    playingGif.style.opacity = 1;
    thumbImg.src = songs[songIndex].coverPath;
    
    songItemPlayCls().querySelector(".songItemPlay").classList.replace("fa-circle-play", "fa-circle-pause");
    songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
  }
  else {
    currentSong.pause();
    play.classList.replace("fa-circle-pause", "fa-circle-play");
    playingGif.style.opacity = 0;

    songItemPlayCls().querySelector(".songItemPlay").classList.replace("fa-circle-pause", "fa-circle-play");
    songItemPlayCls().querySelector(".musicGif").style.opacity = 0;
  }
};

// plays the previous song
prevSong.onclick = () => {
  if (songIndex <= 0) songIndex = +`${songs.length - 1}`;
  else songIndex -= 1;

  playTheSong();
  songItemPlayCls().querySelector(".songItemPlay").classList.replace("fa-circle-play", "fa-circle-pause");
  songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
};

// plays the next song
nextSong.onclick = () => {
  if (songIndex >= +`${songs.length - 1}`) songIndex = 0;
  else songIndex += 1;

  playTheSong();
  songItemPlayCls().querySelector(".songItemPlay").classList.replace("fa-circle-play", "fa-circle-pause");
  songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
};

repeat.onclick = () => {
  repeatOn = (repeatOn === false ? true : false);
  if (repeatOn === true) {
    shuffle.style.color = 'rgb(119, 114, 114)';
    shuffleOn = false;
  }
  repeat.style.color = (repeat.style.color == 'rgb(119, 114, 114)' ? 'rgb(255, 255, 255)' : 'rgb(119, 114, 114)');
}

shuffle.onclick = () => {
  shuffleOn = (shuffleOn === false ? true : false);
  if (shuffleOn === true) {
    repeat.style.color = 'rgb(119, 114, 114)';
    repeatOn = false;
  }
  shuffle.style.color = (shuffle.style.color == 'rgb(119, 114, 114)' ? 'rgb(255, 255, 255)' : 'rgb(119, 114, 114)');
}

album.onclick = () => {
  slide.style.display = slide.style.display === "initial" ? "none" : "initial";
  
  $(document).mouseup(function (e) {
    if ($(e.target).closest(".slide").length === 0) {
        $(".slide").hide();
    }
  });

  cat.forEach((e, i) => {
    e.onclick = () => {
      currentSong.pause();
      play.classList.replace("fa-circle-pause", "fa-circle-play");
      playingGif.style.opacity = 0;
      currentSong.src = "";
      songList.innerHTML = "";
      songs = albums[i];
      for (let i = 0; i < songs.length; i++) {
        createElements();
      }
  
      currentSong = new Audio(`${songs[0].filePath}`);
      songItem = document.querySelectorAll(".songItem");
      songItemPlay = document.querySelectorAll(".songItemPlay");
      musicGif = document.querySelectorAll(".musicGif");
      songIndex = 0;
  
      songItemFunc();
      songItemPlayFunc();
      songItemFunc2();
      endedFunc();
      changeFunc();
      timeUpdateFunc();
    };
  });
};

endedFunc();
timeUpdateFunc();
changeFunc();



function createElements() {
  let div = document.createElement("div");
  div.setAttribute("class", "songItem");

  let img = document.createElement("img");
  img.setAttribute("alt", "25");

  let span1 = document.createElement("span");
  span1.setAttribute("class", "songName");

  let span2 = document.createElement("span");
  span2.setAttribute("class", "songDurPlay");

  let span21 = document.createElement("img");
  span21.setAttribute("src", "music.gif");
  span21.setAttribute("class", "musicGif");

  let span22 = document.createElement("span");
  span22.setAttribute("class", "songDur");

  let i = document.createElement("i");
  i.setAttribute("class", "songItemPlay fa-solid fa-circle-play");

  span2.appendChild(span21);
  span2.appendChild(span22);
  span2.appendChild(i);
  div.appendChild(img);
  div.appendChild(span1);
  div.appendChild(span2);
  return document.querySelector(".songList").appendChild(div);
}

function songItemPlayCls() {
  return document.querySelector(`.songItem:nth-child(${songIndex + 1})`); //.querySelector(".songItemPlay").classList;
}

//to convert seconds in minutes
function time(duration) {
  const mins = ~~(duration / 60);
  const secs = ~~duration % 60;

  let ret = "";

  ret += (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  return ret;
}

//to get the durations of the songs
function getDuration(src, func) {
  let audio = new Audio();
  audio.onloadedmetadata = function () {
    func(audio.duration);
  };
  audio.src = src;
}

// fills the song item bar with song infomation
function songItemFunc() {
  songItem.forEach((e, i) => {
    e.querySelector("img").src = songs[i].coverPath;
    e.querySelector(".songName").innerText = songs[i].songName;

    getDuration(songs[i].filePath, function (length) {
      e.querySelector(".songDur").innerText = time(length);
    });
    curSongName.innerText = songs[0].songName;
  });
}

// makes all the song item's pause buttons to play
function showAllPlays() {
  songItemPlay.forEach((e) => {
    e.classList.replace("fa-circle-pause", "fa-circle-play");
  });
  musicGif.forEach((e) => {
    e.style.opacity = 0;
  });
}

// plays the song and makes changes on the screen according to the song
function playTheSong() {
  showAllPlays();
  currentSong.src = songs[songIndex].filePath;
  curSongName.innerText = songs[songIndex].songName;
  playingGif.style.opacity = 1;
  currentSong.play();
  play.classList.replace("fa-circle-play", "fa-circle-pause");
  thumbImg.src = songs[songIndex].coverPath;
}

//when you click on the song item's play button
function songItemPlayFunc() {
  songItemPlay.forEach((e, i) => {
    e.onclick = (el) => {
      el.stopPropagation();

      if (e.classList.contains("fa-circle-play")) {
        oldSongIndex = songIndex;
        songIndex = i;

        if (oldSongIndex != songIndex) {
          playTheSong();
        }
        else {
          currentSong.play();
          playingGif.style.opacity = 1;
          play.classList.replace("fa-circle-play", "fa-circle-pause");
        }
        e.classList.replace("fa-circle-play", "fa-circle-pause");
        songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
      }
      else {
        e.classList.replace("fa-circle-pause", "fa-circle-play");
        play.classList.replace("fa-circle-pause", "fa-circle-play");
        playingGif.style.opacity = 0;
        songItemPlayCls().querySelector(".musicGif").style.opacity = 0;
        currentSong.pause();
      }
    };
  });
}

// when you click on song item
function songItemFunc2() {
  songItem.forEach((e, i) => {
    e.onclick = () => {
      songIndex = i;
      playTheSong();

      e.querySelector(".songItemPlay").classList.replace("fa-circle-play", "fa-circle-pause");
      songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
    };
  });
}

// when a song ends, next song starts playing automatically
function endedFunc() {
  currentSong.onended = () => {
    setTimeout(() => {
      if (songIndex >= +`${songs.length - 1}` && repeatOn) songIndex = 0;
      else songIndex += 1;
  
      if (shuffleOn === true) {
        songIndex = parseInt(Math.random()*(+`${songs.length - 1}`));
      }
  
      playingGif.style.opacity = 0;
      playTheSong();
  
      songItemPlayCls().querySelector(".songItemPlay").classList.replace("fa-circle-play", "fa-circle-pause");
      songItemPlayCls().querySelector(".musicGif").style.opacity = 1;
    }, 4000);
  };
}

// when you make any change in the song progress bar
function changeFunc() {
  songProgBar.onchange = () => {
    currentSong.currentTime = (songProgBar.value * currentSong.duration) / 1000;
  };
}

// changes song progress bar and time according to the song time
function timeUpdateFunc() {
  currentSong.ontimeupdate = () => {
    songProgBar.value = (parseFloat(currentSong.currentTime) / parseFloat(currentSong.duration)) *1000;

    // setInterval(() => {
      songTime.innerText = `${time(currentSong.currentTime)}/${time(currentSong.duration)}`;
    // }, 1000);
  };
}
