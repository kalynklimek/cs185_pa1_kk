// OUTSIDE SOURCES:
// help with document.documentElement and scrollTop for different browsers: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// positioning for button on bottom left corner: https://www.w3schools.com/css/css_positioning.asp
// syntax of setting attributes for button: https://stackoverflow.com/questions/7707074/creating-dynamic-button-with-click-event-in-javascript

// first initialize variables
var navBarList;
var body;
var windowHeight;

initialize();

function initialize() {
  body = document.getElementById('body');
  navBarList = document.getElementById('nav_bar_list');

  console.log("in init");

  //console.log("window href: ", window.location.href);
  console.log("navBarList: ", navBarList);

  // call other functions
  makeScrollToTop();
  //getActivePage();
}

function makeScrollToTop() {
  windowHeight = window.screen.height;
  var quarterPage = windowHeight/4;
  var backToTopBtn = null;
  window.onscroll = function() {
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
        btn.setAttribute("onclick", "document.documentElement.scrollTop = 0;document.body.scrollTop = 0;");
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

function getActivePage() {
  var lis = navBarList.children;
  var numLis = lis.length;
  var navLinks = [];

  for (var i = 0; i < numLis; i++) {
    navLinks[i] = lis[i].children[0]; // make array of nav bar links
  }
  // console.log("lis: ", lis);
  // console.log("navLinks: ", navLinks);

  for (var i = 0; i < numLis; i++) {
    navLinks[i].addEventListener('click', function() {
      console.log("this: ", this);
      // var currentActive = document.getElementsByClassName("active_navpage");
      // console.log("currentActive: ", currentActive);
      // if (currentActive != null) { currentActive[0].className = ""; }
      //this.className = "active_navpage";

      this.style.text_decoration = "underline";
    })
  }
}
