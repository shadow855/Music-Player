// JavaScript



document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audio-player');
  const playlistDiv = document.getElementById('playlist');
  const playButton = document.getElementById('play-btn');
  const playPauseImg = document.getElementById('play-pause-img');
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  const shuffleButton = document.getElementById('shuffle-btn');
  const repeatButton = document.getElementById('repeat-btn');
  const seekBar = document.getElementById('seek-bar');

  const songs = ['Besharam Rang.mpeg', 'Frames.mpeg', 'Jhoome Jo Pathaan.mpeg', 'Moment of Truth.mpeg', 'Maan Meri Jaan.mpeg', 'Shinunoga e-wa.mpeg', 'Wow.mpeg']; // Add the filenames of your songs here

  let currentIndex = 0;
  let isPlaying = false;
  let isShuffled = false;
  let isRepeated = false;

  // Create playlist
  songs.forEach(function (song, index) {
    const songItem = document.createElement('div');
    songItem.style.margin = '15px';
    songItem.style.padding = '10px';
    songItem.style.padding = '10px';
    songItem.style.color = 'white';
    songItem.style.borderRadius = '20px';
    songItem.style.backgroundColor = 'rgba(41, 39, 39, 0.6)';
    songItem.addEventListener('mouseover', function () {
      songItem.style.backgroundColor = 'black';
    });
    songItem.addEventListener('mouseout', function () {
      songItem.style.backgroundColor = 'rgba(41, 39, 39, 0.6)'; // Reset to default background color
    });
    songItem.textContent = song;
    songItem.classList.add('playlist-item');
    songItem.addEventListener('click', function () {
      playSong(index);
      // songItem.style.color = 'blue';
    });
    playlistDiv.appendChild(songItem);
  });

  // Play selected song
  function playSong(index) {

    // Remove highlight from previously playing song
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(function (item) {
      item.classList.remove('playing');
      item.style.color='white';
    });

    // Add highlight to currently playing song
    const currentSongItem = document.querySelector(`.playlist-item:nth-child(${index + 1})`);
    currentSongItem.classList.add('playing');
    currentSongItem.style.color='violet';
    audioPlayer.src = songs[index];
    audioPlayer.play();
    currentIndex = index;
    isPlaying = true;
    updatePlayButton();
  }

  // Play button click event
  playButton.addEventListener('click', function () {
    if (!isPlaying) {
      audioPlayer.play();
      isPlaying = true;
    } else {
      audioPlayer.pause();
      isPlaying = false;
    }
    updatePlayButton();
  });

  // Previous button click event
  prevButton.addEventListener('click', function () {
    if (currentIndex === 0) {
      playSong(songs.length - 1);
    } else {
      playSong(currentIndex - 1);
    }
  });

  // Next button click event
  nextButton.addEventListener('click', function () {
    if (currentIndex === songs.length - 1) {
      playSong(0);
    } else {
      playSong(currentIndex + 1);
    }
  });

  // Shuffle button click event
  shuffleButton.addEventListener('click', function () {
    isShuffled = !isShuffled;
    shuffleButton.classList.toggle('active', isShuffled);
  });

  // Repeat button click event
  repeatButton.addEventListener('click', function () {
    isRepeated = !isRepeated;
    repeatButton.classList.toggle('active', isRepeated);
  });

  // Event when the song ends
  audioPlayer.addEventListener('ended', function () {
    if (isRepeated) {
      playSong(currentIndex);
    } else {
      nextSong();
    }
  });

  // Event when the seek bar value changes
  seekBar.addEventListener('input', function () {
    const seekTime = audioPlayer.duration * (seekBar.value / 100);
    audioPlayer.currentTime = seekTime;
  });

  // Event when the song's time updates
  audioPlayer.addEventListener('timeupdate', function () {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const seekBarValue = (currentTime / duration) * 100;
    seekBar.value = seekBarValue;
  });

  // Update the play/pause button based on playback state
  function updatePlayButton() {
    if (isPlaying) {
      playPauseImg.src = 'Images/icons8-pause-100.png';
    } else {
      playPauseImg.src = 'Images/icons8-play-100.png';
    }
  }

  // Play the next song
  function nextSong() {
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSong(randomIndex);
    } else {
      currentIndex = (currentIndex + 1) % songs.length;
      playSong(currentIndex);
    }
  }
});
