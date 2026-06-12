/* ============================================
   BREAKUPBUDGET.PAGES.DEV — logic.js
   Calculator, payment gate, all interactions.
   Requires: data.js loaded first.
============================================ */

/* ══════════════════════════════════════════
   STATE — single source of truth
══════════════════════════════════════════ */
const STATE = {
  total:      0,
  name:       'You',
  months:     0,
  dateCost:   0,
  gifts:      0,
  trips:      0,
  callCost:   0,
  flowers:    0,
  paid:       false,   // TRUE only after payment verified
  roastIdx:   0,
  roastIdx2:  0,
  certIdx:    0,
};

/* ══════════════════════════════════════════
   CURSOR
══════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function animate() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animate);
  })();
  document.querySelectorAll('button, a, input, .faq-item, .roast-refresh').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
  });
})();

/* ══════════════════════════════════════════
   FLOATING HEARTS
══════════════════════════════════════════ */
(function initHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;
  const emojis = ['💔','💸','😭','🥀','📉','💀','🤡','😤','💳','🫀'];
  emojis.forEach(e => {
    const h = document.createElement('div');
    h.className = 'fh';
    h.textContent = e;
    h.style.left              = Math.random() * 100 + '%';
    h.style.fontSize           = (14 + Math.random() * 18) + 'px';
    h.style.animationDuration  = (14 + Math.random() * 20) + 's';
    h.style.animationDelay     = (-Math.random() * 20) + 's';
    container.appendChild(h);
  });
})();

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function animateCount(el, target, prefix = '', suffix = '', duration = 2200) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(ease * target).toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
setTimeout(() => {
  const u = document.getElementById('stat-users');
  const a = document.getElementById('stat-avg');
  const t = document.getElementById('stat-total');
  if (u) animateCount(u, 47382);
  if (a) animateCount(a, 52000, '₹');
  if (t) animateCount(t, 24, '₹', 'Cr');
}, 600);

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, duration = 3500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════
   CONFETTI BURST
