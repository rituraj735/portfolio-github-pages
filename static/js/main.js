(() => {
  'use strict';

  function initScrollIndicator() {
    const indicator = document.getElementById('scrollIndicator');
    if (!indicator) return;

    const update = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = height > 0 ? (scrollTop / height) * 100 : 0;
      indicator.style.width = `${percent}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;

        let target;
        try {
          target = document.querySelector(href);
        } catch {
          return;
        }

        if (!target) return;
        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }

  function initRevealOnScroll() {
    const elements = document.querySelectorAll('.experience-item, .project-card, .skill-category');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 700ms ease, transform 700ms ease';
      observer.observe(element);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollIndicator();
    initSmoothScroll();
    initRevealOnScroll();
  });
})();

