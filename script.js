const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '54px';
      ring.style.height = '54px';
      ring.style.opacity = '0.3';
    });

    el.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.opacity = '0.6';
    });
  });
}

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

reveals.forEach((el) => {
  revealObserver.observe(el);
});

const statNums = document.querySelectorAll('.stat-num');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {

      const el = entry.target;
      const target = parseInt(el.dataset.target);

      let current = 0;

      const step = Math.ceil(target / 60);

      const timer = setInterval(() => {

        current += step;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        el.textContent = current.toLocaleString();

      }, 28);

      countObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.5
});

statNums.forEach((el) => {
  countObserver.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener('click', function(e) {

    e.preventDefault();

    const target = document.querySelector(
      this.getAttribute('href')
    );

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }

  });

});