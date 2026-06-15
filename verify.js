/* ============================================
   BREAKUPBUDGET — verify.js
   REAL payment verification. No honor system.
   Cashfree only redirects here with ?unlock=cert49
   if payment ACTUALLY succeeded.
   Load this AFTER logic.js.
============================================ */

/* Disable the old honor-system popup completely */
window.showPayVerifyPopup = function () {};
window.verifyAndUnlock   = function () {
  showToast('Please complete the payment on Cashfree first 🔒');
};

/* Override pay click — just save state, no popup timer */
window.handlePayClick = function () {
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
  /* No popup. Cashfree's Return URL is the only way back. */
};

/* On every page load — check if Cashfree sent us back
   with the real unlock signal */
(function checkRealPayment() {
  const params = new URLSearchParams(window.location.search);

  if (params.get('unlock') === 'cert49') {
    const saved = sessionStorage.getItem('bb_state');

    if (saved) {
      const d = JSON.parse(saved);
      Object.assign(STATE, d);
      STATE.paid = true;

      sessionStorage.removeItem('bb_pending');
      sessionStorage.removeItem('bb_state');

      /* Show result section + fill phase1 first so layout is correct */
      const resultEl = document.getElementById('result');
      if (resultEl) resultEl.style.display = 'block';

      if (typeof unlockPhase2 === 'function') {
        unlockPhase2();
        showToast('🎉 Payment confirmed! Your certificate is ready below!', 4000);
      }

      /* Clean the URL so refresh doesn't re-trigger */
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

    } else {
      /* Paid but no saved calc (e.g. opened in new device/tab) */
      showToast('Payment confirmed! Please recalculate to see your certificate.', 5000);
      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }
})();

console.log('✅ verify.js loaded — real payment verification active');