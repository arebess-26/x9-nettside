// X9 — TUILs samfunnsplattform — felles script for alle sider

// Mobilmeny
(function(){
  var toggle = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  if(!toggle || !panel) return;

  toggle.addEventListener('click', function(){
    var open = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      panel.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Header går fra transparent til solid når hero-seksjonen er scrollet forbi
(function(){
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('[data-hero-sentinel]');
  if(!header || !hero){ if(header) header.classList.add('is-solid'); return; }

  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      header.classList.toggle('is-solid', !entry.isIntersecting);
    });
  }, { rootMargin: '-77px 0px 0px 0px', threshold: 0 });

  observer.observe(hero);
})();

// Enkel reveal-animasjon når elementer kommer inn i viewport
(function(){
  var items = document.querySelectorAll('.reveal');
  if(!items.length) return;

  if(!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function(el){ observer.observe(el); });
})();

document.querySelectorAll('[data-year]').forEach(function(el){
  el.textContent = new Date().getFullYear();
});

// Video-fasade — laster YouTube-iframen først når noen klikker/trykker Enter
(function(){
  document.querySelectorAll('.video-facade').forEach(function(el){
    function play(){
      if(el.classList.contains('is-playing')) return;
      var id = el.getAttribute('data-video-id');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = el.getAttribute('aria-label') || 'YouTube-video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      el.appendChild(iframe);
      el.classList.add('is-playing');
    }
    el.addEventListener('click', play);
    el.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        play();
      }
    });
  });
})();
