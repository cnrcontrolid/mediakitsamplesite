import type { BookMetadata } from './claude'

const GF = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">`

const LOREM1 = `This groundbreaking book takes you on an eye-opening journey through ideas that challenge everything you thought you knew. Drawing on years of research and real-world experience, the author presents a clear, actionable framework that readers from all backgrounds can immediately apply to their own lives. Whether you are a seasoned professional or just beginning your journey, the insights in these pages will fundamentally shift the way you think and act.`

const LOREM2 = `Every chapter is packed with compelling stories, surprising data, and practical tools that make complex concepts feel approachable and exciting. You will discover why conventional wisdom so often leads us astray — and what the most successful people do differently. The author weaves together cutting-edge research with timeless principles to deliver a message that is both deeply inspiring and immediately useful.`

const LOREM3 = `By the final page you will have a completely new perspective and a concrete plan for moving forward with confidence. The principles shared here have already transformed thousands of lives around the world, and now it is your turn. This is not just another book — it is a roadmap for lasting change. If you are ready to stop settling and start thriving, this is exactly the book you have been waiting for.`

function cvars(b: BookMetadata) {
  return `:root{--p:${b.primary};--a:${b.accent};--n:${b.neutral};--cta:#0174C7;--cta2:#015fa8;--green:#189850;--green2:#127a3e;--red:#D0021B;--white:#fff;--gray:#F6F6F6;--border:#ddd;--txt:#333;}`
}

const RESET = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:'Raleway',sans-serif;font-weight:400;color:var(--txt);background:#fff}img{max-width:100%;height:auto;display:block}a{text-decoration:none;color:inherit}`

const FOOTER = `<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;border-top:1px solid #ddd;">
  <tr><td style="padding:30px 20px;text-align:center;font-family:'Raleway',sans-serif;font-size:12px;color:#888;line-height:1.9;">
    <p>This is not part of Facebook website or Meta, Inc. This site is not endorsed by Facebook or Meta, Inc in anyway.</p>
    <p>Results may not be typical or expected for every person. No results are guaranteed with the help of this book and systems described in the book. Individual results will vary according to effort, determination hard work and available budget.</p>
    <p style="margin-top:6px;">Designed and Developed by <strong style="color:#333;">The Raymond Aaron Group</strong></p>
    <p style="margin-top:10px;">
      <a href="privacy.html" style="color:var(--cta);">Privacy Policy</a> |
      <a href="terms.html" style="color:var(--cta);">Terms &amp; Conditions</a> |
      <a href="mailto:contact@example.com" style="color:var(--cta);">Contact Author</a>
    </p>
  </td></tr>
</table>`

