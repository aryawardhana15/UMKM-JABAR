// Animasi Interaktif JabarUMKM Hub
// GSAP, Vanilla Tilt, Typed.js, ScrollTrigger, dan fallback motion

document.addEventListener('DOMContentLoaded', function() {
  // GSAP Section Reveal
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      opacity: 0, y: 60, duration: 1, scrollTrigger: { trigger: section, start: 'top 80%' }
    });
  });

  // GSAP Card Stagger
  gsap.from('.product-card-enhanced', {
    opacity: 0, scale: 0.8, y: 40, stagger: 0.15, duration: 0.8,
    scrollTrigger: { trigger: '.product-card-enhanced', start: 'top 85%' }
  });

  // GSAP Testimonial Stagger
  gsap.from('.testimonial-card', {
    opacity: 0, scale: 0.9, y: 30, stagger: 0.18, duration: 0.7,
    scrollTrigger: { trigger: '.testimonial-card', start: 'top 90%' }
  });

  // GSAP Navbar shrink
  gsap.to('#navbar', {
    height: '56px', background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    scrollTrigger: { trigger: '#navbar', start: 'top top', end: 99999, toggleClass: { className: 'navbar-shrink', targets: '#navbar' }, scrub: true }
  });

  // GSAP Hero Stagger
  gsap.from('.hero-stagger', { opacity: 0, y: 40, stagger: 0.18, duration: 0.7, delay: 0.2 });

  // GSAP Modal Spring
  document.querySelectorAll('.modal-spring').forEach(modal => {
    gsap.from(modal, { scale: 0.7, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
  });

  // GSAP Chatbot Modal
  if(document.getElementById('chatbot-modal')) {
    gsap.from('#chatbot-modal', { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)', paused: true });
  }

  // GSAP Map Region Hover
  document.querySelectorAll('.map-region').forEach(region => {
    region.addEventListener('mouseenter', () => gsap.to(region, { scale: 1.08, duration: 0.3 }));
    region.addEventListener('mouseleave', () => gsap.to(region, { scale: 1, duration: 0.3 }));
  });

  // Vanilla Tilt untuk card interaktif
  if(window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), { max: 12, speed: 400, glare: true, 'max-glare': 0.15 });
  }

  // Typed.js untuk hero kata kunci
  if(window.Typed) {
    new Typed('#hero-typed', { strings: ['Cita Rasa', 'Inovasi', 'Kreativitas'], typeSpeed: 60, backSpeed: 40, loop: true });
  }

  // Fallback prefers-reduced-motion
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
  }

  // Scroll to top button
  const scrollBtn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
      scrollBtn.classList.remove('opacity-0','pointer-events-none');
      scrollBtn.classList.add('opacity-100');
    } else {
      scrollBtn.classList.add('opacity-0','pointer-events-none');
      scrollBtn.classList.remove('opacity-100');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Testimoni carousel (swipe/arrow)
  const carousel = document.getElementById('testimonial-carousel');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if(carousel && prevBtn && nextBtn) {
    let scrollAmount = 0;
    nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: 350, behavior: 'smooth' }); });
    prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -350, behavior: 'smooth' }); });
  }

  // Swipe di mobile
  let startX = 0;
  if(carousel) {
    carousel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    carousel.addEventListener('touchend', e => {
      let endX = e.changedTouches[0].clientX;
      if(endX < startX - 40) carousel.scrollBy({ left: 350, behavior: 'smooth' });
      if(endX > startX + 40) carousel.scrollBy({ left: -350, behavior: 'smooth' });
    });
  }

  // GSAP/AOS staggered reveal
  if(window.gsap) {
    gsap.utils.toArray('.section').forEach(section => {
      gsap.from(section, { opacity: 0, y: 60, duration: 1, scrollTrigger: { trigger: section, start: 'top 80%' } });
    });
    gsap.from('.testimonial-card', { opacity: 0, y: 40, stagger: 0.18, duration: 0.7, scrollTrigger: { trigger: '.testimonial-card', start: 'top 90%' } });
  }

  // 1. Parallax mouse move di hero
  const parallaxLayer = document.querySelector('.parallax-hero-layer');
  document.addEventListener('mousemove', e => {
    if(!parallaxLayer) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    parallaxLayer.style.transform = `translate(${x}px,${y}px)`;
  });

  // 2. GSAP text reveal di .gsap-reveal
  if(window.gsap) {
    gsap.utils.toArray('.gsap-reveal').forEach((el,i) => {
      gsap.fromTo(el, {clipPath:'inset(0 100% 0 0)'}, {clipPath:'inset(0 0% 0 0)', duration:1, delay:0.2+i*0.2, ease:'power2.out'});
    });
  }

  // 3. Confetti burst saat tombol utama diklik
  const confettiBtn = document.getElementById('hero-explore-btn');
  const confettiCanvas = document.getElementById('confetti-canvas');
  if(confettiBtn && confettiCanvas && window.confetti) {
    confettiBtn.addEventListener('click', e => {
      confettiCanvas.style.display = 'block';
      confetti.create(confettiCanvas, {resize:true, useWorker:true})({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        scalar: 1.1
      });
      setTimeout(()=>{confettiCanvas.style.display='none';}, 1200);
    });
  }

  // 4. Shine effect di produk card
  const cards = document.querySelectorAll('.product-card-enhanced');
  cards.forEach(card => {
    const shine = card.querySelector('.shine');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      shine.style.background = `linear-gradient(120deg,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0.1) 80%)`;
      shine.style.opacity = 1;
      shine.style.transform = `translate(${x/10}px,${y/10}px)`;
    });
    card.addEventListener('mouseleave', () => { shine.style.opacity = 0; });
  });

  // 5. Ripple effect di semua .btn-enhanced
  function createRipple(e) {
    const btn = e.currentTarget;
    const ripple = btn.querySelector('.ripple');
    if(!ripple) return;
    ripple.classList.remove('show');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size+'px';
    ripple.style.left = (e.clientX-rect.left-size/2)+'px';
    ripple.style.top = (e.clientY-rect.top-size/2)+'px';
    ripple.classList.add('show');
    setTimeout(()=>ripple.classList.remove('show'), 500);
  }
  document.querySelectorAll('.btn-enhanced').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // 6. Bubble tips interaktif
  const tips = [
    'Konsistensi kualitas adalah kunci!',
    'Gunakan media sosial untuk promosi gratis.',
    'Jaga hubungan baik dengan pelanggan.',
    'Inovasi produk secara berkala.',
    'Manfaatkan marketplace digital.',
    'Foto produk yang menarik meningkatkan penjualan.'
  ];
  const bubble = document.getElementById('bubble-tips');
  const bubbleText = document.getElementById('bubble-tips-text');
  function showBubble() {
    if(!bubble) return;
    bubble.style.display = 'flex';
    setTimeout(()=>{ bubble.style.display = 'none'; }, 8000);
  }
  function randomTip() {
    if(!bubbleText) return;
    bubbleText.textContent = 'Tips UMKM: ' + tips[Math.floor(Math.random()*tips.length)];
  }
  if(bubble) {
    setInterval(showBubble, 20000);
    bubble.addEventListener('click', () => { randomTip(); showBubble(); });
  }

  // Map fallback jika gagal load
  const mapFallback = document.getElementById('map-fallback');
  if (window.MapFunctions && window.MapFunctions.initMap) {
    try {
      window.MapFunctions.initMap();
    } catch (e) {
      if(mapFallback) mapFallback.classList.remove('hidden');
    }
  }

  // Testimonial grid animasi masuk
  if(window.gsap) {
    gsap.utils.toArray('.glassmorphism.rounded-3xl.shadow-xl.p-8').forEach((el,i) => {
      gsap.from(el, {opacity:0, y:40, duration:0.8, delay:0.2+i*0.15, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 90%'}});
    });
    // Animasi tombol CTA
    const ctaBtn = document.querySelector('a.animate-scale-in');
    if(ctaBtn) {
      gsap.from(ctaBtn, {scale:0.7, opacity:0, duration:0.7, delay:0.2, ease:'back.out(1.7)', scrollTrigger:{trigger:ctaBtn, start:'top 95%'}});
    }
  }

  // Fallback: pastikan event klik pada map-region tetap aktif meski SVG inline
  function ensureMapRegionEvents() {
    const regions = document.querySelectorAll('#jabar-map .map-region');
    regions.forEach(region => {
      if (!region._hasClick) {
        region.addEventListener('click', function() {
          const regionId = region.getAttribute('data-region-id');
          if (regionId && window.openModal) window.openModal(regionId);
          else if (regionId && window.MapFunctions && window.MapFunctions.openModal) window.MapFunctions.openModal(regionId);
        });
        region._hasClick = true;
      }
    });
  }
  document.addEventListener('DOMContentLoaded', ensureMapRegionEvents);
  // Juga jalankan ulang setiap 2 detik (jaga-jaga SVG baru di-load)
  setInterval(ensureMapRegionEvents, 2000);

  // === TIMELINE PERJALANAN (TENTANG) - GSAP SUPER UPGRADE ===
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    const isRight = item.classList.contains('right-timeline');
    gsap.from(item, {
      x: isRight ? -120 : 120,
      y: 60,
      scale: 0.85,
      opacity: 0,
      boxShadow: '0 0 0px 0px rgba(249,199,79,0)',
      filter: 'blur(8px)',
      duration: 1.1,
      ease: 'power4.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      onStart: () => {
        item.style.zIndex = 10 + (timelineItems.length - i);
      }
    });
    // Hover effect: tilt, scale, shadow
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { scale: 1.04, boxShadow: '0 8px 32px 0px #F9C74F55', rotateY: isRight ? 6 : -6, duration: 0.35, filter: 'blur(0px)' });
    });
    item.addEventListener('mouseleave', () => {
      gsap.to(item, { scale: 1, boxShadow: '0 2px 12px 0px #A05A2C22', rotateY: 0, duration: 0.35 });
    });
  });

  // Parallax effect untuk garis timeline (desktop)
  const timelineLine = document.querySelector('.timeline-vertical-line');
  if (timelineLine && window.innerWidth >= 768) {
    gsap.fromTo(timelineLine, {
      scaleY: 0.2,
      opacity: 0.3
    }, {
      scaleY: 1,
      opacity: 1,
      transformOrigin: 'center top',
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });
  }

  // === NILAI-NILAI KAMI (VALUES) - GSAP RESPONSIVE, CLEAN, SCROLL EFFECT ===
  function initValuesGSAP() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      // Responsive: Desktop & Mobile
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        // DESKTOP: Masonry, Morph, Parallax, Clean
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach((card, i) => {
          // Scroll-linked morph, scale, shadow, icon bounce
          gsap.to(card, {
            y: i % 2 === 0 ? -40 : 40,
            scale: 1.06,
            borderRadius: '24% 76% 60% 40%/60% 30% 70% 40%',
            boxShadow: '0 16px 48px 0px #F9C74F55',
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.inOut',
            delay: 0.1 + i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 30%',
              scrub: true,
              onUpdate: self => {
                // Morph icon bounce/rotate mengikuti progress scroll
                const icon = card.querySelector('.icon-anim lottie-player');
                if(icon) {
                  icon.setSpeed(1.1 + self.progress * 2.2);
                  icon.setDirection(1);
                }
                // Morph border-radius progresif
                card.style.borderRadius = self.progress < 0.5 ?
                  '32px' :
                  '24% 76% 60% 40%/60% 30% 70% 40%';
              }
            }
          });
          // Parallax floating saat scroll
          gsap.to(card, {
            y: '+=32',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          });
          // Hover micro-interaction
          card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.12, rotateY: (i%2===0)?8:-8, borderRadius: '40% 60% 60% 40%/50% 60% 40% 50%', boxShadow: '0 24px 64px 0px #F9C74Fcc', duration: 0.35, ease: 'power2.out' });
            const icon = card.querySelector('.icon-anim lottie-player');
            if(icon) icon.setSpeed(3);
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1.06, rotateY: 0, borderRadius: '24% 76% 60% 40%/60% 30% 70% 40%', boxShadow: '0 16px 48px 0px #F9C74F55', duration: 0.35, ease: 'power2.out' });
            const icon = card.querySelector('.icon-anim lottie-player');
            if(icon) icon.setSpeed(1.1);
          });
        });
        // Parallax shape morph
        const shape = document.querySelector('.absolute.-top-16.left-1/3');
        if(shape) {
          gsap.to(shape, {
            y: -80,
            rotate: 18,
            scale: 1.13,
            ease: 'none',
            scrollTrigger: {
              trigger: '.values-masonry',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        }
      } else {
        // MOBILE: Card Stack, Morph, Parallax, Clean
        const cards = document.querySelectorAll('.value-card-mobile');
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: -24 + i*8,
            scale: 1.04,
            borderRadius: '28% 72% 60% 40%/60% 30% 70% 40%',
            boxShadow: '0 12px 40px 0px #A05A2C55',
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'expo.inOut',
            delay: 0.1 + i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: 'top 97%',
              end: 'bottom 40%',
              scrub: true,
              onUpdate: self => {
                const icon = card.querySelector('.icon-anim lottie-player');
                if(icon) {
                  icon.setSpeed(1.1 + self.progress * 2.2);
                  icon.setDirection(1);
                }
                card.style.borderRadius = self.progress < 0.5 ?
                  '20px' :
                  '28% 72% 60% 40%/60% 30% 70% 40%';
              }
            }
          });
          // Parallax floating saat scroll
          gsap.to(card, {
            y: '+=18',
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            }
          });
          // Tap micro-interaction
          card.addEventListener('touchstart', () => {
            gsap.to(card, { scale: 1.12, borderRadius: '40% 60% 60% 40%/50% 60% 40% 50%', boxShadow: '0 24px 64px 0px #F9C74Fcc', duration: 0.3, ease: 'power2.out' });
            const icon = card.querySelector('.icon-anim lottie-player');
            if(icon) icon.setSpeed(3);
          });
          card.addEventListener('touchend', () => {
            gsap.to(card, { scale: 1.04, borderRadius: '28% 72% 60% 40%/60% 30% 70% 40%', boxShadow: '0 12px 40px 0px #A05A2C55', duration: 0.3, ease: 'power2.out' });
            const icon = card.querySelector('.icon-anim lottie-player');
            if(icon) icon.setSpeed(1.1);
          });
        });
        // Parallax shape morph mobile
        const shape = document.querySelector('.values-cardstack .absolute');
        if(shape) {
          gsap.to(shape, {
            y: 40,
            rotate: 12,
            scale: 1.09,
            ease: 'none',
            scrollTrigger: {
              trigger: '.values-cardstack',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          });
        }
      }
    } else {
      // Fallback jika GSAP/ScrollTrigger belum siap
      setTimeout(initValuesGSAP, 400);
    }
  }
  // Jalankan inisialisasi GSAP untuk Nilai-Nilai Kami
  initValuesGSAP();

}); 