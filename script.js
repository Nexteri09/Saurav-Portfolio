/**
 * SAURAV KARANDE — UX/UI DESIGNER PORTFOLIO ENGINE
 * Ultra-Smooth 120fps Parallax Horizon · Hardware-Accelerated Compositing
 * Zero Layout Thrashing · Zero Style Invalidation Churn · High Craft
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SYSTEMATIC STRATA PALETTES (Lush Green Alpine -> Golden Sunset -> Midnight Sapphire -> Molten Magma)
  // =========================================================================
  const STRATA = [
    {
      // 0.0 - 0.28: Lush Alpine Morning & High Meadow (Generous Green Time)
      pct: 0.0,
      skyTop: [222, 242, 234],
      skyBottom: [244, 250, 246],
      l1: [168, 210, 186],
      l2: [142, 192, 164],
      l3: [118, 174, 144],
      l4: [94, 156, 126],
      l5: [74, 138, 108],
      l6: [56, 120, 92],
      l7: [40, 102, 76],
      l8: [28, 84, 62],
      molten: 0
    },
    {
      // 0.28: Rich Emerald Valley (Full Green Scroll Time)
      pct: 0.28,
      skyTop: [212, 236, 226],
      skyBottom: [238, 248, 242],
      l1: [156, 202, 176],
      l2: [130, 184, 154],
      l3: [108, 166, 134],
      l4: [86, 148, 116],
      l5: [66, 130, 98],
      l6: [50, 112, 84],
      l7: [36, 94, 68],
      l8: [24, 76, 54],
      molten: 0
    },
    {
      // 0.42: Golden Hour Sunset (Sun sinks behind rising ridges; warm apricot horizon)
      pct: 0.42,
      skyTop: [70, 78, 116],
      skyBottom: [246, 164, 106],
      l1: [140, 124, 138],
      l2: [116, 102, 118],
      l3: [94, 82, 102],
      l4: [76, 66, 88],
      l5: [60, 52, 76],
      l6: [46, 40, 64],
      l7: [34, 30, 52],
      l8: [24, 22, 42],
      molten: 0
    },
    {
      // 0.62: Midnight Starry Sapphire (Cosmic Dome, Brilliant Rotating Stars)
      pct: 0.62,
      skyTop: [8, 16, 42],
      skyBottom: [18, 48, 112],
      l1: [36, 76, 136],
      l2: [28, 62, 116],
      l3: [22, 50, 98],
      l4: [17, 40, 82],
      l5: [13, 32, 68],
      l6: [10, 25, 56],
      l7: [8, 19, 46],
      l8: [6, 14, 38],
      molten: 0
    },
    {
      // 0.82: Deep Midnight Sapphire (Calm, elegant, zero red glare)
      pct: 0.82,
      skyTop: [8, 14, 32],
      skyBottom: [12, 24, 52],
      l1: [24, 42, 72],
      l2: [20, 35, 60],
      l3: [16, 28, 50],
      l4: [13, 23, 40],
      l5: [10, 18, 32],
      l6: [8, 14, 26],
      l7: [6, 11, 20],
      l8: [5, 8, 16],
      molten: 0
    },
    {
      // 1.0: Deep Midnight Obsidian (Rich, architectural, pristine dark)
      pct: 1.0,
      skyTop: [6, 10, 22],
      skyBottom: [10, 16, 36],
      l1: [18, 30, 52],
      l2: [15, 25, 44],
      l3: [12, 20, 36],
      l4: [10, 16, 29],
      l5: [8, 13, 23],
      l6: [6, 10, 18],
      l7: [5, 8, 14],
      l8: [4, 6, 11],
      molten: 0
    }
  ];

  // Cached DOM elements
  const strataBackdrop = document.getElementById('strataBackdrop');
  const starsWrap = document.getElementById('starsWrap');
  const starsCanvas = document.getElementById('starsCanvas');
  const sunWrap = document.getElementById('sunWrap');
  const moltenGlow = document.getElementById('moltenGlow');
  const mountainLayers = Array.from(document.querySelectorAll('.mountain-layer'));
  const ridgePaths = Array.from(document.querySelectorAll('.ridge-path'));
  const layerSpeeds = [0.03, 0.06, 0.10, 0.15, 0.20, 0.25, 0.30, 0.36];

  // =========================================================================
  // CELESTIAL ROTATING STAR FIELD (DPR-Crisp Pre-rendered Canvas, 120fps Rotation)
  // =========================================================================
  let starsCtx = null;
  function initStars() {
    if (!starsCanvas) return;
    starsCtx = starsCanvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = Math.round(window.innerWidth * 1.4);
    const cssH = Math.round(window.innerHeight * 1.4);
    starsCanvas.width = Math.round(cssW * dpr);
    starsCanvas.height = Math.round(cssH * dpr);
    starsCtx.scale(dpr, dpr);

    starsCtx.clearRect(0, 0, cssW, cssH);

    // Subtle faint cosmic nebula dust in background (deep space feel like Pinterest video)
    const neb1 = starsCtx.createRadialGradient(cssW * 0.4, cssH * 0.35, 20, cssW * 0.4, cssH * 0.35, cssW * 0.45);
    neb1.addColorStop(0, 'rgba(40, 60, 110, 0.12)');
    neb1.addColorStop(0.5, 'rgba(25, 40, 80, 0.05)');
    neb1.addColorStop(1, 'transparent');
    starsCtx.fillStyle = neb1;
    starsCtx.fillRect(0, 0, cssW, cssH);

    const neb2 = starsCtx.createRadialGradient(cssW * 0.75, cssH * 0.5, 30, cssW * 0.75, cssH * 0.5, cssW * 0.35);
    neb2.addColorStop(0, 'rgba(60, 45, 95, 0.08)');
    neb2.addColorStop(1, 'transparent');
    starsCtx.fillStyle = neb2;
    starsCtx.fillRect(0, 0, cssW, cssH);

    // 2,600 Dense, Crisp, Tiny Natural Starlight Points (Exact match to Pinterest reference video)
    const starCount = 2600;
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * cssW;
      const y = Math.random() * cssH;

      // Natural star size distribution:
      // 82% tiny pinpricks (0.45px - 0.95px)
      // 14% small stars (1.0px - 1.4px)
      // 4% bright pinpoint diamonds (1.5px - 2.0px)
      const rand = Math.random();
      let r, alpha;
      if (rand < 0.82) {
        r = Math.random() * 0.5 + 0.45;
        alpha = Math.random() * 0.65 + 0.25;
      } else if (rand < 0.96) {
        r = Math.random() * 0.4 + 1.0;
        alpha = Math.random() * 0.45 + 0.55;
      } else {
        r = Math.random() * 0.5 + 1.5;
        alpha = Math.random() * 0.3 + 0.7;
      }

      // Natural star tints: pure white, icy diamond blue, soft pale gold
      const tintRand = Math.random();
      let color;
      if (tintRand < 0.65) {
        color = 'rgba(255, 255, 255, ' + alpha.toFixed(2) + ')';
      } else if (tintRand < 0.85) {
        color = 'rgba(215, 235, 255, ' + alpha.toFixed(2) + ')';
      } else {
        color = 'rgba(255, 248, 220, ' + alpha.toFixed(2) + ')';
      }

      // For the 4% brightest stars, add a faint, tiny 2.5px starlight glow
      if (r > 1.4) {
        starsCtx.beginPath();
        starsCtx.arc(x, y, r * 2.2, 0, Math.PI * 2);
        starsCtx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.22).toFixed(2) + ')';
        starsCtx.fill();
      }

      // Crisp pinpoint star
      starsCtx.beginPath();
      starsCtx.arc(x, y, r, 0, Math.PI * 2);
      starsCtx.fillStyle = color;
      starsCtx.fill();
    }
  }

  initStars();
  window.addEventListener('resize', initStars, { passive: true });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpArr(c1, c2, t) {
    return [
      Math.round(lerp(c1[0], c2[0], t)),
      Math.round(lerp(c1[1], c2[1], t)),
      Math.round(lerp(c1[2], c2[2], t))
    ];
  }

  function toRgbStr(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  }

  // Cached layout metrics — NEVER query scrollHeight in the frame loop!
  let maxScroll = 1;
  function updateMetrics() {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }
  updateMetrics();
  window.addEventListener('resize', updateMetrics, { passive: true });

  // =========================================================================
  // 2. MOUSE TRACKING
  // =========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let mouseActive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseActive = true;
    requestTick();
  }, { passive: true });

  // =========================================================================
  // 3. LIVING VOLCANIC MAGMA EMBERS CANVAS (Fast 2D Drawing, No ShadowBlur)
  // =========================================================================
  const magmaCanvas = document.getElementById('magmaCanvas');
  let magmaCtx = null;
  let embers = [];

  if (magmaCanvas) {
    magmaCtx = magmaCanvas.getContext('2d');

    function resizeMagmaCanvas() {
      magmaCanvas.width = magmaCanvas.offsetWidth || window.innerWidth;
      magmaCanvas.height = magmaCanvas.offsetHeight || 480;
    }

    resizeMagmaCanvas();
    window.addEventListener('resize', resizeMagmaCanvas, { passive: true });

    for (let i = 0; i < 35; i++) {
      embers.push({
        x: Math.random() * (magmaCanvas.width || window.innerWidth),
        y: Math.random() * (magmaCanvas.height || 480),
        size: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.9 + 0.3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        alpha: Math.random() * 0.5 + 0.15,
        hue: Math.random() > 0.5 ? 'rgba(255, 140, 70, 0.45)' : 'rgba(255, 190, 110, 0.35)'
      });
    }
  }

  function renderEmbers() {
    if (!magmaCtx || !magmaCanvas) return;
    const w = magmaCanvas.width;
    const h = magmaCanvas.height;
    magmaCtx.clearRect(0, 0, w, h);

    for (let i = 0; i < embers.length; i++) {
      const p = embers[i];
      p.y -= p.speedY;
      p.wobble += p.wobbleSpeed;
      const waveX = p.x + Math.sin(p.wobble) * 12 + (currentMouseX * 10);

      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }

      // Fast dual-circle glow (gentle, unobtrusive ambient motes)
      magmaCtx.beginPath();
      magmaCtx.arc(waveX, p.y, p.size * 1.6, 0, Math.PI * 2);
      magmaCtx.fillStyle = p.hue;
      magmaCtx.globalAlpha = p.alpha * 0.15;
      magmaCtx.fill();

      magmaCtx.beginPath();
      magmaCtx.arc(waveX, p.y, p.size, 0, Math.PI * 2);
      magmaCtx.fillStyle = '#ffffff';
      magmaCtx.globalAlpha = p.alpha * 0.4;
      magmaCtx.fill();
    }

    magmaCtx.globalAlpha = 1;
  }

  // =========================================================================
  // 4. HIGH-PERFORMANCE ANIMATION LOOP (Zero Style Thrashing)
  // =========================================================================
  let currentScrollY = window.scrollY || window.pageYOffset || 0;
  let isTicking = false;
  let wasDark = false;
  let lastFraction = -1;

  function updateVisuals() {
    currentScrollY = window.scrollY || window.pageYOffset || 0;

    // Smooth mouse easing
    currentMouseX += (mouseX - currentMouseX) * 0.1;
    currentMouseY += (mouseY - currentMouseY) * 0.1;

    const fraction = Math.min(1, Math.max(0, currentScrollY / maxScroll));

    // 1. Sinking Celestial Sun (Subtle, elegant sun descends smoothly behind the rising mountains)
    if (sunWrap) {
      const sunY = currentScrollY * 0.44;
      const sunScale = Math.max(0.65, 1 - fraction * 0.55);
      // Stays visible during green morning/meadow, then gently sets behind the mountain peaks
      const sunOpacity = Math.min(1, Math.max(0, (0.50 - fraction) / 0.14));
      sunWrap.style.transform = `translate3d(-50%, ${sunY.toFixed(1)}px, 0) scale(${sunScale.toFixed(3)})`;
      sunWrap.style.opacity = sunOpacity.toFixed(3);
    }

    // 1b. Celestial Starfield: Fades in as sun sets behind peaks, rotates sideways across midnight
    if (starsWrap) {
      let starOpacity = 0;
      if (fraction >= 0.30 && fraction <= 0.84) {
        if (fraction < 0.46) {
          // Fades in smoothly as twilight falls into deep midnight
          starOpacity = (fraction - 0.30) / 0.16;
        } else if (fraction <= 0.72) {
          // 100% full brilliance in the midnight sapphire sky!
          starOpacity = 1.0;
        } else {
          // Fades out into volcanic crimson dawn
          starOpacity = (0.84 - fraction) / 0.12;
        }
      }
      starOpacity = Math.min(1, Math.max(0, starOpacity));
      starsWrap.style.opacity = starOpacity.toFixed(3);

      if (starOpacity > 0.005) {
        const sidewaysAngle = (fraction - 0.30) * 32;
        const sidewaysDriftX = (fraction - 0.30) * -110;
        starsWrap.style.transform = `translate3d(${sidewaysDriftX.toFixed(1)}px, 0, 0) rotate(${sidewaysAngle.toFixed(2)}deg)`;
      }
    }

    // 2. Strata Color Interpolation (Update only when fraction changes meaningfully)
    if (Math.abs(fraction - lastFraction) > 0.001) {
      lastFraction = fraction;

      let fromIdx = 0;
      for (let i = 0; i < STRATA.length - 1; i++) {
        if (fraction >= STRATA[i].pct && fraction <= STRATA[i + 1].pct) {
          fromIdx = i;
          break;
        }
      }
      const toIdx = fromIdx + 1;
      const range = STRATA[toIdx].pct - STRATA[fromIdx].pct;
      const localT = Math.min(1, Math.max(0, (fraction - STRATA[fromIdx].pct) / range));

      const skyTop = lerpArr(STRATA[fromIdx].skyTop, STRATA[toIdx].skyTop, localT);
      const skyBottom = lerpArr(STRATA[fromIdx].skyBottom, STRATA[toIdx].skyBottom, localT);
      const skyUpper = [
        Math.round(lerp(skyTop[0], skyBottom[0], 0.28)),
        Math.round(lerp(skyTop[1], skyBottom[1], 0.28)),
        Math.round(lerp(skyTop[2], skyBottom[2], 0.28))
      ];
      const skyHorizon = [
        Math.round(lerp(skyTop[0], skyBottom[0], 0.68)),
        Math.round(lerp(skyTop[1], skyBottom[1], 0.68)),
        Math.round(lerp(skyTop[2], skyBottom[2], 0.68))
      ];

      if (strataBackdrop) {
        strataBackdrop.style.background = `linear-gradient(180deg, ${toRgbStr(skyTop)} 0%, ${toRgbStr(skyUpper)} 28%, ${toRgbStr(skyHorizon)} 54%, ${toRgbStr(skyBottom)} 100%)`;
      }

      // Mountain Fills (Set directly on 8 SVG paths — avoids whole-page re-cascade)
      if (ridgePaths.length >= 8) {
        ridgePaths[0].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l1, STRATA[toIdx].l1, localT));
        ridgePaths[1].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l2, STRATA[toIdx].l2, localT));
        ridgePaths[2].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l3, STRATA[toIdx].l3, localT));
        ridgePaths[3].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l4, STRATA[toIdx].l4, localT));
        ridgePaths[4].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l5, STRATA[toIdx].l5, localT));
        ridgePaths[5].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l6, STRATA[toIdx].l6, localT));
        ridgePaths[6].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l7, STRATA[toIdx].l7, localT));
        ridgePaths[7].style.fill = toRgbStr(lerpArr(STRATA[fromIdx].l8, STRATA[toIdx].l8, localT));
      }

      if (moltenGlow) {
        const currentMolten = lerp(STRATA[fromIdx].molten, STRATA[toIdx].molten, localT);
        moltenGlow.style.opacity = currentMolten.toFixed(3);
      }
    }

    // 3. Theme Toggle (Transitions to dark mode as sunset gives way to starry night)
    const isDark = fraction >= 0.34;
    if (isDark !== wasDark) {
      document.body.classList.toggle('dark-strata', isDark);
      wasDark = isDark;
    }

    // 4. Choreographed Mountain Horizon (Preserves 8-Layer "Line Gradients" without Layer Collisions)
    // 1) Start low at scroll 0 (+460px down) so hero has vast open sky
    // 2) Scroll at start (0-650px): mountains start to come up smoothly to locked baseline (+240px)
    // 3) Featured Work (650-2100px): "and then wait" - holds steady at +240px lower down!
    // 4) Scroll more (>2100px): gently ascends, keeping mountain peaks in lower 35% so starry dome has 65%+ open sky!
    let mountainBaseY = 240;
    if (currentScrollY < 650) {
      const t = currentScrollY / 650;
      const ease = (1 - Math.cos(t * Math.PI)) / 2;
      mountainBaseY = 240 + (1 - ease) * 220;
    } else if (currentScrollY <= 2100) {
      mountainBaseY = 240;
    } else {
      // Gently rises from 240px down to 180px, preserving 65%+ wide open starry sky for the rotating celestial dome
      const rise = Math.min(60, (currentScrollY - 2100) * 0.04);
      mountainBaseY = 240 - rise;
    }

    const driftBase = Math.sin(fraction * Math.PI);
    for (let idx = 0; idx < mountainLayers.length; idx++) {
      // Gentle subtle parallax difference between layers, but never overtaking or covering each other!
      const relativeOffset = (currentScrollY > 650) ? (currentScrollY - 650) * (idx * 0.006) : 0;
      const verticalY = mountainBaseY - relativeOffset;
      const horizontalDrift = driftBase * (idx % 2 === 0 ? 6 : -6);
      const mouseTiltX = currentMouseX * ((idx + 1) * 0.8);
      const mouseTiltY = currentMouseY * ((idx + 1) * 0.25);

      const totalX = (horizontalDrift + mouseTiltX).toFixed(1);
      const totalY = (verticalY + mouseTiltY).toFixed(1);

      mountainLayers[idx].style.transform = `translate3d(${totalX}px, ${totalY}px, 0)`;
    }

    // 5. Magma Embers Canvas - Disabled to eliminate glow
    // (Embers loop disabled)

    // Keep ticking while mouse moves
    const mouseMoving = mouseActive && (Math.abs(mouseX - currentMouseX) > 0.002 || Math.abs(mouseY - currentMouseY) > 0.002);

    if (mouseMoving) {
      requestAnimationFrame(updateVisuals);
    } else {
      isTicking = false;
      mouseActive = false;
    }
  }

  function requestTick() {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateVisuals);
    }
  }

  // Passive scroll listener (Native 120fps/144fps scroll pipeline)
  window.addEventListener('scroll', requestTick, { passive: true });

  // Initial render
  requestTick();

  // =========================================================================
  // 5. INSTANT NATIVE SCROLL WITH SMOOTH ANCHOR NAV LINKS
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 6. DIRECT EMAIL CLIPBOARD WIRE
  // =========================================================================
  const btnCopyEmail = document.getElementById('btnCopyEmail');
  const toast = document.getElementById('minimalToast');

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2200);
  }

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'sauravkarande48@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Copied: sauravkarande48@gmail.com');
        });
      } else {
        showToast('sauravkarande48@gmail.com');
      }
    });
  }

  // =========================================================================
  // 7. SUBSYNC FULL-RES CASE STUDY MODAL LIGHTBOX
  // =========================================================================
  const subsyncModal = document.getElementById('subsyncModal');
  const btnOpenSubsyncModal = document.getElementById('btnOpenSubsyncModal');
  const btnOpenSubsyncCard = document.getElementById('btnOpenSubsyncCard');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSlideImg = document.getElementById('modalSlideImg');
  const modalSlideCounter = document.getElementById('modalSlideCounter');
  const modalSlideCaption = document.getElementById('modalSlideCaption');
  const btnModalPrev = document.getElementById('btnModalPrev');
  const btnModalNext = document.getElementById('btnModalNext');

  const SUBSYNC_SLIDES = [
    { src: 'images/subsync_overview.png', title: 'Problem Statement & The Solution' },
    { src: 'images/subsync_screens.png', title: 'Core App Screens & Navigation' },
    { src: 'images/subsync_features.png', title: 'Predictive Renewal Insights' },
    { src: 'images/subsync_design_system.png', title: 'Design System & Typography Matrix' },
    { src: 'images/subsync_analytics.png', title: 'Spend Analytics & Categorization' },
    { src: 'images/subsync_architecture.png', title: 'Information Architecture & User Flows' }
  ];

  let currentSlideIdx = 0;

  function updateModalSlide(idx) {
    currentSlideIdx = (idx + SUBSYNC_SLIDES.length) % SUBSYNC_SLIDES.length;
    if (modalSlideImg) {
      modalSlideImg.style.opacity = '0.3';
      modalSlideImg.src = SUBSYNC_SLIDES[currentSlideIdx].src;
      modalSlideImg.onload = () => {
        modalSlideImg.style.opacity = '1';
      };
    }
    if (modalSlideCounter) {
      modalSlideCounter.textContent = `Board ${currentSlideIdx + 1} of ${SUBSYNC_SLIDES.length}`;
    }
    if (modalSlideCaption) {
      modalSlideCaption.textContent = SUBSYNC_SLIDES[currentSlideIdx].title;
    }
  }

  function openSubsyncModal() {
    if (!subsyncModal) return;
    updateModalSlide(0);
    subsyncModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSubsyncModal() {
    if (!subsyncModal) return;
    subsyncModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnOpenSubsyncModal) {
    btnOpenSubsyncModal.addEventListener('click', openSubsyncModal);
  }
  if (btnOpenSubsyncCard) {
    btnOpenSubsyncCard.addEventListener('click', openSubsyncModal);
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeSubsyncModal);
  }
  if (btnModalPrev) {
    btnModalPrev.addEventListener('click', () => updateModalSlide(currentSlideIdx - 1));
  }
  if (btnModalNext) {
    btnModalNext.addEventListener('click', () => updateModalSlide(currentSlideIdx + 1));
  }
  if (subsyncModal) {
    subsyncModal.addEventListener('click', (e) => {
      if (e.target === subsyncModal) closeSubsyncModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!subsyncModal || !subsyncModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeSubsyncModal();
    if (e.key === 'ArrowRight') updateModalSlide(currentSlideIdx + 1);
    if (e.key === 'ArrowLeft') updateModalSlide(currentSlideIdx - 1);
  });

  // =========================================================================
  // 8. FUNCTIONAL CONTACT FORM SUBMISSION
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const btnSubmitForm = document.getElementById('btnSubmitForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnSubmitForm) {
        btnSubmitForm.textContent = 'Sending...';
        btnSubmitForm.disabled = true;
      }
      setTimeout(() => {
        showToast('Message sent! Saurav will get back to you soon.');
        contactForm.reset();
        if (btnSubmitForm) {
          btnSubmitForm.textContent = 'Message Sent ✓';
          setTimeout(() => {
            btnSubmitForm.textContent = 'Send Message';
            btnSubmitForm.disabled = false;
          }, 2500);
        }
      }, 600);
    });
  }

})();
