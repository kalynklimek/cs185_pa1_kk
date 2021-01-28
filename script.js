// OUTSIDE SOURCES:
// help with document.documentElement and scrollTop for different browsers: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// positioning for button on bottom left corner: https://www.w3schools.com/css/css_positioning.asp
// syntax of setting attributes for button: https://stackoverflow.com/questions/7707074/creating-dynamic-button-with-click-event-in-javascript
// overlay help: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay_text
// max width and max height: https://stackoverflow.com/questions/3029422/how-do-i-auto-resize-an-image-to-fit-a-div-container
// preventDefault: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

// first initialize variables
var windowHeight;
var imageContainer;
var videoContainer;

initialize();

function initialize() {
  imageContainer = document.getElementById('images');
  videoContainer = document.getElementById('videos');
  windowHeight = window.innerHeight;

  // call other functions
  makeScrollToTop();
  imageOverlay();
  videoOverlay();
}

function makeScrollToTop() {
  var quarterPage = windowHeight/4;
  var backToTopBtn = null;
  window.onscroll = function() {
    // scrollTop reachability from different browsers
    var scroll = document.documentElement.scrollTop;
    var safariScroll = document.body.scrollTop;
    if (scroll > quarterPage || safariScroll > quarterPage) {
      backToTopBtn = document.getElementById('back-to-top-btn');

      // add scroll to top button if it doesn't exist
      if (backToTopBtn == null) {
        var btn = document.createElement("button");
        btn.setAttribute('id', 'back-to-top-btn');
        btn.setAttribute("style","position: fixed;bottom:0;left:0;margin:10px;");
        var btn_text = document.createTextNode("back to top");
        btn.appendChild(btn_text);
        document.body.appendChild(btn);
        btn.addEventListener('click', function() {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            this.style.display = "none";
        })
      }
      // make sure button is showing
      else {
        backToTopBtn.style.display = "block";
      }
    }
    else {
      // hide button if scroll is less than a quarter of page
      if (backToTopBtn != null) {
        backToTopBtn.style.display = "none";
      }
    }
  }
}

function imageOverlay() {
    if (imageContainer != null) {
      var images = imageContainer.children; // get all images on image page
      for (var i = 0; i < images.length; i++) {
        images[i].addEventListener('click', function() {
            var clickedImg = this; // get clicked image

            // make a copy of clicked image
            var img = document.createElement('img');
            img.src = clickedImg.src;

            // handle overlay open and close
            var overlayImage = document.getElementById("overlay-image");
            overlayImage.style.display = "block";

            var overlayDiv = document.getElementById("overlay-div");
            overlayDiv.addEventListener('click', function() {
                //remove image from overlay to get ready for next image overlay
                if (overlayImage.childElementCount == 2) {
                  overlayImage.removeChild(overlayImage.children[1]);
                }

                //hide div
                overlayImage.style.display = "none";
            });

            // set image css and add to overlay div, transform to get image centered
            img.setAttribute("style", "position:absolute;top:50%;left:50%;max-width:80%;max-height:80%;transform:translate(-50%,-50%);-ms-transform: translate(-50%,-50%);z-index:3");
            //img.setAttribute("style", "margin:auto;max-width:80%;max-height:80%;");
            overlayImage.appendChild(img);
        });
      }
    }
}

function videoOverlay() {
    if (videoContainer != null) {
      var videos = videoContainer.children; // get all videos on video page
      for (var i = 0; i < videos.length; i++) {
        videos[i].addEventListener('click', function(event) {
            event.preventDefault();
            var clickedSrc = this.children[0].src;

            // make a copy of clicked video
            var vid = document.createElement('video');
            vid.setAttribute("controls","controls")
            var newSrc = document.createElement('source');
            newSrc.src = clickedSrc;
            vid.appendChild(newSrc);

            // handle overlay div open and close
            var overlayVid = document.getElementById("overlay-video");
            overlayVid.style.display = "block";

            var overlayBg = document.getElementById("overlay-background");
            overlayBg.addEventListener('click', function() {
                //remove video from overlay to get ready for next video overlay
                if (overlayVid.childElementCount == 2) {
                  overlayVid.removeChild(overlayVid.children[1]);
                }

                //hide div
                overlayVid.style.display = "none";
            });

            // set video css and add to overlay div, transform to get video centered
            // help with centering image and video on overlay: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_overlay_text
            vid.setAttribute("style", "position:absolute;top:50%;left:50%;max-width:80%;max-height:80%;transform:translate(-50%,-50%);-ms-transform: translate(-50%,-50%);z-index:3");
            overlayVid.appendChild(vid);
        });
      }
    }
}
