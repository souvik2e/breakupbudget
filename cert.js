/* ============================================
   BREAKUPBUDGET.PAGES.DEV — cert.js
   Builds the extraordinary certificate card.
   Requires: data.js loaded first.
============================================ */

function buildCertCard(name, amount, certIdx) {
  const s = BB.CERT_STYLES[certIdx % BB.CERT_STYLES.length];
  const closing = BB.CERT_CLOSINGS[certIdx % BB.CERT_CLOSINGS.length];
  const orn = BB.ORNAMENTS[certIdx % BB.ORNAMENTS.length];
  const roi = BB.getROI(amount);
  const equivs = BB.getEquivs(amount, 3);
  const punchline = BB.ROASTS[Math.floor(Math.random() * BB.ROASTS.length)](amount);
  const shortPunch = punchline.length > 130 ? punchline.slice(0, 127) + '...' : punchline;

  return `
  <div class="cert-card" style="background:${s.bg}; border:2.5px ${s.bStyle} ${s.border}">
    <div class="cert-gloss"></div>
    <span class="cert-corner" style="top:10px;left:14px;color:${s.extra}">${orn}</span>
    <span class="cert-corner" style="top:10px;right:14px;color:${s.extra}">${orn}</span>
    <span class="cert-corner" style="bottom:10px;left:14px;color:${s.extra}">${orn}</span>
    <span class="cert-corner" style="bottom:10px;right:14px;color:${s.extra}">${orn}</span>

    <div class="cert-eyebrow" style="color:${s.extra}">
      BreakupBudget · Certified · Style #${(certIdx % 20) + 1}/100+ · ${s.name}
    </div>

    <div class="cert-title-1" style="color:${s.text}">Certificate of</div>
    <div class="cert-title-2" style="color:${s.accent}">Romantic Loss</div>

    <div class="cert-hr" style="background:${s.border}"></div>

    <div class="cert-certifies" style="color:${s.text}">This certifies that</div>
    <div class="cert-name" style="color:${s.text}">${_escapeHtml(name)}</div>
    <div class="cert-wasted" style="color:${s.text}">has officially, irrevocably wasted</div>
    <div class="cert-amount" style="color:${s.accent}">${BB.fmt(amount)}</div>

    <div class="cert-punchline" style="color:${s.text}">${shortPunch}</div>

    <div class="cert-equivs">
      ${equivs.map(e => `<span class="cert-equiv-pill" style="background:rgba(255,255,255,.06);border:0.5px solid ${s.border}55;color:${s.extra}">${e}</span>`).join('')}
    </div>

    <div class="cert-hr" style="background:${s.border}"></div>

    <div class="cert-roi-label" style="color:${s.extra}">Relationship ROI: ${roi.label}</div>
    <div class="cert-roi-bar">
      <div class="cert-roi-fill" style="width:${roi.pct}%; background:linear-gradient(90deg, ${s.accent}, ${s.border})"></div>
    </div>

    <div class="cert-closing" style="color:${s.text}">${closing}</div>

    <span class="cert-seal">💔</span>
    <div class="cert-stamp" style="color:${s.text}">
      ISSUED BY BREAKUPBUDGET.PAGES.DEV · NOT LEGALLY BINDING · EMOTIONALLY VERY BINDING · ${new Date().getFullYear()}
    </div>
    <div class="cert-style-id" style="color:${s.text}">
      STYLE: ${s.name.toUpperCase()} · CERTIFICATE #${10000 + (certIdx * 137 % 89999)}
    </div>
  </div>`;
}

/* Escape user-entered name to prevent HTML injection */
function _escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

console.log('✅ cert.js loaded');