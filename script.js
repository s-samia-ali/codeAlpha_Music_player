// Playlist array - Aap yahan apne gane add kar sakte hain
const songsList = [
    {
        title: "All is well",
        artist: "Sonu Nigam, Swanand Kirkire, Shaan",
        src: "./media/Aal Izz Well – 3 Idiots Aamir Khan Madhavan Sharman J Sonu N Swanand K Shaan Shantanu M.mp3",
        img: "./media/all is well.jpg"
    },
    {
        title: "Hamne waheen lagaya dil",
        artist: "Badshah, Krish Mondal, Kishore Mondal, Ipsitaa",
        src: "./media/Humne Wahin Lagaya Dil Pati Patni Aur Woh Do 128 Kbps.mp3", 
        img: "./media/humne-wahin-lagaya-dil-pati-patni-aur-woh-do-500-500.jpg"
    },
    {
        title: "Give Me Some Sunshine",
        artist: "Sharman Joshi, Suraj Jagan",
        src: "./media/Aal Izz Well – 3 Idiots Aamir Khan Madhavan Sharman J Sonu N Swanand K Shaan Shantanu M.mp3", 
        img: "./media/all is well.jpg"
    },
    {
        title: "Dil Dhadakne Do",
        artist: "Priyanka Chopra, Farhan Akhtar",
        src: "./media/Humne Wahin Lagaya Dil Pati Patni Aur Woh Do 128 Kbps.mp3", 
        img: "./media/humne-wahin-lagaya-dil-pati-patni-aur-woh-do-500-500.jpg"
    }
];

let songIndex = 0;

let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon"); 
let volume = document.getElementById("volume");
let currentTimeDisplay = document.getElementById("current-time");
let durationDisplay = document.getElementById("duration");

// HTML text aur image badalne ke liye elements select karein
const songImg = document.querySelector(".song-img");
const songTitle = document.querySelector(".music-player h1");
const songArtist = document.querySelector(".music-player p");

// Gaana load karne ka function
function loadSong(index) {
    song.src = songsList[index].src;
    songTitle.innerText = songsList[index].title;
    songArtist.innerText = songsList[index].artist;
    songImg.src = songsList[index].img;
}

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationDisplay.innerText = formatTime(song.duration);
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
    currentTimeDisplay.innerText = formatTime(song.currentTime);
});

progress.oninput = function () {
    song.currentTime = progress.value;
}

volume.oninput = function() {
    song.volume = volume.value;
}

// Next Song Function
function nextSong() {
    songIndex = (songIndex + 1) % songsList.length;
    loadSong(songIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Previous Song Function
function prevSong() {
    songIndex = (songIndex - 1 + songsList.length) % songsList.length;
    loadSong(songIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Gaana khatam hone par automatic agla gaana chalana (Autoplay bonus)
song.addEventListener("ended", nextSong);

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

// Pehla gaana load karne ke liye initialization
loadSong(songIndex);

// 1. Left Angle (Back Button) ka function
function goBack() {
    alert("Going back to Music Library...");
    // Agar aap chaho to ise real page navigation bhi de sakte ho:
    // window.location.href = "home.html"; 
}

// 2. Bars Menu (Playlist Toggle) ka function
function togglePlaylist() {
    const panel = document.getElementById("playlist-panel");
    panel.classList.toggle("show");
    renderPlaylist(); // List ko refresh karne ke liye taaki active song sahi dikhe
}

// 3. Playlist items ko screen par show karne ka function
function renderPlaylist() {
    const playlistItems = document.getElementById("playlist-items");
    playlistItems.innerHTML = ""; // Purani list clear karein

    songsList.forEach((track, index) => {
        const li = document.createElement("li");
        li.innerText = `${track.title} - ${track.artist.split(',')[0]}`; // Chota naam dikhane ke liye
        
        // Agar yeh current chalne wala gaana hai to highlight karein
        if (index === songIndex) {
            li.classList.add("active-song");
        }

        // Agar list mein kisi gaane par click karein to woh chal jaye
        li.onclick = function() {
            songIndex = index;
            loadSong(songIndex);
            song.play();
            ctrlIcon.classList.remove("fa-play");
            ctrlIcon.classList.add("fa-pause");
            renderPlaylist(); // Active highlight update karein
        };

        playlistItems.appendChild(li);
    });
}

// Humare purane loadSong() function ke andar aakhir mein renderPlaylist() call kar dein
// Taaki jab gaana change ho (next/prev se), to list mein bhi active highlight change ho jaye
const originalLoadSong = loadSong;
loadSong = function(index) {
    originalLoadSong(index);
    renderPlaylist();
};