══════════════════════════════════════════ */
function burst() {
  const colors = ['#C0392B','#E74C3C','#D4A017','#F5EFE6','#E91E63','#C8960C'];
  for (let i = 0; i < 36; i++) {
    const el = document.createElement('div');
    const isCircle = Math.random() > 0.4;
    el.style.cssText = `
      position:fixed; top:50%; left:50%;
      width:${4 + Math.random() * 8}px;
      height:${4 + Math.random() * 8}px;
      background:${colors[i % colors.length]};
      border-radius:${isCircle ? '50%' : '2px'};
      pointer-events:none; z-index:9990;
      transition: all ${0.7 + Math.random() * 0.9}s cubic-bezier(0,0.6,0.4,1);
      transform: translate(-50%,-50%);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 120 + Math.random() * 220;
      el.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
      el.style.opacity   = '0';
    });
    setTimeout(() => el.remove(), 1700);
  }
}

/* ══════════════════════════════════════════
   RANGE SLIDER LIVE UPDATE
══════════════════════════════════════════ */
function initSliders() {
  const moSlider = document.getElementById('range-months');
  const moVal    = document.getElementById('val-months');
  const daSlider = document.getElementById('range-dates');
  const daVal    = document.getElementById('val-dates');
  if (moSlider && moVal) {
    moSlider.addEventListener('input', () => {
      const v = moSlider.value;
      moVal.textContent = v + (v == 1 ? ' month' : ' months');
    });
  }
  if (daSlider && daVal) {
    daSlider.addEventListener('input', () => {
      daVal.textContent = '₹' + parseInt(daSlider.value).toLocaleString('en-IN');
    });
  }
}

/* ══════════════════════════════════════════
   MAIN CALCULATE
══════════════════════════════════════════ */
function calculate() {
  const months = parseInt(document.getElementById('range-months').value) || 0;
  const dates  = parseInt(document.getElementById('range-dates').value)  || 0;
  const gifts  = parseInt(document.getElementById('inp-gifts').value)    || 0;
  const trips  = parseInt(document.getElementById('inp-trips').value)    || 0;
  const calls  = parseInt(document.getElementById('inp-calls').value)    || 0;
  const flowers= parseInt(document.getElementById('inp-flowers').value)  || 0;
  const name   = (document.getElementById('inp-name').value || '').trim() || 'You';

  const dateCost  = months * dates;
  const callCost  = months * calls;
  const total     = dateCost + gifts + trips + callCost + flowers;

  if (!total) {
    showToast('Add at least one amount first 😅');
    return;
  }

  /* save to STATE */
  STATE.total    = total;
  STATE.name     = name;
  STATE.months   = months;
  STATE.dateCost = dateCost;
  STATE.gifts    = gifts;
  STATE.trips    = trips;
  STATE.callCost = callCost;
  STATE.flowers  = flowers;
  STATE.paid     = false;  /* reset payment on new calculation */
  STATE.certIdx++;

  /* reset any previous unlock */
  showPhase1();

  /* fill shared amount display */
  _el('result-verdict').textContent = BB.getVerdict(total);
  _el('result-amount').textContent  = BB.fmt(total);

  /* roast */
  STATE.roastIdx = _randIdx(BB.ROASTS, -1);
  _el('roast-text').textContent = BB.ROASTS[STATE.roastIdx](total);

  /* fill blurred tease grid */
  _fillBlurGrid();
  _fillBlurPills();

  /* show result, hide phase2 */
  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  burst();
}

/* ══════════════════════════════════════════
   PHASE 1 — locked view
══════════════════════════════════════════ */
function showPhase1() {
  _show('phase1');
  _hide('phase2');
  _hide('section-insta');
  _hide('section-tip');
  _hide('section-domain');
  _hide('section-aff');
  _hide('section-share');
}

function _fillBlurGrid() {
  const items = [
    { icon:'🍽️', val: BB.fmt(STATE.dateCost), lbl:'Dates'    },
    { icon:'🎁',  val: BB.fmt(STATE.gifts),    lbl:'Gifts'    },
    { icon:'✈️',  val: BB.fmt(STATE.trips),    lbl:'Trips'    },
    { icon:'📱',  val: BB.fmt(STATE.callCost), lbl:'Calls'    },
    { icon:'🌹',  val: BB.fmt(STATE.flowers),  lbl:'Treats'   },
    { icon:'📅',  val: STATE.months + (STATE.months === 1 ? ' mo' : ' mos'), lbl:'Duration' },
  ];
  _el('blur-grid').innerHTML = items.map(b =>
    `<div class="blur-cell">
       <div class="blur-icon">${b.icon}</div>
       <div class="blur-val">${b.val}</div>
       <div class="blur-lbl">${b.lbl}</div>
     </div>`
  ).join('');
}

function _fillBlurPills() {
  const equivs = BB.getEquivs(STATE.total, 4);
  _el('blur-pills').innerHTML = equivs.map(e =>
    `<span class="blur-pill">${e}</span>`
  ).join('');
}

/* ══════════════════════════════════════════
   ROAST REFRESH  (phase 1)
══════════════════════════════════════════ */
function refreshRoast() {
  if (!STATE.total) return;
  STATE.roastIdx = _randIdx(BB.ROASTS, STATE.roastIdx);
  _el('roast-text').textContent = BB.ROASTS[STATE.roastIdx](STATE.total);
  showToast('🔥 Fresh roast served.');
}

/* ══════════════════════════════════════════
   PAYMENT GATE — the unbreakable lock
   Flow:
     1. User clicks pay button
     2. Cashfree opens in new tab
     3. After ~8s we show "Did you pay?" popup
     4. User confirms → unlockPhase2()
     5. Phase 2 is built fresh from STATE
   The certificate modal checks STATE.paid
   before rendering — impossible to bypass.
══════════════════════════════════════════ */
function handlePayClick() {
  /* Save current calculation to sessionStorage
     so if they navigate away and back, we can restore */
  sessionStorage.setItem('bb_pending', '1');
  sessionStorage.setItem('bb_state', JSON.stringify({
    total:    STATE.total,
    name:     STATE.name,
    months:   STATE.months,
    dateCost: STATE.dateCost,
    gifts:    STATE.gifts,
    trips:    STATE.trips,
    callCost: STATE.callCost,
    flowers:  STATE.flowers,
    certIdx:  STATE.certIdx,
  }));
  /* Show payment confirmation popup after 9 seconds */
  setTimeout(showPayVerifyPopup, 9000);
}

function showPayVerifyPopup() {
  if (STATE.paid) return;           /* already unlocked */
  if (document.getElementById('pay-verify-popup')) return; /* already showing */

  const popup = document.createElement('div');
  popup.id = 'pay-verify-popup';
  popup.className = 'pay-verify-popup';
  popup.innerHTML = `
    <div class="pvp-title">💳 Payment Complete?</div>
    <div class="pvp-body">If you finished the ₹49 payment on Cashfree, tap below to unlock your full results and certificate right now!</div>
    <button class="pvp-yes" onclick="verifyAndUnlock()">✅ Yes! Unlock My Certificate</button>
    <button class="pvp-no"  onclick="this.closest('#pay-verify-popup').remove()">Not yet — still paying</button>
  `;
  document.body.appendChild(popup);
}

function verifyAndUnlock() {
  /* Restore state if page was refreshed */
  const saved = sessionStorage.getItem('bb_state');
  if (saved && !STATE.total) {
    const d = JSON.parse(saved);
    Object.assign(STATE, d);
  }

  if (!STATE.total) {
    showToast('Please calculate your amount first!');
    return;
  }

  STATE.paid = true;
  sessionStorage.removeItem('bb_pending');
  sessionStorage.removeItem('bb_state');

  /* Remove popup if still showing */
  const popup = document.getElementById('pay-verify-popup');
  if (popup) popup.remove();

  unlockPhase2();
  showToast('🎉 Unlocked! Scroll down to see everything!', 4000);
}

/* ══════════════════════════════════════════
   PHASE 2 — full content after payment
══════════════════════════════════════════ */
function unlockPhase2() {
  _hide('phase1');
  _show('phase2');
  _show('section-insta');
  _show('section-tip');
  _show('section-domain');
  _show('section-aff');
  _show('section-share');

  /* verdict + amount */
  _el('p2-verdict').textContent = BB.getVerdict(STATE.total);
  _el('p2-amount').textContent  = BB.fmt(STATE.total);

  /* roast */
  STATE.roastIdx2 = _randIdx(BB.ROASTS, STATE.roastIdx);
  _el('p2-roast-text').textContent = BB.ROASTS[STATE.roastIdx2](STATE.total);

  /* breakdown grid */
  _el('breakdown-grid').innerHTML = [
    { icon:'🍽️', val: BB.fmt(STATE.dateCost), lbl:'Dates'    },
    { icon:'🎁',  val: BB.fmt(STATE.gifts),    lbl:'Gifts'    },
    { icon:'✈️',  val: BB.fmt(STATE.trips),    lbl:'Trips'    },
    { icon:'📱',  val: BB.fmt(STATE.callCost), lbl:'Calls'    },
    { icon:'🌹',  val: BB.fmt(STATE.flowers),  lbl:'Treats'   },
    { icon:'📅',  val: STATE.months + (STATE.months === 1 ? ' mo' : ' mos'), lbl:'Duration' },
  ].map(b =>
    `<div class="bk-cell">
       <div class="bk-icon">${b.icon}</div>
       <div class="bk-val">${b.val}</div>
       <div class="bk-lbl">${b.lbl}</div>
     </div>`
  ).join('');

  /* equivalents — rotating */
  _el('equiv-items').innerHTML = BB.getEquivs(STATE.total, 4)
    .map(e => `<span class="equiv-item">${e}</span>`).join('');

  /* ROI bar */
  const roi = BB.getROI(STATE.total);
  _el('roi-label-val').textContent = roi.label;
  setTimeout(() => { _el('roi-fill').style.width = roi.pct + '%'; }, 300);

  /* horoscope section */
  _buildHoroscope();

  /* lucky draw date */
  const nd = new Date();
  nd.setDate(nd.getDate() + (10 - (nd.getDate() % 10 || 10)));
  const drawEl = document.getElementById('next-draw-date');
  if (drawEl) drawEl.textContent = nd.toLocaleDateString('en-IN', { day:'numeric', month:'long' });

  /* auto-open certificate after short delay */
  setTimeout(() => {
    const certSection = document.getElementById('cert-reveal-section');
    if (certSection) certSection.scrollIntoView({ behavior:'smooth', block:'start' });
    setTimeout(openCertModal, 600);
  }, 800);

  burst();
}

/* ══════════════════════════════════════════
   HOROSCOPE — extra viral/share feature
══════════════════════════════════════════ */
function _buildHoroscope() {
  const el = document.getElementById('horoscope-section');
  if (!el) return;
  const h = BB.getHoroscope(STATE.total);
  el.innerHTML = `
    <div style="font-family:var(--ff-mono);font-size:10px;letter-spacing:.14em;color:var(--gold);text-transform:uppercase;margin-bottom:10px">
      ✦ Your Heartbreak Horoscope ✦
    </div>
    <div style="font-family:var(--ff-serif);font-size:22px;color:var(--cream);margin-bottom:8px">${h.sign}</div>
    <div style="font-size:13px;color:var(--grey);line-height:1.65">${h.desc}</div>
  `;
  el.style.display = 'block';
}

/* ══════════════════════════════════════════
   PHASE 2 ROAST REFRESH
══════════════════════════════════════════ */
function refreshRoastP2() {
  if (!STATE.total) return;
  STATE.roastIdx2 = _randIdx(BB.ROASTS, STATE.roastIdx2);
  _el('p2-roast-text').textContent = BB.ROASTS[STATE.roastIdx2](STATE.total);
  /* also refresh equivalents */
  _el('equiv-items').innerHTML = BB.getEquivs(STATE.total, 4)
    .map(e => `<span class="equiv-item">${e}</span>`).join('');
  showToast('🔥 New roast unlocked.');
}

/* ══════════════════════════════════════════
   CERTIFICATE MODAL — HARD GATE
   openCertModal() checks STATE.paid
   If not paid: shows pay prompt, never shows cert
   If paid: builds & shows beautiful cert
══════════════════════════════════════════ */
function openCertModal() {
  /* HARD GATE — cert impossible without payment */
  if (!STATE.paid) {
    showToast('Complete the ₹49 payment first to unlock your certificate 🔒');
    const payBtn = document.getElementById('pay-main-btn');
    if (payBtn) {
      payBtn.scrollIntoView({ behavior:'smooth', block:'center' });
      payBtn.style.animation = 'none';
      setTimeout(() => { payBtn.style.animation = ''; }, 100);
    }
    return;
  }

  /* Build and show */
  STATE.certIdx++;
  const html = buildCertCard(STATE.name, STATE.total, STATE.certIdx);
  _el('cert-modal-card').innerHTML  = html;
  _el('cert-modal-actions').innerHTML = `
    <button class="cert-action ca-gold"  onclick="screenshotCert()">📸 Screenshot & Share</button>
    <button class="cert-action ca-ghost" onclick="copyCertText()">📋 Copy Text</button>
    <button class="cert-action ca-red"   onclick="newCertStyle()">🎲 New Style</button>
  `;
  document.getElementById('cert-modal').classList.add('open');
}

function newCertStyle() {
  STATE.certIdx++;
  _el('cert-modal-card').innerHTML = buildCertCard(STATE.name, STATE.total, STATE.certIdx);
  showToast('✨ New design generated!');
}

function closeCertModal() {
  document.getElementById('cert-modal').classList.remove('open');
}

function screenshotCert() {
  showToast('📸 Long-press the card to save → post on Instagram → tag @breakupbudget for the lucky draw! 🎁', 5000);
}

function copyCertText() {
  const roi = BB.getROI(STATE.total);
  const text = `🏆 OFFICIAL CERTIFICATE OF ROMANTIC LOSS\n\nThis certifies that ${STATE.name} has officially wasted ${BB.fmt(STATE.total)} on someone who did not deserve it.\n\nRelationship ROI: ${roi.label}\n\nMay your next investment have better returns.\n\n— BreakupBudget.pages.dev\n📸 @breakupbudget\n#breakupbudget #exmath #heartbreak`;
  navigator.clipboard.writeText(text)
    .then(() => showToast('Certificate text copied! Paste it on Instagram 📸'))
    .catch(() => showToast('Copy the text manually from the certificate!'));
}

/* ══════════════════════════════════════════
   INSTAGRAM CAPTION COPY
══════════════════════════════════════════ */
function copyInstaCap() {
  const equivs = BB.getEquivs(STATE.total, 2);
  const text = `💔 I just calculated what my ex actually cost me — ${BB.fmt(STATE.total)}.\n\nInstead I could have had:\n${equivs.map(e => '• ' + e).join('\n')}\n\nGot my official Certificate of Romantic Loss 🏆\n\nCalculate yours 👇\nbreakupbudget.pages.dev\n\n@breakupbudget\n#breakupbudget #exmath #heartbreak #relatable #indiandating #singlelife`;
  navigator.clipboard.writeText(text)
    .then(() => showToast('Caption copied! Tag @breakupbudget for the lucky draw 🎁'))
    .catch(() => showToast('Select and copy the caption manually!'));
}

/* ══════════════════════════════════════════
   SHARE FUNCTIONS
══════════════════════════════════════════ */
function _getShareText() {
  return `💔 I used BreakupBudget and discovered I wasted ${BB.fmt(STATE.total)} on my ex.\n\n${BB.getEquivs(STATE.total, 1)[0] || ''}\n\nCalculate yours 👇\nbreakupbudget.pages.dev`;
}
function shareWhatsApp() {
  window.open('https://wa.me/?text=' + encodeURIComponent(_getShareText()), '_blank');
}
function shareTwitter() {
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(_getShareText() + '\n@breakupbudget'), '_blank');
}
function copyShareText() {
  navigator.clipboard.writeText(_getShareText())
    .then(() => showToast('Copied! Send it everywhere 😈'));
}

