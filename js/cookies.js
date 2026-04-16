/* Cookie Consent — BitDiver */
function loadGA() {
  if (document.getElementById('ga-script')) return;
  var s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-RW692TPH98';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-RW692TPH98', { anonymize_ip: true });
}

function removeGA() {
  var s = document.getElementById('ga-script');
  if (s) s.remove();
  window['ga-disable-G-RW692TPH98'] = true;
  document.cookie = '_ga=;expires=Thu, 01 Jan 1970;path=/;domain=.' + location.hostname;
  document.cookie = '_ga_RW692TPH98=;expires=Thu, 01 Jan 1970;path=/;domain=.' + location.hostname;
}

function acceptAllCookies() {
  localStorage.setItem('bitdiver-cookies', JSON.stringify({ analytics: true }));
  document.getElementById('cookie-banner').style.display = 'none';
  loadGA();
}

function declineAllCookies() {
  localStorage.setItem('bitdiver-cookies', JSON.stringify({ analytics: false }));
  document.getElementById('cookie-banner').style.display = 'none';
  removeGA();
}

function savePreferences() {
  var a = document.getElementById('cookie-analytics').checked;
  localStorage.setItem('bitdiver-cookies', JSON.stringify({ analytics: a }));
  document.getElementById('cookie-banner').style.display = 'none';
  if (a) { loadGA(); } else { removeGA(); }
}

function resetCookieConsent() {
  var wasAnalytics = true;
  try {
    var prev = JSON.parse(localStorage.getItem('bitdiver-cookies'));
    if (prev) wasAnalytics = prev.analytics !== false;
  } catch (e) {}
  localStorage.removeItem('bitdiver-cookies');
  document.getElementById('cookie-banner').style.display = 'flex';
  var cb = document.getElementById('cookie-analytics');
  if (cb) cb.checked = wasAnalytics;
}

(function () {
  try {
    var raw = localStorage.getItem('bitdiver-cookies');
    if (!raw) {
      document.getElementById('cookie-banner').style.display = 'flex';
      return;
    }
    var c = JSON.parse(raw);
    if (c.analytics) { loadGA(); }
    if (raw === '"accepted"' || raw === 'accepted') {
      localStorage.setItem('bitdiver-cookies', JSON.stringify({ analytics: true }));
      loadGA();
    }
  } catch (e) {
    document.getElementById('cookie-banner').style.display = 'flex';
  }
})();
