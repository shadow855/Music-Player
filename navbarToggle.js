// Toggle the display of navbar menu on menu icon click
document.querySelector('.menu-icon').addEventListener('click', function () {
  document.querySelectorAll('.nav_ul').forEach(function (element) {
    element.classList.toggle('show');
  });

  document.querySelectorAll('.nav_li').forEach(function (element) {
    element.classList.toggle('show');
  });
});
