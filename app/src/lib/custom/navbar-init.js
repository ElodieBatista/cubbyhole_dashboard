// Collapse nav bar on click on a btn
function collapseNavbar() {
  if ($('.navbar-toggle').css('display') !== 'none') {
    $('nav').collapse('hide');
  }
}