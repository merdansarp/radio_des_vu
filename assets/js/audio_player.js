let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
    {
        name: "Les Essays 2023ii",
        image: "./assets/img/bowie-cigarette.jpeg",
        path: "https://lh3.google.com/uc?export=download&id=18U8ilkkfmAIbrVddm6QVa1DYh-7kFT6m"
    },
    {
        name: "Les Essays 2023i",
        image: "./assets/img/polachek.jpg",
        path: "https://docs.google.com/uc?export=download&id=1_plfkU72VAWS8BIt7h2fraQBfbTO-I4F"
    },
    {
        name: "Les Essays 11",
        image: "./assets/img/11_raining.jpg",
        path: "https://docs.google.com/uc?export=download&id=1NEWm0p-WlRS3vr1AJuKgNgpn3mAPvLlb"
    },
    {
        name: "Les Essays 9",
        image: "./assets/img/halo_on_fire.jpeg",
        path: "https://docs.google.com/uc?export=download&id=11HXX1HHmGfJt3je113hMEYAZZsMaUShi"
    },
    {
        name: "Les Essays 8",
        image: "./assets/img/viii.jpeg",
        path: "https://docs.google.com/uc?export=download&id=1Zb7IkkW1E8cVdCAwKZn2ilE8NfpAVPHi"
    },
    {
        name: "Les Essays 7",
        image: "./assets/img/thom_yorke_using_old_computer.jpg",
        path: "https://docs.google.com/uc?export=download&id=1E2li4lznlfm6Es3GwDh53FOP3OPgCgHg"
    },
    {
        name: "Les Essays 6",
        image: "./assets/img/joan_cornella_let_yourself_down.jpeg",
        path: "https://docs.google.com/uc?export=download&id=1KqWhPs_JscPLoFRvvGVmOrVjgNGZAawv"
    },
    {
        name: "Les Essays 5",
        image: "./assets/img/cyberpunkshow.png",
        path: "https://docs.google.com/uc?export=download&id=1kfScdp4uNal46tIWnIILY-8XcemWhsMh"
    },
    {
        name: "Les Essays 4",
        image: "./assets/img/bowie_using_computer.jpg",
        path: "https://docs.google.com/uc?export=download&id=1j5n-cDHy1Lby1CUl9CdYZbqMJsMKX2V4"
    },
    {
        name: "Les Essays 3",
        image: "./assets/img/fionaapplearmor.jpg",
        path: "https://docs.google.com/uc?export=download&id=1F2YEAjtwJ2RvWog8TxeQtk5OTptj9rer"
    },
    {
        name: "Önsöz | Les Essays",
        image: "./assets/img/Wopt_esra_gulmen.jpg",
        path: "https://docs.google.com/uc?export=download&id=1RFBf_YAJS1nXr1U6YmVVRYd1BAHHxtnz"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    now_playing.textContent = "Kayıt: " + (track_index + 1) + "/" + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
