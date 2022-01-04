/* eslint no-console:0*/
/* globals YT */

function isChrome() {
  return navigator.userAgent.indexOf('Chrome') > -1;
}

if (isChrome()) {
  document.querySelector('html').classList.add('chrome');
}

function isMobileDevice() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
}

function checkBandwidth() {
  if (!navigator.connection) {
    if (isMobileDevice()) return '3g';

    return '4g';
  }

  return navigator.connection.effectiveType;
}

function getQualityByBandwidth() {
  var bandwidth = checkBandwidth();

  if (bandwidth == '4g') {
    return '1080p';
  } else if (bandwidth == '3g') {
    return '480p';
  } else {
    return '240p';
  }
}

function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

const createMediaTimestamp = time => {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);

  return finalTime;
};
const initVideo = (video, videoIndex) => {
  let pauseTime = 0;

  const videoContainer = video.parentElement;
  const videoOverlay = videoContainer.querySelector('.if.overlay');
  const playButton = videoContainer.querySelector('.if.play.button');
  const controls = videoContainer.querySelector('.if.controls');
  const captionsControl = videoContainer.querySelector('.if.cc-control');
  const captionsButton = videoContainer.querySelector('.if.cc.button');
  const qualityControl = videoContainer.querySelector('.if.quality-control');
  const qualityButton = videoContainer.querySelector('.if.quality.button');
  const subtitlesControl = videoContainer.querySelector('.if.subtitles-control');
  const subtitlesButton = videoContainer.querySelector('.if.subtitles.button');
  const seekerRange = videoContainer.querySelector('.if.js-seeker-control');
  const volumeControl = videoContainer.querySelector('.if.volume-control');
  const volumeButton = videoContainer.querySelector('.if.volume.button');
  const volumeRange = videoContainer.querySelector('.if.js-volume-control');
  const seekerElapsed = videoContainer.querySelector('.if.js-seeker-time-elapsed');
  const seekerRemaining = videoContainer.querySelector('.if.js-seeker-time-remaining');
  const titleElement = videoOverlay.querySelector('.if.title');
  const title = `video-${videoIndex}-title`;

  titleElement.setAttribute('id', title);

  video.setAttribute('aria-labelledby', title);

  const createTranscript = caption => {
    const transcriptExpandableElement = videoContainer.parentElement.querySelector('.if.panel');

    if (!transcriptExpandableElement) return;

    const transcriptExpandableTitleElement = transcriptExpandableElement.querySelector('.if.title');
    const transcriptionExpandableContentElement = transcriptExpandableElement.querySelector('.if.title + .if.content');
    const transcriptionExpandableContentId = `video-${videoIndex}-transcription-content-title`;
    const transcriptExpandableTitleId = `video-${videoIndex}-transcription-expandable-title`;

    transcriptExpandableTitleElement.setAttribute('aria-controls', transcriptionExpandableContentId);
    transcriptExpandableTitleElement.setAttribute('tabindex', 0);
    transcriptExpandableTitleElement.setAttribute('aria-expanded', 'false');
    transcriptExpandableTitleElement.setAttribute('id', transcriptExpandableTitleId);

    transcriptionExpandableContentElement.setAttribute('aria-live', 'off');
    transcriptionExpandableContentElement.setAttribute('aria-atomic', true);
    transcriptionExpandableContentElement.setAttribute('role', 'region');
    transcriptionExpandableContentElement.setAttribute('aria-relevant', 'all');
    transcriptionExpandableContentElement.setAttribute('tabindex', 0);

    Array.prototype.slice.call(caption.cues).forEach(cue => {
      var pF = document.createDocumentFragment();
      var cueLine = document.createElement('span');
      var text = document.createTextNode(cue.text);

      cueLine.appendChild(text);
      cueLine.classList.add('if');
      cueLine.classList.add('transcript-line');
      pF.appendChild(cueLine);
      transcriptionExpandableContentElement.appendChild(pF);
    });

    video.setAttribute('aria-describedby', transcriptionExpandableContentId);
  };

  if (volumeControl) {
    volumeControl.addEventListener('mouseenter', e => {
      e.target.classList.add('is-active');
    });

    if (video.muted || video.muted == 'true') {
      volumeButton.classList.add('is-muted');
    } else {
      volumeButton.classList.remove('is-muted');
    }

    volumeButton.addEventListener('click', () => {
      if (video.muted || video.muted == 'true') {
        video.muted = false;
        volumeButton.classList.remove('is-muted');
      } else {
        video.muted = true;
        volumeButton.classList.add('is-muted');
      }
    });

    volumeRange.addEventListener('change', e => {
      video.volume = e.target.value / 100;

      if (e.target.value == 0) {
        video.muted = true;
        volumeButton.classList.add('is-muted');
      } else {
        video.muted = false;
        volumeButton.classList.remove('is-muted');
      }
    });

    volumeRange.addEventListener('input', e => {
      video.volume = e.target.value / 100;

      if (isChrome()) {
        volumeRange.style.backgroundImage =
          'linear-gradient(to right, #faf9f7 0%, #faf9f7 ' +
          e.target.value +
          '%, #6e625e ' +
          e.target.value +
          '%, #6e625e 100%)';
      }
    });
  }

  if (videoOverlay && volumeControl) {
    videoOverlay.addEventListener('mouseleave', () => {
      volumeControl.classList.remove('is-active');
    });
  }

  for (var i = 0; i < video.textTracks.length; i++) {
    video.textTracks[i].mode = 'hidden';
  }

  var qualitySources = video.querySelectorAll('source[data-source-type]');

  if (!qualitySources || qualitySources.length == 0) {
    if (qualityControl) {
      qualityControl.classList.add('hidden');
    }
  } else {
    if (!qualityControl) return;

    var qualityMenuButtons = [];
    var createQualityMenuItem = function (id, name, quality, label) {
      var listItem = document.createElement('li');

      listItem.classList.add('if');

      if (label === 'separator') {
        listItem.classList.add('separator');
      }

      if (label !== 'separator') {
        var button = listItem.appendChild(document.createElement('button'));

        button.setAttribute('id', `if-video-${videoIndex}-${id}`);
        button.className = 'if';

        if (quality.length > 0) button.setAttribute('quality', quality);

        button.setAttribute('data-state', 'inactive');

        if (id === 'quality-automatic') {
          button.setAttribute('data-state', 'active');
          button.classList.add('is-active');

          var autoQuality = getQualityByBandwidth();

          button.setAttribute('quality', autoQuality);
          button.value = autoQuality;
          button.appendChild(document.createTextNode(`${name} (${autoQuality})`));

          const source = video.querySelector(`source[quality="${autoQuality}"]`);

          if (source) {
            source.remove(); //Remove the source from select
            video.prepend(source); //Prepend source on top of options
            video.load();
            controls.querySelector('.js-video-quality').textContent = source.getAttribute('name');
          }
        } else {
          button.value = quality;
          button.appendChild(document.createTextNode(label));
        }

        button.addEventListener('click', function () {
          var autoQuality = getQualityByBandwidth();
          var source;

          // Set all buttons to inactive
          qualityMenuButtons.map(button => {
            button.setAttribute('data-state', 'inactive');
            button.classList.remove('is-active');
          });

          if (id === 'quality-automatic') {
            source = video.querySelector(`source[quality="${autoQuality}"]`);
            button.textContent = `${name} (${autoQuality})`;
            controls.querySelector('.js-video-quality').textContent = source.getAttribute('name');
          } else {
            source = video.querySelector(`source[quality="${quality}"]`);
            controls.querySelector('.js-video-quality').textContent = name;
          }

          pauseTime = video.currentTime; //Get Current Time of Video
          source.remove(); //Remove the source from select
          video.prepend(source); //Prepend source on top of options
          video.load(); //Reload Video
          video.play(); //Resume video
          video.currentTime = pauseTime; //Continue from video's stop

          button.setAttribute('data-state', 'active');
          button.classList.add('is-active');

          qualityMenuHolder.classList.toggle('is-open');
          qualityMenu.classList.toggle('is-open');
        });
        qualityMenuButtons.push(button);
      }

      return listItem;
    };
    var qualityMenu;
    var qualityMenuHolder;

    if (qualitySources.length && qualitySources.length > 1) {
      var df = document.createDocumentFragment();

      qualityMenuHolder = df.appendChild(document.createElement('div'));
      qualityMenuHolder.classList.add('if');
      qualityMenuHolder.classList.add('dropdown-menu');
      qualityMenuHolder.classList.add('bottom');
      qualityMenuHolder.classList.add('left');
      qualityMenu = qualityMenuHolder.appendChild(document.createElement('ul'));
      qualityMenu.className = 'if';

      qualitySources.forEach(source => {
        qualityMenu.appendChild(
          createQualityMenuItem(
            'quality-' + source.getAttribute('quality'),
            source.getAttribute('name'),
            source.getAttribute('quality'),
            source.getAttribute('label')
          )
        );
      });
      qualityMenu.appendChild(createQualityMenuItem('quality-separator', '', '', 'separator'));
      qualityMenu.appendChild(createQualityMenuItem('quality-automatic', 'Automatic', '', 'Automatic'));
      qualityControl.appendChild(qualityMenuHolder);

      qualityButton.addEventListener('click', () => {
        if (qualityMenuHolder) {
          qualityMenuHolder.classList.toggle('is-open');
          qualityMenu.classList.toggle('is-open');
        }
      });
    } else {
      controls.querySelector('.js-video-quality').textContent = qualitySources[0].getAttribute('name');
    }
  }

  const subtitlesTracks = Array.prototype.slice.call(video.textTracks).filter(track => track.kind == 'subtitles');
  const captionsTracks = Array.prototype.slice.call(video.textTracks).filter(track => track.kind == 'captions');

  if (captionsTracks && captionsTracks.length !== 0) {
    setTimeout(function () {
      createTranscript(captionsTracks[0]);
    }, 1000);
  }

  if (!subtitlesTracks || subtitlesTracks.length == 0) {
    if (subtitlesControl) {
      subtitlesControl.classList.add('hidden');
    }
  } else {
    if (!subtitlesControl) return;

    var subtitleMenuButtons = [];
    var createMenuItem = function (id, lang, label) {
      var listItem = document.createElement('li');

      listItem.classList.add('if');

      if (label === 'separator') {
        listItem.classList.add('separator');
      }

      if (label !== 'separator') {
        var button = listItem.appendChild(document.createElement('button'));

        button.setAttribute('id', `if-video-${videoIndex}-${id}`);
        button.className = 'if';

        if (lang.length > 0) button.setAttribute('lang', lang);

        button.value = label;
        button.setAttribute('data-state', 'inactive');
        button.appendChild(document.createTextNode(label));
        button.addEventListener('click', function () {
          // Set all buttons to inactive
          subtitleMenuButtons.map(button => {
            button.setAttribute('data-state', 'inactive');
            button.classList.remove('is-active');
          });

          // Find the language to activate
          var lang = this.getAttribute('lang');

          for (var i = 0; i < subtitlesTracks.length; i++) {
            // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
            if (subtitlesTracks[i].language == lang) {
              subtitlesTracks[i].mode = 'showing';
              this.setAttribute('data-state', 'active');
              button.classList.add('is-active');
            } else {
              subtitlesTracks[i].mode = 'hidden';
              button.classList.remove('is-active');
            }
          }
          subtitlesMenuHolder.classList.toggle('is-open');
          subtitlesMenu.classList.toggle('is-open');
        });
        subtitleMenuButtons.push(button);
      }

      return listItem;
    };
    var subtitlesMenu;
    var subtitlesMenuHolder;

    if (subtitlesTracks) {
      var subtitlesMenuHolderDF = document.createDocumentFragment();

      subtitlesMenuHolder = subtitlesMenuHolderDF.appendChild(document.createElement('div'));
      subtitlesMenuHolder.classList.add('if');
      subtitlesMenuHolder.classList.add('dropdown-menu');
      subtitlesMenuHolder.classList.add('bottom');
      subtitlesMenuHolder.classList.add('right');
      subtitlesMenu = subtitlesMenuHolder.appendChild(document.createElement('ul'));
      subtitlesMenu.className = 'if';
      subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
      subtitlesMenu.appendChild(createMenuItem('subtitles-separator', '', 'separator'));
      for (var o = 0; o < subtitlesTracks.length; o++) {
        subtitlesMenu.appendChild(
          createMenuItem(
            'subtitles-' + subtitlesTracks[o].language,
            subtitlesTracks[o].language,
            subtitlesTracks[o].label
          )
        );
      }
      subtitlesControl.appendChild(subtitlesMenuHolder);
    }

    subtitlesButton.addEventListener('click', () => {
      if (subtitlesMenuHolder) {
        subtitlesMenuHolder.classList.toggle('is-open');
        subtitlesMenu.classList.toggle('is-open');
      }
    });
  }

  if (!captionsTracks || captionsTracks.length == 0) {
    if (captionsControl) {
      captionsControl.classList.add('hidden');
    }
  } else {
    if (!captionsControl) return;

    var captionMenuButtons = [];
    var createCaptionsMenuItem = function (id, lang, label) {
      var listItem = document.createElement('li');

      listItem.classList.add('if');

      if (label === 'separator') {
        listItem.classList.add('separator');
      }

      if (label !== 'separator') {
        var button = listItem.appendChild(document.createElement('button'));

        button.setAttribute('id', `if-video-${videoIndex}-${id}`);
        button.className = 'if';

        if (lang.length > 0) button.setAttribute('lang', lang);

        button.value = label;
        button.setAttribute('data-state', 'inactive');
        button.appendChild(document.createTextNode(label));
        button.addEventListener('click', function () {
          // Set all buttons to inactive
          captionMenuButtons.map(button => {
            button.setAttribute('data-state', 'inactive');
            button.classList.remove('is-active');
          });

          // Find the language to activate
          var lang = this.getAttribute('lang');

          for (var i = 0; i < captionsTracks.length; i++) {
            // For the 'captions-off' button, the first condition will never match so all will captions be turned off
            if (captionsTracks[i].language == lang) {
              captionsTracks[i].mode = 'showing';
              this.setAttribute('data-state', 'active');
              button.classList.add('is-active');
            } else {
              captionsTracks[i].mode = 'hidden';
              button.classList.remove('is-active');
            }
          }
          captionsMenuHolder.classList.toggle('is-open');
          captionsMenu.classList.toggle('is-open');
        });
        captionMenuButtons.push(button);
      }

      return listItem;
    };
    var captionsMenu;
    var captionsMenuHolder;

    if (captionsTracks && captionsControl) {
      var captionsMenuHolderDF = document.createDocumentFragment();

      captionsMenuHolder = captionsMenuHolderDF.appendChild(document.createElement('div'));
      captionsMenuHolder.classList.add('if');
      captionsMenuHolder.classList.add('dropdown-menu');
      captionsMenuHolder.classList.add('bottom');
      captionsMenuHolder.classList.add('right');
      captionsMenu = captionsMenuHolder.appendChild(document.createElement('ul'));
      captionsMenu.className = 'if';
      captionsMenu.appendChild(createCaptionsMenuItem('captions-off', '', 'Off'));
      captionsMenu.appendChild(createCaptionsMenuItem('captions-separator', '', 'separator'));
      for (var u = 0; u < captionsTracks.length; u++) {
        captionsMenu.appendChild(
          createCaptionsMenuItem(
            'captions-' + captionsTracks[u].language,
            captionsTracks[u].language,
            captionsTracks[u].label
          )
        );
      }
      captionsControl.appendChild(captionsMenuHolder);
    }

    captionsButton.addEventListener('click', () => {
      if (captionsMenuHolder) {
        captionsMenuHolder.classList.toggle('is-open');
        captionsMenu.classList.toggle('is-open');
      }
    });
  }

  if (seekerRange) {
    video.addEventListener('timeupdate', () => {
      if (video.currentTime != 0 && !isNaN(video.duration)) {
        seekerRange.value = (video.currentTime / video.duration) * seekerRange.max;
        seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
        seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
      }
    });

    seekerRange.addEventListener('click', function (e) {
      const clickedValue = (e.offsetX * this.max) / this.offsetWidth;

      video.currentTime = (video.duration * clickedValue) / seekerRange.max;
      seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
      seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
    });
  }

  const videoWorks = !!document.createElement('video').canPlayType;

  if (videoWorks) {
    video.controls = false;
  }

  // togglePlay toggles the playback state of the video.
  // If the video playback is paused or ended, the video is played
  // otherwise, the video is paused
  function ifVideoTogglePlay(e) {
    if (e) {
      e.stopPropagation();
    }

    console.log('ifVideoTogglePlay');

    if (video.paused || video.ended) {
      var isPlaying =
        video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;

      if (!isPlaying) {
        video.play();
      }

      videoContainer.classList.add('is-active');
      videoContainer.classList.remove('is-paused');
    } else {
      video.pause();
      videoContainer.classList.remove('is-active');
      videoContainer.classList.add('is-paused');
    }
  }

  // updatePlayButton updates the playback icon and tooltip
  // depending on the playback state
  function onPause() {
    pauseTime = video.currentTime;

    if (seekerRange) {
      if (video.currentTime != 0 && !isNaN(video.duration)) {
        seekerRange.value = (video.currentTime / video.duration) * seekerRange.max;
        seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
        seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
      }
    }

    video.load();
  }
  function onPlay() {
    video.currentTime = pauseTime;

    if (seekerRange) {
      if (video.currentTime != 0 && !isNaN(video.duration)) {
        seekerRange.value = (video.currentTime / video.duration) * seekerRange.max;
        seekerElapsed.textContent = createMediaTimestamp(parseInt(video.currentTime));
        seekerRemaining.textContent = `-${createMediaTimestamp(parseInt(video.duration - video.currentTime))}`;
      }
    }

    var isPlaying =
      video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;

    if (!isPlaying) {
      video.play();
    }
  }

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    } else {
      video.requestFullscreen();
    }
  }

  let timer = 0;

  // Add eventlisteners here
  playButton.addEventListener('click', ifVideoTogglePlay);
  video.addEventListener('click', ifVideoTogglePlay);
  videoOverlay.addEventListener('click', ifVideoTogglePlay);
  video.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      ifVideoTogglePlay();
    }
  });
  videoOverlay.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      ifVideoTogglePlay();
    }
  });
  video.addEventListener('play', onPlay);
  video.addEventListener('pause', onPause);
  video.addEventListener('click', () => {
    if (event.detail === 1) {
      timer = setTimeout(() => {
        ifVideoTogglePlay();
      }, 200);
    }
  });
  video.addEventListener('dblclick', () => {
    clearTimeout(timer);
    toggleFullScreen();
  });
  // video.addEventListener('mouseenter', showControls);
  // video.addEventListener('mouseleave', hideControls);
};

