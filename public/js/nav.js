(function() {
  /*=====================*\
  ||   Mobile Collapse   ||
  \*=====================*/

  var toggle = document.querySelector('.mobile-nav-toggle');
  var nav = document.querySelector('.main-nav');

  toggle.addEventListener('click', function(e) {
    nav.classList.toggle('active');
  });

  /*=====================*\
  ||       Messages      ||
  \*=====================*/

  // Remove messages from the DOM when the X button is clicked.

  var buttons = document.querySelectorAll('.message-close');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const message = btn.parentNode;
      message.parentNode.removeChild(message);
    });
  });
})();
