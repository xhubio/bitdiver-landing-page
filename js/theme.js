/* Theme Toggle — BitDiver */
(function () {
  var saved = localStorage.getItem('bitdiver-theme');
  if (saved) document.body.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  var current = document.body.getAttribute('data-theme');
  var next = current === 'tactical' ? 'swiss' : 'tactical';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('bitdiver-theme', next);
}