// YouTube

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = '//www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const youtubeVideos = document.querySelectorAll('.if.yt-player');

let players = [];

window.onPlayerReady = function (event, player_id) {
  const video = event.target;
  const videoContainer = document.getElementById(player_id).parentElement;
  const videoOverlay = videoContainer.querySelector('.overlay');
  const playButton = videoContainer.querySelector('.button');

  function togglePlay() {
    if (videoContainer.classList.contains('is-active')) {
      video.pauseVideo();
    } else {
      video.playVideo();
    }
  }
  playButton.addEventListener('click', togglePlay);
};

window.onYouTubeIframeAPIReady = function () {
  players = [];

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;

  function onPlayerStateChange(event, player_id) {
    if (event.data == YT.PlayerState.PLAYING) {
      playVideo(event, player_id);
    }

    if (event.data == YT.PlayerState.PAUSED) {
      pauseVideo(event, player_id);
    }

    if (event.data == YT.PlayerState.ENDED && !done) {
      stopVideo(event, player_id);
      done = true;
    }
  }
  function playVideo(event, player_id) {
    const videoContainer = document.getElementById(player_id).parentElement;

    videoContainer.classList.add('is-active');
    videoContainer.classList.remove('is-paused');
  }
  function pauseVideo(event, player_id) {
    const videoContainer = document.getElementById(player_id).parentElement;

    videoContainer.classList.remove('is-active');
    videoContainer.classList.add('is-paused');
  }
  function stopVideo(event, player_id) {
    const video = event.target;
    const videoContainer = document.getElementById(player_id).parentElement;

    video.stopVideo();
    videoContainer.classList.remove('is-active');
    videoContainer.classList.remove('is-paused');
  }

  youtubeVideos.forEach(player => {
    players.push(
      new YT.Player(player.id, {
        videoId: '-5V0RWaERSU',
        playerVars: {
          controls: 0,
          showinfo: 0,
          ecver: 2,
          rel: 0,
          iv_load_policy: 3,
          autoplay: 0,
          loop: 0
        },
        events: {
          onReady: e => {
            window.onPlayerReady(e, player.id);
          },
          onStateChange: e => {
            onPlayerStateChange(e, player.id);
          }
        }
      })
    );
  });
};

module.exports = function () {
  const videoObserver = new IntersectionObserver((entries, videoObserver) => {
    entries.forEach((entry, entryIndex) => {
      if (entry.intersectionRatio > 0) {
        const video = entry.target;

        videoObserver.unobserve(entry.target);

        initVideo(video, entryIndex);
      }
    });
  });

  document.querySelectorAll('video.if.player').forEach(video => {
    videoObserver.unobserve(video);
    videoObserver.observe(video);
  });
};
