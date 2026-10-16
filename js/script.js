// ===================== NAVBAR SCROLL STATE =====================
const nav = document.getElementById('nav');
function updateNavState(){
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}
updateNavState();
window.addEventListener('scroll', updateNavState, { passive: true });

// ===================== MOBILE MENU =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu(){
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));

// ===================== BACK TO TOP =====================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 480);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================== FAQ ACCORDION =====================
document.querySelectorAll('.accordion-item').forEach(item => {
  const trigger = item.querySelector('.accordion-trigger');
  const panel = item.querySelector('.accordion-panel');

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // close all others
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      if (openItem !== item){
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-panel').style.maxHeight = null;
      }
    });

    item.classList.toggle('open', !isOpen);
    panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
  });
});

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ===================== HERO TERMINAL TYPING EFFECT =====================
const terminalLines = [
  '$ ssh user@server',
  '$ docker build .',
  '$ git push origin main',
  '$ terraform apply',
  '$ kubectl get pods'
];

const terminalBody = document.getElementById('terminalBody');

function typeTerminal(){
  if (!terminalBody) return;
  terminalBody.innerHTML = '';
  let lineIndex = 0;

  function typeLine(){
    if (lineIndex >= terminalLines.length){
      setTimeout(typeTerminal, 2200); // restart loop after a pause
      return;
    }

    const lineEl = document.createElement('span');
    lineEl.className = 'line';
    terminalBody.appendChild(lineEl);

    const fullText = terminalLines[lineIndex];
    let charIndex = 0;

    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    function typeChar(){
      if (charIndex <= fullText.length){
        lineEl.textContent = fullText.slice(0, charIndex);
        lineEl.appendChild(cursor);
        charIndex++;
        setTimeout(typeChar, 32);
      } else {
        cursor.remove();
        lineIndex++;
        setTimeout(typeLine, 380);
      }
    }
    typeChar();
  }

  typeLine();
}

typeTerminal();

// ===================== SMOOTH ANCHOR OFFSET (fixed nav) =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
