function preloadImage(url) {
  var img = new Image();
  img.src = url;
  console.log("preloaded img: ", url);
}

function preloadVideo(url) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "blob";

  req.onload = function () {
    // Onload is triggered even on 404
    // so we need to check the status code
    if (this.status === 200) {
      var videoBlob = this.response;
      var vid = URL.createObjectURL(videoBlob); // IE10+
      // Video is now downloaded
      // and we can set it as source on the video element
      //   video.src = vid;
      console.log("preloaded vid: ", url);
    }
  };
  req.onerror = function () {
    // Error
  };

  req.send();
}

function preloadVideoWithRef(url, videoRef) {
  videoRef.current.src = url;
  videoRef.current.play().then((_) => {
    // If preloaded video URL was already cached, playback started
    //immediately.
    videoRef.current.pause();
  });
}

export default function preloadMedia(url, videoRef) {
  if (url.includes("mp4")) {
    const preloadVideo = document.getElementById("video_preload");
    console.log("preloadVideo", preloadVideo);

    preloadVideoWithRef(url, videoRef);
  } else {
    preloadImage(url);
  }
}