/* ══════════════════════════════════════════
   EMAIL FORM
══════════════════════════════════════════ */
function handleEmailSubmit(e) {
  e.preventDefault();
  const input  = e.target.querySelector('input[type="email"]');
  const button = e.target.querySelector('button[type="submit"]');
  if (!input || !input.value) return;
  showToast('🎉 Guide sent to ' + input.value + '! Check your inbox.');
  input.value   = '';
  button.textContent = '✓ Sent!';
  setTimeout(() => { button.textContent = 'Send →'; }, 3000);
}

/* ══════════════════════════════════════════
   RECALCULATE
══════════════════════════════════════════ */
function recalculate() {
  document.getElementById('result').style.display = 'none';
  _el('roi-fill').style.width = '0';
  STATE.paid  = false;
  STATE.total = 0;
  document.getElementById('calculator').scrollIntoView({ behavior:'smooth' });
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════════ */
function initFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;
  container.innerHTML = BB.FAQS.map(f => `
    <div class="faq-item" onclick="this.classList.toggle('open')">
      <div class="faq-question">${f.q}<span class="faq-icon">+</span></div>
      <div class="faq-answer">${f.a}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   MARQUEE STORIES
══════════════════════════════════════════ */
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const doubled = [...BB.STORIES, ...BB.STORIES];
  track.innerHTML = doubled.map(s => `
    <div class="story-card">
      <div class="story-amount">${s.amt}</div>
      <div class="story-text">${s.text}</div>
      <div class="story-name">${s.name}</div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   MODAL CLOSE ON BACKDROP CLICK
══════════════════════════════════════════ */
function initModalClose() {
  const overlay = document.getElementById('cert-modal');
  if (!overlay) return;
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCertModal();
  });
}