const COUNTDOWN_SCRIPT = `<script>
(function(){
  function pad(n){return n<10?'0'+n:n}
  var end=new Date();end.setDate(end.getDate()+31);
  function tick(){
    var now=new Date(),diff=end-now;
    if(diff<=0){diff=0}
    var d=Math.floor(diff/86400000),h=Math.floor((diff%86400000)/3600000),
        m=Math.floor((diff%3600000)/60000),s=Math.floor((diff%60000)/1000);
    document.querySelectorAll('.cd-days').forEach(function(el){el.textContent=pad(d)});
    document.querySelectorAll('.cd-hours').forEach(function(el){el.textContent=pad(h)});
    document.querySelectorAll('.cd-mins').forEach(function(el){el.textContent=pad(m)});
    document.querySelectorAll('.cd-secs').forEach(function(el){el.textContent=pad(s)});
  }
  tick();setInterval(tick,1000);
})();
</script>`

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — LANDING PAGE   (matches Landing page.jpg exactly)
// ══════════════════════════════════════════════════════════════════════════════
export function generateLandingPage(b: BookMetadata): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} — Pre-Order</title>
${GF}
<style>
${cvars(b)}
${RESET}
body{background:#fff}

/* ── S1: TOP BAR ── */
.topbar{background:var(--a);padding:10px 16px;text-align:center}
.topbar p{font-family:'Oswald',sans-serif;font-size:32px;line-height:38px;font-weight:600;color:var(--p);letter-spacing:.3px}

/* ── S2: HERO — white bg, cover LEFT, text RIGHT ── */
.hero{background:#fff;padding:60px 40px}
.hero-inner{max-width:960px;margin:0 auto;display:flex;gap:64px;align-items:center}
.hero-cover{flex:0 0 420px;text-align:center}
.hero-cover img.book{width:420px;max-width:100%;filter:drop-shadow(0 10px 30px rgba(0,0,0,.25))}
.hero-cover img.secure{margin:18px auto 0;max-width:220px}
.hero-text{flex:1;min-width:260px}
.hero-title{font-family:'Oswald',sans-serif;font-size:50px;line-height:55px;font-weight:700;color:var(--a);text-transform:uppercase;margin-bottom:10px}
.hero-sub{font-family:'Oswald',sans-serif;font-size:26px;line-height:32px;font-weight:300;color:#333;margin-bottom:12px}
.hero-award{font-family:'Raleway',sans-serif;font-size:13px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.hero-author{font-family:'Raleway',sans-serif;font-size:26px;line-height:32px;font-weight:700;color:#222;margin-bottom:24px}
.btn-cta{display:block;background:var(--cta);color:#fff;font-family:'Oswald',sans-serif;font-size:20px;font-weight:500;text-transform:uppercase;text-align:center;padding:16px 28px;border-radius:4px;border:none;cursor:pointer;transition:background .2s;line-height:1.4}
.btn-cta:hover{background:var(--cta2)}
.btn-cta small{display:block;font-family:'Raleway',sans-serif;font-size:12px;font-weight:400;text-transform:none;letter-spacing:0;margin-top:4px;opacity:.9}
.hero-note{font-family:'Raleway',sans-serif;font-size:13px;color:#888;margin-top:12px;text-align:center}
.trust-row{display:flex;gap:20px;margin-top:20px;align-items:center;flex-wrap:nowrap}
.trust-item{display:inline-flex;flex-direction:row;align-items:center;gap:6px;font-family:'Raleway',sans-serif;font-size:12px;color:#666;white-space:nowrap}
.trust-icon{font-size:16px;line-height:1;display:inline}

/* ── S3: ABOUT THE BOOK — white bg, cover LEFT, text RIGHT ── */
.about-section{background:#fff;padding:60px 40px}
.about-inner{max-width:960px;margin:0 auto;display:flex;gap:64px;align-items:center}
.about-cover{flex:0 0 420px}
.about-cover img{width:420px;max-width:100%;filter:drop-shadow(0 8px 24px rgba(0,0,0,.2))}
.about-text{flex:1;min-width:240px}
.about-title{font-family:'Oswald',sans-serif;font-size:clamp(28px,4vw,55px);line-height:1.1;font-weight:700;color:var(--a);text-transform:uppercase;margin-bottom:8px}
.about-sub{font-family:'Oswald',sans-serif;font-size:clamp(20px,2.8vw,36px);line-height:1.25;font-weight:300;color:#333;margin-bottom:10px}
.foreword{font-family:'Raleway',sans-serif;font-size:14px;color:#555;font-style:italic;margin-bottom:18px;line-height:1.6}
.foreword strong{font-style:normal;font-weight:700;display:block;color:#333;font-size:15px}
.about-body{font-family:'Raleway',sans-serif;font-size:18px;line-height:23px;color:#444;margin-bottom:16px}

/* ── S4: CTA BAND — dark primary bg ── */
.cta-band{background:var(--p);padding:40px 20px;text-align:center}
.cta-band h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;font-weight:400;color:#fff;text-transform:uppercase;margin-bottom:6px}
.cta-band p{font-family:'Raleway',sans-serif;font-size:16px;color:var(--a);font-weight:600;margin-bottom:22px}
.btn-cta-inline{display:inline-block;background:var(--cta);color:#fff;font-family:'Oswald',sans-serif;font-size:20px;font-weight:500;text-transform:uppercase;padding:16px 44px;border-radius:4px;transition:background .2s;text-align:center;line-height:1.4}
.btn-cta-inline:hover{background:var(--cta2)}
.btn-cta-inline small{display:block;font-family:'Raleway',sans-serif;font-size:12px;font-weight:400;text-transform:none;margin-top:4px;opacity:.9}

/* ── S5: ABOUT THE AUTHOR — neutral bg ── */
.author-section{background:var(--n);padding:60px 40px}
.author-inner{max-width:960px;margin:0 auto}
.author-inner>h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;font-weight:400;color:#333;text-transform:uppercase;text-align:center;margin-bottom:4px}
.author-inner>h3{font-family:'Oswald',sans-serif;font-size:28px;line-height:34px;font-weight:600;color:var(--p);text-align:center;margin-bottom:32px}
.author-cols{display:flex;gap:64px;align-items:flex-start}
.author-photo{flex:0 0 400px;text-align:center}
.author-photo .placeholder{width:400px;max-width:100%;aspect-ratio:3/4;background:linear-gradient(145deg,var(--p),color-mix(in srgb,var(--p) 70%,#000));display:flex;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-size:80px;color:var(--a);margin:0 auto 14px;border-radius:4px}
.author-connect{font-family:'Raleway',sans-serif;font-size:13px;color:#666;margin-bottom:10px}
.social-row{display:flex;gap:10px;justify-content:center;margin-top:10px}
.social-icon{width:40px;height:40px;border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}
.author-bio{flex:1;min-width:220px}
.author-bio p{font-family:'Raleway',sans-serif;font-size:18px;line-height:23px;color:#444;margin-bottom:16px}

/* ── S6: TESTIMONIALS — dark primary bg, 3 cards ── */
.testi-section{background:var(--p);padding:60px 20px}
.testi-inner{max-width:900px;margin:0 auto;text-align:center}
.testi-inner h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;color:#fff;text-transform:uppercase;margin-bottom:6px}
.testi-inner .sub{font-family:'Raleway',sans-serif;font-size:16px;color:var(--a);font-weight:600;margin-bottom:28px}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.testi-card{background:rgba(255,255,255,.09);border-radius:6px;padding:22px;text-align:left}
.testi-card p{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.75;color:rgba(255,255,255,.85);font-style:italic;margin-bottom:14px}
.testi-card .tname{font-family:'Oswald',sans-serif;font-size:15px;color:var(--a);font-style:normal;font-weight:500}
.testi-card .tco{font-family:'Raleway',sans-serif;font-size:12px;color:rgba(255,255,255,.45)}

/* ── S7: BOTTOM CTA — white bg, dashed border box ── */
.bottom-cta{background:#fff;padding:60px 40px;text-align:center}
.bottom-cta h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;font-weight:400;color:var(--p);text-transform:uppercase;margin-bottom:6px}
.bottom-cta .sub{font-family:'Raleway',sans-serif;font-size:16px;color:#555;margin-bottom:24px}
.cta-box{max-width:780px;margin:0 auto;border:3px dashed var(--p);border-radius:6px;padding:40px 60px;background:#fff}
.cta-box .inner-label{font-family:'Raleway',sans-serif;font-size:13px;color:var(--p);font-weight:600;margin-bottom:20px;text-transform:uppercase;letter-spacing:.5px}
.countdown{display:flex;justify-content:center;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:flex-start}
.cd-unit{text-align:center}
.cd-num{font-family:'Oswald',sans-serif;font-size:48px;font-weight:700;color:var(--red);line-height:1}
.cd-lbl{font-family:'Raleway',sans-serif;font-size:10px;color:#888;text-transform:uppercase;letter-spacing:1px}
.cd-sep{font-family:'Oswald',sans-serif;font-size:40px;color:var(--red);line-height:1.1}
.cta-box img{max-width:180px;margin:0 auto 16px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.2))}
.price-h1{font-family:'Oswald',sans-serif;font-size:55px;line-height:60px;font-weight:700;color:var(--p);margin-bottom:4px}
.price-note{font-family:'Raleway',sans-serif;font-size:12px;color:#888;margin-bottom:16px}
.cta-tagline{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;color:var(--p);margin-top:18px;font-weight:400}

@media(max-width:780px){
  .hero-inner,.about-inner,.author-cols{flex-direction:column;gap:32px}
  .hero-cover,.about-cover{flex:unset;width:100%}
  .hero-cover img.book,.about-cover img{width:100%;max-width:420px;margin:0 auto}
  .trust-row{flex-wrap:wrap}
  .author-photo{flex:unset;width:100%}
  .author-photo .placeholder{width:100%;max-width:400px;margin:0 auto 14px}
  .testi-grid{grid-template-columns:1fr}
  .cta-box{padding:32px 24px}
  .bottom-cta{padding:40px 20px}
}
</style>
</head>
<body>

<!-- S1: TOP BAR -->
<div class="topbar"><p>Pre-Order Today And Get A Signed Copy Of The Book!</p></div>

<!-- S2: HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-cover">
      <img src="cover.png" alt="${b.title}" class="book">
      <img src="secure-order.png" alt="Secure Order" class="secure">
    </div>
    <div class="hero-text">
      <h1 class="hero-title">${b.title}</h1>
      <p class="hero-sub">${b.subtitle}</p>
      <p class="hero-award">Award Winning Author</p>
      <p class="hero-author">${b.author}</p>
      <a href="order.html" class="btn-cta">Pre-order Your Copy<small>And Get Your Limited Edition Author Signed Book</small></a>
      <p class="hero-note">You will get a personally signed copy of the book ✍</p>
      <div class="trust-row">
        <div class="trust-item"><span class="trust-icon">🛡</span><span>Secure Checkout</span></div>
        <div class="trust-item"><span class="trust-icon">⭐</span><span>Satisfaction Guaranteed</span></div>
        <div class="trust-item"><span class="trust-icon">🔒</span><span>Privacy Protected</span></div>
      </div>
    </div>
  </div>
</section>

<!-- S3: ABOUT THE BOOK -->
<section class="about-section">
  <div class="about-inner">
    <div class="about-cover"><img src="cover.png" alt="${b.title}"></div>
    <div class="about-text">
      <h2 class="about-title">${b.title}</h2>
      <p class="about-sub">${b.subtitle}</p>
      <p class="foreword">Foreword by <strong>Raymond Aaron</strong>New York Times Bestselling Author</p>
      <p class="about-body">${LOREM1}</p>
      <p class="about-body">${LOREM2}</p>
      <p class="about-body">${LOREM3}</p>
    </div>
  </div>
</section>

<!-- S4: CTA BAND -->
<div class="cta-band">
  <h2>Ready To Reserve A Copy For Yourself</h2>
  <p>Get The Limited Edition Author Signed Copy Today</p>
  <a href="order.html" class="btn-cta-inline">Pre-order Your Copy<small>And Get Your Limited Edition Author Signed Book</small></a>
</div>

<!-- S5: ABOUT THE AUTHOR -->
<section class="author-section">
  <div class="author-inner">
    <h2>About The Author</h2>
    <h3>${b.author}</h3>
    <div class="author-cols">
      <div class="author-photo">
        <div class="placeholder">${b.author.charAt(0).toUpperCase()}</div>
        <p class="author-connect">You Can Connect &amp; Engage On...</p>
        <div class="social-row">
          <a href="#" class="social-icon" style="background:#1877F2;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg" width="22" height="22" style="filter:invert(1);" alt="Facebook"></a>
          <a href="#" class="social-icon" style="background:#E1306C;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" width="22" height="22" style="filter:invert(1);" alt="Instagram"></a>
          <a href="#" class="social-icon" style="background:#0A66C2;"><img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" width="22" height="22" style="filter:invert(1);" alt="LinkedIn"></a>
        </div>
      </div>
      <div class="author-bio">
        <p>${LOREM1}</p>
        <p>${LOREM2}</p>
        <p>${LOREM3}</p>
      </div>
    </div>
  </div>
</section>

<!-- S6: TESTIMONIALS -->
<section class="testi-section">
  <div class="testi-inner">
    <h2>Testimonials For The Book</h2>
    <p class="sub">The Readers Love It!</p>
    <div class="testi-grid">
      <div class="testi-card">
        <p>${LOREM1.slice(0, 150)}…</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
      <div class="testi-card">
        <p>${LOREM2.slice(0, 150)}…</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
      <div class="testi-card">
        <p>${LOREM3.slice(0, 150)}…</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
    </div>
  </div>
</section>

<!-- S7: BOTTOM CTA / PRE-ORDER BOX -->
<section class="bottom-cta">
  <h2>Get Your Copy Today</h2>
  <p class="sub">This Is Truly A Limited Offer, So Pre-Order Your Copy Of The Book</p>
  <div class="cta-box">
    <p class="inner-label">Let Me Show You Everything You Will Get When You Order Your Copy Of</p>
    <div class="countdown">
      <div class="cd-unit"><div class="cd-num cd-days">31</div><div class="cd-lbl">Days</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num cd-hours">00</div><div class="cd-lbl">Hours</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num cd-mins">15</div><div class="cd-lbl">Minutes</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num cd-secs">34</div><div class="cd-lbl">Seconds</div></div>
    </div>
    <img src="cover.png" alt="${b.title}">
    <p class="price-h1">Pre-Launch Offer &nbsp;$ 19.99</p>
    <p class="price-note">Shipping &amp; Handling Fees Will Be Free If You Pre-Order Before The Timer Runs Out!</p>
    <a href="order.html" class="btn-cta-inline" style="display:block;">Pre-order Your Copy<small>And Get Your Limited Edition Author Signed Book</small></a>
    <p class="cta-tagline">Pre-order Your Copy Today<br>And Get Your Own Signed Copy Of The Book</p>
  </div>
</section>

${FOOTER}
${COUNTDOWN_SCRIPT}
</body>
</html>`
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — ORDER FORM   (matches Order form page.jpg exactly)
// ══════════════════════════════════════════════════════════════════════════════
export function generateOrderPage(b: BookMetadata): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} — Complete Your Order</title>
${GF}
<style>
${cvars(b)}
${RESET}
body{background:#f0f0f0}

/* ── HEADER ── dark primary bg, title + subtitle centered, then 2-col bottom row */
.order-header{background:var(--p);padding:24px 24px 20px}
.oh-inner{max-width:920px;margin:0 auto}
.oh-top{text-align:center;padding-bottom:16px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,.12)}
.oh-top h1{font-family:'Oswald',sans-serif;font-size:clamp(16px,3vw,48px);line-height:1.15;font-weight:600;color:var(--a);text-transform:uppercase;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.oh-top h2{font-family:'Oswald',sans-serif;font-size:clamp(14px,1.8vw,26px);line-height:1.3;font-weight:400;color:#fff}
.oh-bottom{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px}
.oh-bottom .complete{font-family:'Raleway',sans-serif;font-size:18px;font-weight:700;color:var(--a)}
.oh-bottom .help{font-family:'Raleway',sans-serif;font-size:13px;color:rgba(255,255,255,.75);text-align:right;line-height:1.6}
.oh-bottom .help a{color:var(--a)}

/* ── BODY GRID: form LEFT, promo RIGHT ── */
.order-wrap{max-width:920px;margin:28px auto;padding:0 20px 48px;display:flex;gap:40px;align-items:flex-start;flex-wrap:wrap}

/* ── FORM CARD ── */
.form-card{flex:1;min-width:300px;background:#fff;border-radius:6px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.10)}
.step-header{background:var(--a);color:#fff;font-family:'Raleway',sans-serif;font-size:15px;font-weight:600;padding:14px 20px;text-align:center;letter-spacing:.3px}
.form-section{padding:20px 20px 8px}
.field{margin-bottom:14px}
.field input,.field select{width:100%;padding:13px 15px;font-family:'Raleway',sans-serif;font-size:14px;color:#333;border:1px solid #ccc;border-radius:4px;background:#fff;outline:none;transition:border-color .15s}
.field input:focus,.field select:focus{border-color:var(--a)}
.field input::placeholder{color:#aaa}

/* Payment */
.payment-section{padding:0 20px 20px}
.payment-option{border:1px solid #ddd;border-radius:4px;padding:14px 16px;margin-bottom:10px}
.radio-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-family:'Raleway',sans-serif;font-size:14px;color:#333;font-weight:600}
.radio-row input[type=radio]{accent-color:var(--a);width:16px;height:16px;flex-shrink:0}
.card-logos{display:flex;gap:5px;align-items:center;margin-left:auto;flex-wrap:wrap}
.card-logo{height:24px;padding:2px 6px;border:1px solid #ddd;border-radius:3px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff;min-width:32px}
.card-fields{margin-top:8px}
.card-fields input{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:4px;font-family:'Raleway',sans-serif;font-size:14px;color:#333;margin-bottom:8px;background:#fff}
.card-fields input::placeholder{color:#bbb}
.card-row{display:flex;gap:10px}
.card-row input{flex:1}
.mollie-note{font-family:'Raleway',sans-serif;font-size:11px;color:#aaa;margin-top:4px}

.btn-confirm{display:block;width:100%;background:var(--green);color:#fff;font-family:'Raleway',sans-serif;font-size:18px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:18px;border:none;cursor:pointer;text-align:center;text-decoration:none;transition:background .2s}
.btn-confirm:hover{background:var(--green2)}

.trust-badges{display:flex;justify-content:center;gap:24px;padding:16px 20px;border-top:1px solid #eee;flex-wrap:wrap}
.badge{display:flex;align-items:center;gap:8px;font-family:'Raleway',sans-serif;font-size:12px;color:#888}

/* ── RIGHT PROMO ── */
.promo-col{flex:0 0 280px;padding-top:8px}
.promo-countdown{text-align:center;margin-bottom:18px}
.promo-cd-row{display:flex;justify-content:center;gap:4px;align-items:flex-start}
.cd-block{text-align:center}
.cd-block .num{font-family:'Oswald',sans-serif;font-size:42px;font-weight:700;color:var(--red);line-height:1}
.cd-block .lbl{font-family:'Raleway',sans-serif;font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.8px}
.cd-colon{font-family:'Oswald',sans-serif;font-size:34px;color:var(--red);line-height:1.1;padding-top:3px}
.promo-col img{width:100%;max-width:260px;display:block;margin:0 auto 12px;filter:drop-shadow(0 6px 18px rgba(0,0,0,.2))}
.signed{font-family:'Raleway',sans-serif;font-size:15px;color:var(--a);text-align:center;font-weight:700}

@media(max-width:700px){
  .order-wrap{flex-direction:column}
  .promo-col{flex:unset;width:100%;order:-1}
  .oh-bottom{flex-direction:column;text-align:center}
  .oh-bottom .help{text-align:center}
}
</style>
</head>
<body>

<!-- HEADER -->
<div class="order-header">
  <div class="oh-inner">
    <div class="oh-top">
      <h1>${b.title}</h1>
      <h2>${b.subtitle}</h2>
    </div>
    <div class="oh-bottom">
      <span class="complete">Complete your order</span>
      <span class="help">Do you need some help? Send me an email<br>to <a href="mailto:support@example.com">exemple@gmail.com</a></span>
    </div>
  </div>
</div>

<!-- BODY -->
<div class="order-wrap">

  <!-- LEFT: FORM -->
  <div class="form-card">

    <div class="step-header">---- Step #1: Contact information ----</div>
    <div class="form-section">
      <div class="field"><input type="text" placeholder="Enter Your First name"></div>
      <div class="field"><input type="text" placeholder="Enter Your Last name"></div>
      <div class="field"><input type="email" placeholder="Enter Your Email Address"></div>
      <div class="field"><input type="text" placeholder="Enter Full Shipping Address"></div>
      <div class="field"><input type="text" placeholder="Enter Your City"></div>
      <div class="field"><input type="text" placeholder="Enter Your Zip code"></div>
      <div class="field">
        <select>
          <option>Vietnam</option>
          <option>Canada</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>New Zealand</option>
          <option>Other</option>
        </select>
      </div>
    </div>

    <div class="step-header">--- Step #2: Payment Information ---</div>
    <div class="payment-section" style="padding-top:20px;">

      <!-- Credit card -->
      <div class="payment-option">
        <div class="radio-row">
          <input type="radio" name="pay" checked>
          <span>Credit or debit card</span>
          <div class="card-logos">
            <div class="card-logo" style="background:#1A1F71;">VISA</div>
            <div class="card-logo" style="background:#EB001B;">MC</div>
            <div class="card-logo" style="background:#2E77BC;">AMEX</div>
            <div class="card-logo" style="background:#FF6600;">DISC</div>
          </div>
        </div>
        <div class="card-fields">
          <input type="text" placeholder="1234 1234 1234 1234">
          <div class="card-row">
            <input type="text" placeholder="MM / YY">
            <input type="text" placeholder="CVC">
          </div>
        </div>
      </div>

      <!-- Mollie -->
      <div class="payment-option">
        <div class="radio-row">
          <input type="radio" name="pay">
          <span>Mollie</span>
          <div class="card-logos" style="margin-left:auto;">
            <span style="font-family:'Raleway',sans-serif;font-size:11px;color:#aaa;margin-right:4px;">🔒 Secure payments powered by <strong>mollie</strong></span>
            <div class="card-logo" style="background:#EB001B;">MC</div>
            <div class="card-logo" style="background:#1A1F71;">VISA</div>
            <div class="card-logo" style="background:#2E77BC;">AMEX</div>
            <div class="card-logo" style="background:#003087;">PP</div>
          </div>
        </div>
      </div>

      <a href="confirmation.html" class="btn-confirm">CONFIRM MY ORDER</a>

      <div class="trust-badges">
        <div class="badge">🛡 <span>Secure<br>Checkout</span></div>
        <div class="badge">⭐ <span>Satisfaction<br>Guarantee</span></div>
        <div class="badge">🔒 <span>Privacy<br>Protected</span></div>
      </div>
    </div>

  </div><!-- /form-card -->

  <!-- RIGHT: PROMO -->
  <div class="promo-col">
    <div class="promo-countdown">
      <div class="promo-cd-row">
        <div class="cd-block"><div class="num cd-days">31</div><div class="lbl">DAYS</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num cd-hours">00</div><div class="lbl">HOURS</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num cd-mins">15</div><div class="lbl">MINUTES</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num cd-secs">01</div><div class="lbl">SECONDS</div></div>
      </div>
    </div>
    <img src="cover.png" alt="${b.title}">
    <p class="signed">Get Your Signed Copy Today</p>
  </div>

</div><!-- /order-wrap -->

${FOOTER}
${COUNTDOWN_SCRIPT}
</body>
</html>`
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — CONFIRMATION   (matches Confirmation page.jpg exactly)
// ══════════════════════════════════════════════════════════════════════════════
export function generateConfirmationPage(b: BookMetadata): string {
  const surveyOptions = [
    'Standing Strong in Chaos',
    'Listening to Your Body',
    'Finding Inner Peace',
    'Practical Grounding Tips',
    'All of the above',
  ]

  const surveyHTML = surveyOptions.map(opt => `
      <label style="display:flex;align-items:center;justify-content:space-between;background:#f0f2f5;border-radius:50px;padding:14px 20px;margin-bottom:10px;cursor:pointer;transition:background .15s;"
             onmouseover="this.style.background='#e4e6ea'"
             onmouseout="this.style.background='#f0f2f5'">
        <span style="font-family:'Raleway',sans-serif;font-size:15px;color:#444;">${opt}</span>
        <input type="radio" name="survey" style="width:22px;height:22px;accent-color:var(--a);flex-shrink:0;cursor:pointer;">
      </label>`).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} — Order Confirmed</title>
${GF}
<style>
${cvars(b)}
${RESET}
body{background:#fff}

/* ── S1: HEADER — dark primary bg, yellow H1, white H2 ── */
.confirm-header{background:var(--p);padding:50px 40px 44px;text-align:center}
.confirm-header h1{font-family:'Oswald',sans-serif;font-size:60px;line-height:66px;font-weight:700;color:#FFE600;margin-bottom:12px}
.confirm-header h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;font-weight:600;color:#fff;margin-bottom:16px}
.confirm-header p{font-family:'Raleway',sans-serif;font-size:18px;line-height:23px;color:rgba(255,255,255,.80);max-width:900px;margin:0 auto 8px}
.confirm-header em{font-style:italic;color:rgba(255,255,255,.65);display:block;margin-top:4px}

/* ── S2: BODY — white bg, cover LEFT, thank you RIGHT ── */
.confirm-body{max-width:960px;margin:0 auto;padding:60px 40px 60px;display:flex;gap:60px;align-items:flex-start}
.confirm-cover{flex:0 0 380px}
.confirm-cover img{width:380px;max-width:100%;filter:drop-shadow(0 8px 24px rgba(0,0,0,.18))}
.confirm-right{flex:1;min-width:260px}
.confirm-right h2{font-family:'Oswald',sans-serif;font-size:40px;line-height:45px;font-weight:400;color:#333;margin-bottom:16px}
.confirm-right p{font-family:'Raleway',sans-serif;font-size:18px;line-height:23px;color:#555;margin-bottom:16px}
.survey-title{font-family:'Oswald',sans-serif;font-size:20px;line-height:26px;font-weight:500;color:var(--a);margin:20px 0 14px}
.survey-form{max-width:520px}
@media(max-width:780px){
  .confirm-body{flex-direction:column;padding:40px 20px}
  .confirm-cover{flex:unset;width:100%;max-width:380px}
  .confirm-cover img{width:100%}
}

</style>
</head>
<body>

<!-- S1: HEADER -->
<div class="confirm-header">
  <h1>Order Confirmed&#x1F44D;&#x1F3FC;</h1>
  <h2>Congrats! Your Book Is On The Way</h2>
  <p>You Will Receive Your Signed Copy Of The Book Once The Book Is Published, Thank you for your support.</p>
  <em>(International Shipping Might Take A Bit Longer)</em>
</div>

<!-- S2: BODY -->
<div class="confirm-body">
  <div class="confirm-cover">
    <img src="cover.png" alt="${b.title}">
  </div>
  <div class="confirm-right">
    <h2>Thank you!</h2>
    <p>I will personally sign and send you a copy. Now, please answer the below question which will help me customize the book to you.</p>
    <p class="survey-title">What Are You Most Looking Forward To In The Book?</p>
    <form class="survey-form">
      ${surveyHTML}
    </form>
  </div>
</div>

${FOOTER}
</body>
</html>`
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — TERMS & CONDITIONS   (matches Terms & Condition page.jpg exactly)
// ══════════════════════════════════════════════════════════════════════════════
export function generateTermsPage(b: BookMetadata): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} — Terms &amp; Conditions</title>
${GF}
<style>
${cvars(b)}
${RESET}
body{background:#fff}
/* Top bar */
.legal-topbar{background:var(--p);padding:0;margin:0}
.legal-topbar-inner{max-width:960px;margin:0 auto;padding:36px 40px}
.legal-topbar-inner h1{font-family:'Oswald',sans-serif;font-size:56px;line-height:62px;font-weight:700;color:#fff;text-transform:uppercase}
/* Page layout */
.legal-page{max-width:960px;margin:0 auto;padding:40px 40px 60px;display:flex;gap:48px;align-items:flex-start}
.legal-main{flex:1;min-width:0}
.legal-main .updated{font-family:'Raleway',sans-serif;font-size:13px;color:#777;font-style:italic;margin-bottom:6px}
.legal-main .please{font-family:'Raleway',sans-serif;font-size:14px;color:#555;margin-bottom:24px}
/* H2 — article headings: large Raleway */
.legal-main h2{font-family:'Raleway',sans-serif;font-size:26px;line-height:34px;font-weight:700;color:#1a1a2e;margin:28px 0 8px}
/* H3 — sub-article */
.legal-main h3{font-family:'Raleway',sans-serif;font-size:16px;font-weight:700;color:#1a1a2e;margin:16px 0 6px 16px}
.legal-main p{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:10px}
.legal-main blockquote{border-left:3px solid #ddd;padding:4px 0 4px 16px;margin:8px 0 8px 16px}
.legal-main blockquote p{color:#555}
/* Sidebar */
.legal-sidebar{flex:0 0 200px}
.sidebar-box{margin-bottom:24px}
.sidebar-head{font-family:'Raleway',sans-serif;font-size:12px;font-weight:700;color:#2e7d5e;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.sidebar-body{font-family:'Raleway',sans-serif;font-size:13px;line-height:1.7;color:#555}
@media(max-width:700px){.legal-page{flex-direction:column}.legal-sidebar{flex:unset;width:100%}}
</style>
</head>
<body>

<div class="legal-topbar">
  <div class="legal-topbar-inner">
    <h1>Terms and Conditions</h1>
  </div>
</div>

<div class="legal-page">
  <div class="legal-main">
    <p class="updated">Our Terms and Conditions were last updated on Jan 31st 2026.</p>
    <p class="please">Please read them carefully before using Our Service.</p>

    <h2>Article 1: General</h2>
    <p>By using the Site, you agree to be bound by these Terms and Conditions and to use the Site in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from <em>[Company]</em>.</p>
    <p>Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.</p>
    <h3>Article 1a: Age limit</h3>
    <blockquote>
      <p>Age restrictions apply. <em>[Company]</em> does not permit those under 18 to use the Service. We do our best to restrict access to our sites, products and services to minors. Even if the content of our products and services is not of a shocking nature, we prefer to target a mature audience capable of understanding the implications and responsibilities of the business world.</p>
      <p>Any subscriber who does not meet these criteria will be deleted from our database as soon as this is brought to our attention. Likewise, any customer who does not meet these criteria will be reimbursed immediately and a return of the product(s) concerned will be required.</p>
    </blockquote>

    <h2>Article 2: Placing Order</h2>
    <p>By placing an Order for Products through the Service, you warrant that you are legally capable of entering into binding contracts.</p>

    <h2>Article 3: Price</h2>
    <p>The prices are indicated in dollars, excluding the shipping and processing of your order. The price of items can be changed at any time. However, the price applied to an order will be the one stated at the time of the order.</p>

    <h2>Article 4: Your information</h2>
    <p>If You wish to place an Order for Products available on the Service, you may be asked to supply certain information relevant to your Order including, without limitation, your name, your email, your phone number, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
    <p>You represent and warrant that: (i) You have the legal right to use any credit or debit card(s) or any other payment method(s) in connection with any Order; and that (ii) the information you supply to us is true, correct and complete.</p>
    <p>By submitting such information, you grant us the right to provide the information to payment processing third parties for purposes of facilitating the completion of your order.</p>

    <h2>Article 5: Payment</h2>
    <p>Payment is due immediately on the date of the order; this includes pre-order products.</p>
    <p>Payment can be made through any of the payment methods we have available, such as Visa, MasterCard, Affinity Card, American Express cards or online payment methods (PayPal, for example).</p>
    <p>Payment cards (credit cards or debit cards) are subject to validation checks and authorization by your card issuer. If we do not receive the required authorization, we will not be liable for any delay or non-delivery of your order.</p>

    <h2>Article 6: Delivery</h2>
    <p>Delivery is made to the address you specified when placing your order (therefore, pay particular attention to the spelling of the address you enter and especially the postal code).</p>
    <p>The risks will be your responsibility from the date on which the ordered products have left our premises. However, in the event of a lost package, we will do everything necessary so that you still receive your product or that you are reimbursed according to your warranty.</p>

    <h2>Article 7: Changes to these Terms and Conditions</h2>
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days&#39; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>

    <h2>Article 8: Company information</h2>
    <p><em>[Company]</em></p>
    <p><em>[Company]</em><br><em>[Contact Info]</em></p>
  </div>

  <div class="legal-sidebar">
    <div class="sidebar-box">
      <div class="sidebar-head">Hello</div>
      <div class="sidebar-body">Welcome to our Terms and Conditions! These boxes aren&#39;t legally binding, you can use them as an aid for understanding the legal language.</div>
    </div>
  </div>
</div>

${FOOTER}
</body>
</html>`
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 5 — PRIVACY POLICY   (matches Privacy Policy page.jpg exactly)
// ══════════════════════════════════════════════════════════════════════════════
export function generatePrivacyPage(b: BookMetadata): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${b.title} — Privacy Policy</title>
${GF}
<style>
${cvars(b)}
${RESET}
body{background:#fff}
/* Top bar */
.legal-topbar{background:var(--p);padding:0;margin:0}
.legal-topbar-inner{max-width:960px;margin:0 auto;padding:18px 20px}
.legal-topbar-inner h1{font-family:'Raleway',sans-serif;font-size:36px;line-height:44px;font-weight:800;color:#fff}
/* Page layout */
.legal-page{max-width:960px;margin:0 auto;padding:40px 40px 60px;display:flex;gap:48px;align-items:flex-start}
.legal-main{flex:1;min-width:0}
.legal-main .updated{font-family:'Raleway',sans-serif;font-size:13px;color:#777;font-style:italic;margin-bottom:6px}
.legal-main .intro{font-family:'Raleway',sans-serif;font-size:14px;color:#555;margin-bottom:24px;line-height:1.7}
.legal-main h2{font-family:'Raleway',sans-serif;font-size:26px;line-height:34px;font-weight:700;color:#1a1a2e;margin:28px 0 8px}
.legal-main p{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:10px}
.legal-main ul{padding-left:20px;margin-bottom:12px}
.legal-main ul li{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:6px}
.legal-main ul li::marker{color:#2e7d5e}
.check-list{list-style:none;padding-left:0}
.check-list li{display:flex;gap:8px;align-items:flex-start;margin-bottom:8px}
.check-list li::before{content:"✓";color:#2e7d5e;font-weight:700;flex-shrink:0;margin-top:2px}
/* Sidebar */
.legal-sidebar{flex:0 0 200px}
.sidebar-box{margin-bottom:28px}
.sidebar-head{font-family:'Raleway',sans-serif;font-size:12px;font-weight:700;color:#2e7d5e;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.sidebar-body{font-family:'Raleway',sans-serif;font-size:13px;line-height:1.7;color:#555}
@media(max-width:700px){.legal-page{flex-direction:column}.legal-sidebar{flex:unset;width:100%}}
</style>
</head>
<body>

<div class="legal-topbar">
  <div class="legal-topbar-inner">
    <h1>Privacy Policy</h1>
  </div>
</div>

<div class="legal-page">
  <div class="legal-main">
    <p class="updated">Our Privacy Policy was last updated on Jan 31st 2026.</p>
    <p class="intro">This Privacy Policy governs the manner in which the website collects, uses, maintains and discloses information collected from users (each, a &#39;User&#39;) of the website (&#39;Site&#39;). This privacy policy applies to the Site and all products and services offered by <em>[Company]</em>.</p>

    <h2>Personal identification information</h2>
    <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our Site, register on the Site, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, where appropriate, an email address. Users may, however, visit our Site anonymously.</p>
    <p>We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information; however, it may prevent them from engaging in certain Site related activities.</p>

    <h2>Non-personal identification information</h2>
    <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users&#39; means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>

    <h2>Web browser cookies</h2>
    <p>Our Site may use &#39;cookies&#39; to enhance User experience. User&#39;s web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browser to refuse cookies or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>

    <h2>How we use collected information</h2>
    <p><em>[Company]</em> may collect and use Users&#39; personal information for the following purposes:</p>
    <ul class="check-list">
      <li><span><strong>To improve customer service</strong><br>Information you provide helps us respond to your customer service requests and support needs more efficiently.</span></li>
      <li><span><strong>To personalize user experience</strong><br>We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</span></li>
      <li><span><strong>To send periodic emails</strong><br>We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc.</span></li>
    </ul>

    <h2>How we protect your information</h2>
    <p>We adopt appropriate data collection, storage and processing practices, and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

    <h2>Sharing your personal information</h2>
    <p>We do not sell, trade, or rent Users&#39; personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>

    <h2>Third party websites</h2>
    <p>Users may find advertising or other content on our Site that links to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites that have a link to our Site, is subject to that website&#39;s own terms and policies.</p>

    <h2>Changes to this privacy policy</h2>
    <p><em>[COMPANY]</em> has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

    <h2>Your acceptance of these terms</h2>
    <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
  </div>

  <div class="legal-sidebar">
    <div class="sidebar-box">
      <div class="sidebar-head">Hi There</div>
      <div class="sidebar-body">Welcome to our Privacy Policy! These boxes aren&#39;t legally binding, you can use them as an aid for understanding the legal language.</div>
    </div>
    <div class="sidebar-box">
      <div class="sidebar-head">Definitions</div>
      <div class="sidebar-body">&#39;Personal Information&#39; is information someone can use to identify you.</div>
    </div>
  </div>
</div>

${FOOTER}
</body>
</html>`
}
