(function($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing
  $('a.scroller-tigger[href*="#"]:not([href="#"])').click(function() {
     // Make sure this.hash has a value before overriding default behavior
     if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: ($(hash).offset().top - 60)
      }, 1000, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.scroller-tigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#the-nav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#the-nav").offset().top > 100) {
      $("#the-nav").addClass("navbar-shrink");
    } else {
      $("#the-nav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

function openChatContainer() {
  document.getElementById("chat-popup").style.display = "block";
  document.getElementById("chat-button").style.display = "none";
}

function closeChatContainer() {
  document.getElementById("chat-popup").style.display = "none";
  document.getElementById("chat-button").style.display = "block";
}