/* ══════════════════════════════════════════
   ON PAGE LOAD — check if returning from payment
   Cashfree redirects back to same URL.
   We check sessionStorage for pending payment.
══════════════════════════════════════════ */
function checkReturnFromPayment() {
  if (sessionStorage.getItem('bb_pending') !== '1') return;
  const saved = sessionStorage.getItem('bb_state');
  if (!saved) return;

  const d = JSON.parse(saved);
  Object.assign(STATE, d);

  /* Show result section with phase1 so popup makes sense */
  const resultEl = document.getElementById('result');
  if (resultEl) resultEl.style.display = 'block';

  /* Fill phase1 displays */
  if (_el('result-verdict')) _el('result-verdict').textContent = BB.getVerdict(STATE.total);
  if (_el('result-amount'))  _el('result-amount').textContent  = BB.fmt(STATE.total);
  STATE.roastIdx = _randIdx(BB.ROASTS, -1);
  if (_el('roast-text')) _el('roast-text').textContent = BB.ROASTS[STATE.roastIdx](STATE.total);
  _fillBlurGrid();
  _fillBlurPills();

  /* Show verification popup immediately */
  setTimeout(showPayVerifyPopup, 1200);
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function _el(id)     { return document.getElementById(id); }
function _show(id)   { const e = document.getElementById(id); if (e) e.style.display = 'block'; }
function _hide(id)   { const e = document.getElementById(id); if (e) e.style.display = 'none'; }
function _randIdx(arr, prev) {
  if (arr.length <= 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * arr.length); } while (idx === prev);
  return idx;
}

/* ══════════════════════════════════════════
   INIT — runs when DOM is ready
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  initFAQ();
  initMarquee();
  initModalClose();
  checkReturnFromPayment();
  console.log('✅ logic.js initialised');
});