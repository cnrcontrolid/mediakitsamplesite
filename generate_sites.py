#!/usr/bin/env python3
"""
Rebuild all 25 sales funnel pages — faithful pixel-level replication of the
systeme.io reference pages. Only --primary / --accent / --neutral swap per book.
"""
import os

BASE  = os.path.dirname(os.path.abspath(__file__))
SITES = os.path.join(BASE, "sites")

# ─── Book data ────────────────────────────────────────────────────────────────
BOOKS = [
    { "folder":"book-01-heartbeat",        "title":"Heartbeat",
      "subtitle":"Awaken Your Love, Lose the Weight and Reclaim Your Freedom",
      "author":"Peter Wainberg",
      "primary":"#1C0508", "accent":"#E8003D", "neutral":"#FAF5EE",
      "survey":["Improving My Relationship with Food","Reconnecting with Love and Purpose",
                "Managing Stress and Emotions","Building Sustainable Healthy Habits","All of the Above"] },
    { "folder":"book-02-procrastination",  "title":"The Book on Procrastination",
      "subtitle":"Understand Resistance, Feel Your Fear and Take Action Anyway",
      "author":"Keltie Harris",
      "primary":"#041818", "accent":"#0b8f8f", "neutral":"#E8F5F5",
      "survey":["Understanding Why I Procrastinate","Overcoming Fear of Failure",
                "Taking Consistent Daily Action","Building Better Focus Habits","All of the Above"] },
    { "folder":"book-03-half-island-life", "title":"A Half Island Life",
      "subtitle":"How to Learn Mandarin and Live in China",
      "author":"Thomas S. Shannon",
      "primary":"#120820", "accent":"#C0392B", "neutral":"#F5F0FA",
      "survey":["Learning Mandarin Effectively","Understanding Chinese Culture",
                "Practical Tips for Living Abroad","Building Meaningful Connections","All of the Above"] },
    { "folder":"book-04-half-the-distance","title":"Half the Distance, Twice the Triumph",
      "subtitle":"Mindset, Training and Motivation for Your First Half Marathon",
      "author":"Len Legotte",
      "primary":"#060D18", "accent":"#FF2D78", "neutral":"#E8EDF5",
      "survey":["Training Plans and Weekly Schedules","Building Mental Toughness",
                "Injury Prevention and Recovery","Race Day Strategy and Preparation","All of the Above"] },
    { "folder":"book-05-dog-training",     "title":"More Than Dog Training",
      "subtitle":"What Families and Their Canine Companions Really Need to Thrive Together",
      "author":"Sarah Wilkinson",
      "primary":"#080808", "accent":"#00C8C0", "neutral":"#F0F0F0",
      "survey":["Building a Stronger Bond with My Dog","Solving Behaviour Challenges",
                "Family-Friendly Training Methods","Understanding Canine Communication","All of the Above"] },
]

LOREM = ("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
         "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
         "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure "
         "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.")

LOREM2 = ("Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque "
          "laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi "
          "architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas "
          "sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.")

GF = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      '<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700'
      '&family=Raleway:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400'
      '&family=Actor&display=swap" rel="stylesheet">')

def cvars(b):
    return (f":root{{"
            f"--p:{b['primary']};--a:{b['accent']};--n:{b['neutral']};"
            f"--cta:#0174C7;--cta2:#015fa8;--green:#189850;--green2:#127a3e;"
            f"--red:#D0021B;--white:#fff;--gray:#F6F6F6;--border:#ddd;"
            f"--txt:#333;--light-txt:rgba(255,255,255,0.80);}}")

RESET = """
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Raleway',sans-serif;font-weight:400;color:var(--txt);background:#fff}
img{max-width:100%;height:auto;display:block}
a{text-decoration:none;color:inherit}
"""

FOOTER_HTML = """
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;border-top:1px solid #ddd;">
  <tr><td style="padding:30px 20px;text-align:center;font-family:'Raleway',sans-serif;font-size:12px;color:#888;line-height:1.9;">
    <p>This is not part of Facebook website or Meta, Inc. This site is not endorsed by Facebook or Meta, Inc in anyway.</p>
    <p>Results may not be typical or expected for every person. No results are guaranteed with the help of this book and systems described in the book. Individual results will vary according to effort, determination hard work and available budget.</p>
    <p style="margin-top:6px;">Designed and Developed by <strong style="color:#333;">The Raymond Aaron Group</strong></p>
    <p style="margin-top:10px;">
      <a href="privacy.html"  style="color:var(--cta);">Privacy Policy</a> |
      <a href="terms.html"    style="color:var(--cta);">Terms &amp; Conditions</a> |
      <a href="mailto:contact@example.com" style="color:var(--cta);">Contact Author</a>
    </p>
  </td></tr>
</table>"""

# ══════════════════════════════════════════════════════════════════════════════
# PAGE 1 — LANDING PAGE
# ══════════════════════════════════════════════════════════════════════════════
def landing(b):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{b['title']} — Pre-Order</title>
{GF}
<style>
{cvars(b)}
{RESET}
body{{background:var(--gray)}}

/* ── TOP BAR ── */
.topbar{{background:var(--p);padding:10px 16px;text-align:center;border-bottom:1px solid rgba(255,255,255,.1)}}
.topbar p{{font-family:'Raleway',sans-serif;font-size:13px;color:var(--a);font-weight:600;letter-spacing:.5px}}

/* ── HERO ── */
.hero{{background:var(--p);padding:40px 20px}}
.hero-inner{{max-width:820px;margin:0 auto;display:flex;gap:32px;align-items:center;flex-wrap:wrap}}
.hero-cover{{flex:0 0 340px}}
.hero-cover img{{width:100%;filter:drop-shadow(0 10px 30px rgba(0,0,0,.5))}}
.hero-text{{flex:1;min-width:260px}}
.hero-title{{font-family:'Oswald',sans-serif;font-size:clamp(28px,5vw,44px);font-weight:700;
             color:var(--a);line-height:1.1;margin-bottom:8px;text-transform:uppercase}}
.hero-sub{{font-family:'Raleway',sans-serif;font-size:16px;color:#fff;margin-bottom:6px}}
.hero-award{{font-family:'Raleway',sans-serif;font-size:12px;color:rgba(255,255,255,.65);
             text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}}
.hero-author{{font-family:'Raleway',sans-serif;font-size:20px;font-weight:700;color:#fff;margin-bottom:24px}}
.btn-cta{{display:block;background:var(--cta);color:#fff;font-family:'Oswald',sans-serif;
          font-size:18px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;
          text-align:center;padding:16px 24px;border-radius:4px;border:none;cursor:pointer;
          transition:background .2s;line-height:1.3}}
.btn-cta:hover{{background:var(--cta2)}}
.btn-cta small{{display:block;font-family:'Raleway',sans-serif;font-size:11px;
                font-weight:400;text-transform:none;letter-spacing:0;margin-top:3px;opacity:.85}}
.hero-note{{font-family:'Raleway',sans-serif;font-size:13px;color:rgba(255,255,255,.60);margin-top:10px}}
.trust-row{{display:flex;gap:20px;margin-top:20px;flex-wrap:wrap}}
.trust-item{{display:flex;align-items:center;gap:7px;font-family:'Raleway',sans-serif;
             font-size:12px;color:rgba(255,255,255,.55)}}
.trust-icon{{font-size:20px}}

/* ── ABOUT SECTION ── */
.about-section{{background:#fff;padding:48px 20px}}
.about-inner{{max-width:820px;margin:0 auto;display:flex;gap:36px;align-items:flex-start;flex-wrap:wrap}}
.about-cover{{flex:0 0 300px}}
.about-cover img{{width:100%;filter:drop-shadow(0 8px 20px rgba(0,0,0,.25))}}
.about-text{{flex:1;min-width:240px}}
.about-title{{font-family:'Oswald',sans-serif;font-size:clamp(24px,4vw,36px);font-weight:600;
              color:var(--a);line-height:1.1;text-transform:uppercase;margin-bottom:6px}}
.about-sub{{font-family:'Raleway',sans-serif;font-size:16px;color:#333;margin-bottom:4px}}
.foreword-credit{{font-family:'Raleway',sans-serif;font-size:13px;color:#777;
                  font-style:italic;margin-bottom:16px}}
.about-body{{font-family:'Raleway',sans-serif;font-size:15px;line-height:1.85;color:#444;margin-bottom:14px}}

/* ── CTA BAND ── */
.cta-band{{background:var(--p);padding:32px 20px;text-align:center}}
.cta-band h2{{font-family:'Oswald',sans-serif;font-size:clamp(22px,4vw,32px);font-weight:400;
              color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}}
.cta-band p{{font-family:'Raleway',sans-serif;font-size:14px;color:var(--a);margin-bottom:18px}}
.btn-cta-inline{{display:inline-block;background:var(--cta);color:#fff;
                 font-family:'Oswald',sans-serif;font-size:18px;font-weight:500;
                 text-transform:uppercase;padding:15px 40px;border-radius:4px;
                 transition:background .2s;line-height:1.3}}
.btn-cta-inline:hover{{background:var(--cta2)}}
.btn-cta-inline small{{display:block;font-family:'Raleway',sans-serif;font-size:11px;
                        font-weight:400;text-transform:none;margin-top:3px;opacity:.85}}

/* ── AUTHOR SECTION ── */
.author-section{{background:var(--n);padding:48px 20px}}
.author-inner{{max-width:820px;margin:0 auto}}
.author-inner h2{{font-family:'Oswald',sans-serif;font-size:26px;font-weight:400;
                  text-transform:uppercase;letter-spacing:1px;color:#333;
                  text-align:center;margin-bottom:4px}}
.author-inner h3{{font-family:'Oswald',sans-serif;font-size:20px;color:var(--p);
                  text-align:center;margin-bottom:24px}}
.author-cols{{display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap}}
.author-photo{{flex:0 0 200px;text-align:center}}
.author-photo .circle{{width:180px;height:180px;border-radius:50%;background:var(--p);
                        margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
                        font-family:'Oswald',sans-serif;font-size:72px;color:var(--a)}}
.author-photo p{{font-family:'Raleway',sans-serif;font-size:13px;color:#666}}
.social-row{{display:flex;gap:12px;justify-content:center;margin-top:10px}}
.social-btn{{width:36px;height:36px;border-radius:4px;display:flex;align-items:center;
             justify-content:center;font-size:18px;font-weight:700;color:#fff}}
.author-bio-text{{flex:1;min-width:220px}}
.author-bio-text p{{font-family:'Raleway',sans-serif;font-size:15px;line-height:1.85;
                     color:#444;margin-bottom:12px}}

/* ── TESTIMONIALS ── */
.testi-section{{background:#fff;padding:48px 20px}}
.testi-inner{{max-width:820px;margin:0 auto;text-align:center}}
.testi-inner h2{{font-family:'Oswald',sans-serif;font-size:26px;font-weight:400;
                 text-transform:uppercase;letter-spacing:1px;color:#333;margin-bottom:4px}}
.testi-inner .sub{{font-family:'Raleway',sans-serif;font-size:14px;font-style:italic;
                    color:var(--a);margin-bottom:28px}}
.testi-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}}
.testi-card{{background:var(--n);border-radius:4px;padding:20px;text-align:left}}
.testi-card p{{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.75;color:#555;
               font-style:italic;margin-bottom:14px}}
.testi-card .tname{{font-family:'Oswald',sans-serif;font-size:14px;color:#333;
                     font-style:normal;font-weight:500}}
.testi-card .tco{{font-family:'Raleway',sans-serif;font-size:12px;color:#999}}

/* ── BOTTOM CTA ── */
.bottom-cta{{background:var(--p);padding:48px 20px;text-align:center}}
.bottom-cta h2{{font-family:'Oswald',sans-serif;font-size:clamp(22px,4vw,30px);font-weight:400;
                color:#fff;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}}
.bottom-cta .sub{{font-family:'Raleway',sans-serif;font-size:14px;color:var(--a);margin-bottom:24px}}
.cta-box{{max-width:540px;margin:0 auto;background:rgba(255,255,255,.05);
           border:1px solid rgba(255,255,255,.15);border-radius:6px;padding:28px 24px}}
.cta-box .countdown{{display:flex;justify-content:center;gap:8px;margin-bottom:20px;flex-wrap:wrap}}
.cta-box .cd-unit{{text-align:center}}
.cta-box .cd-num{{font-family:'Oswald',sans-serif;font-size:36px;font-weight:700;
                   color:var(--red);line-height:1}}
.cta-box .cd-lbl{{font-family:'Raleway',sans-serif;font-size:9px;color:rgba(255,255,255,.5);
                   text-transform:uppercase;letter-spacing:1px}}
.cta-box .cd-sep{{font-family:'Oswald',sans-serif;font-size:30px;color:var(--red);
                   align-self:flex-start;margin-top:4px}}
.cta-box img{{max-width:200px;margin:0 auto 16px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.4))}}
.cta-box .price-label{{font-family:'Oswald',sans-serif;font-size:30px;font-weight:600;
                         color:#fff;margin-bottom:4px}}
.cta-box .price-note{{font-family:'Raleway',sans-serif;font-size:12px;color:rgba(255,255,255,.55);
                       margin-bottom:16px}}
.bottom-cta .tagline{{font-family:'Oswald',sans-serif;font-size:16px;color:#fff;
                       margin-top:16px;font-weight:300}}

@media(max-width:700px){{
  .hero-inner,.about-inner,.author-cols{{flex-direction:column}}
  .hero-cover,.about-cover{{flex:unset;width:100%;max-width:320px;margin:0 auto}}
  .testi-grid{{grid-template-columns:1fr}}
  .author-photo{{flex:unset;width:100%}}
}}
</style>
</head>
<body>

<!-- TOP BAR -->
<div class="topbar">
  <p>Pre-Order Today And Get A Signed Copy Of The Book!</p>
</div>

<!-- HERO: cover LEFT, text RIGHT -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-cover">
      <img src="cover.png" alt="{b['title']}">
    </div>
    <div class="hero-text">
      <h1 class="hero-title">{b['title']}</h1>
      <p class="hero-sub">{b['subtitle']}</p>
      <p class="hero-award">Award Winning Author</p>
      <p class="hero-author">{b['author']}</p>
      <a href="order.html" class="btn-cta">
        Pre-order Your Copy
        <small>And Get Your Limited Edition Author Signed Book</small>
      </a>
      <p class="hero-note">📚 &nbsp;You will get a personally signed copy of the book</p>
      <div class="trust-row">
        <div class="trust-item"><span class="trust-icon">🛡</span> Secure Checkout</div>
        <div class="trust-item"><span class="trust-icon">✅</span> Satisfaction Guarantee</div>
        <div class="trust-item"><span class="trust-icon">🔒</span> Privacy Protected</div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT: cover LEFT, text RIGHT -->
<section class="about-section">
  <div class="about-inner">
    <div class="about-cover">
      <img src="cover.png" alt="{b['title']}">
    </div>
    <div class="about-text">
      <h2 class="about-title">{b['title']}</h2>
      <p class="about-sub">{b['subtitle']}</p>
      <p class="foreword-credit">Foreword by Raymond Aaron<br>New York Times Bestselling Author</p>
      <p class="about-body">{LOREM}</p>
      <p class="about-body">{LOREM2}</p>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<div class="cta-band">
  <h2>Ready To Reserve A Copy For Yourself</h2>
  <p>Get The Limited Edition Author Signed Copy Today</p>
  <a href="order.html" class="btn-cta-inline">
    Pre-order Your Copy
    <small>And Get Your Limited Edition Author Signed Book</small>
  </a>
</div>

<!-- AUTHOR -->
<section class="author-section">
  <div class="author-inner">
    <h2>About The Author</h2>
    <h3>{b['author']}</h3>
    <div class="author-cols">
      <div class="author-photo">
        <div class="circle">{b['author'][0]}</div>
        <p>You Can Connect &amp; Engage On...</p>
        <div class="social-row">
          <div class="social-btn" style="background:#1877F2;">f</div>
          <div class="social-btn" style="background:#E1306C;">&#9679;</div>
          <div class="social-btn" style="background:#0A66C2;">in</div>
        </div>
      </div>
      <div class="author-bio-text">
        <p>{LOREM}</p>
        <p>{LOREM2}</p>
        <p>{LOREM}</p>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testi-section">
  <div class="testi-inner">
    <h2>Testimonials For The Book</h2>
    <p class="sub">The Readers Love It!</p>
    <div class="testi-grid">
      <div class="testi-card">
        <p>{LOREM}</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
      <div class="testi-card">
        <p>{LOREM}</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
      <div class="testi-card">
        <p>{LOREM}</p>
        <p class="tname">John</p><p class="tco">Company</p>
      </div>
    </div>
  </div>
</section>

<!-- BOTTOM CTA WITH COUNTDOWN BOX -->
<section class="bottom-cta">
  <h2>Get Your Copy Today</h2>
  <p class="sub">This Is Truly A Limited Offer, So Pre-Order Your Copy Of The Book</p>
  <div class="cta-box">
    <p style="font-family:'Raleway',sans-serif;font-size:13px;color:rgba(255,255,255,.65);margin-bottom:14px;">
      Let Me Show You Everything You Get When You Order Your Copy Of:
    </p>
    <div class="countdown">
      <div class="cd-unit"><div class="cd-num">31</div><div class="cd-lbl">Days</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num">00</div><div class="cd-lbl">Hours</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num">15</div><div class="cd-lbl">Minutes</div></div>
      <div class="cd-sep">:</div>
      <div class="cd-unit"><div class="cd-num">34</div><div class="cd-lbl">Seconds</div></div>
    </div>
    <img src="cover.png" alt="{b['title']}">
    <p class="price-label">Pre-Launch Offer &nbsp;$ 19.99</p>
    <p class="price-note">Shipping &amp; Handling Fees Will Be Free If You Pre-Order Before The Timer Runs Out!</p>
    <a href="order.html" class="btn-cta-inline" style="display:block;">Pre-order Your Copy
      <small>And Get Your Limited Edition Author Signed Book</small>
    </a>
  </div>
  <p class="tagline">Pre-order Your Copy Today<br>And Get Your Own Signed Copy Of The Book</p>
</section>

{FOOTER_HTML}
</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 2 — ORDER FORM
# ══════════════════════════════════════════════════════════════════════════════
def order(b):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{b['title']} — Complete Your Order</title>
{GF}
<style>
{cvars(b)}
{RESET}
body{{background:var(--gray)}}

/* ── HEADER ── */
.order-header{{background:var(--p);padding:22px 24px}}
.oh-inner{{max-width:860px;margin:0 auto}}
.oh-top{{text-align:center;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.12)}}
.oh-top h1{{font-family:'Oswald',sans-serif;font-size:clamp(22px,4vw,34px);font-weight:500;
             color:var(--a);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}}
.oh-top h2{{font-family:'Oswald',sans-serif;font-size:clamp(16px,3vw,22px);font-weight:300;
             color:#fff;letter-spacing:.5px}}
.oh-bottom{{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px}}
.oh-bottom .complete{{font-family:'Raleway',sans-serif;font-size:16px;font-weight:600;color:var(--a)}}
.oh-bottom .help{{font-family:'Raleway',sans-serif;font-size:13px;color:rgba(255,255,255,.7);text-align:right}}
.oh-bottom .help a{{color:var(--a)}}

/* ── BODY WRAPPER ── */
.order-wrap{{max-width:860px;margin:24px auto;padding:0 16px 40px;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap}}

/* ── FORM CARD ── */
.form-card{{flex:1;min-width:300px;background:#fff;border-radius:6px;overflow:hidden;
             box-shadow:0 2px 16px rgba(0,0,0,.10)}}

/* Step header */
.step-header{{background:var(--a);color:#fff;font-family:'Raleway',sans-serif;font-size:15px;
              font-weight:600;letter-spacing:.5px;padding:14px 20px;text-align:center}}

/* Form fields */
.form-section{{padding:20px 20px 4px}}
.field{{margin-bottom:14px}}
.field input,.field select{{
  width:100%;padding:13px 15px;
  font-family:'Raleway',sans-serif;font-size:14px;color:#333;
  border:1px solid #ccc;border-radius:4px;
  background:#fff;outline:none;
  box-shadow:inset 0 1px 3px rgba(0,0,0,.08);
  transition:border-color .15s}}
.field input:focus,.field select:focus{{border-color:var(--a)}}
.field input::placeholder{{color:#aaa}}

/* Payment section */
.payment-section{{padding:0 20px 20px}}
.payment-option{{border:1px solid #ddd;border-radius:4px;padding:14px 16px;margin-bottom:10px}}
.payment-option .radio-row{{display:flex;align-items:center;gap:10px;margin-bottom:10px;
                             font-family:'Raleway',sans-serif;font-size:14px;color:#333;font-weight:600}}
.payment-option .radio-row input{{accent-color:var(--a);width:16px;height:16px}}
.card-logos{{display:flex;gap:6px;align-items:center}}
.card-logo{{height:22px;width:auto;border:1px solid #ddd;border-radius:3px;padding:2px 4px;
            font-size:10px;font-weight:700;display:flex;align-items:center;color:#fff}}
.card-fields{{margin-top:10px}}
.card-fields input{{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:4px;
                     font-family:'Raleway',sans-serif;font-size:14px;color:#333;margin-bottom:8px}}
.card-row{{display:flex;gap:10px}}
.card-row input{{flex:1}}
.mollie-logos{{margin-left:auto;display:flex;gap:4px;align-items:center;flex-wrap:wrap}}

.btn-confirm{{display:block;width:100%;background:var(--green);color:#fff;
               font-family:'Raleway',sans-serif;font-size:18px;font-weight:700;
               text-transform:uppercase;letter-spacing:1px;padding:18px;
               border:none;cursor:pointer;text-align:center;text-decoration:none;
               transition:background .2s}}
.btn-confirm:hover{{background:var(--green2)}}

.trust-badges{{display:flex;justify-content:center;gap:28px;padding:16px 20px;
               border-top:1px solid #eee;flex-wrap:wrap}}
.badge{{display:flex;align-items:center;gap:8px;font-family:'Raleway',sans-serif;
         font-size:12px;color:#888}}
.badge .icon{{font-size:22px}}

/* ── RIGHT PROMO ── */
.promo-col{{flex:0 0 260px}}
.promo-countdown{{text-align:center;margin-bottom:18px}}
.promo-countdown .cd-row{{display:flex;justify-content:center;gap:4px;align-items:flex-start}}
.cd-block{{text-align:center}}
.cd-block .num{{font-family:'Oswald',sans-serif;font-size:38px;font-weight:700;
                color:var(--red);line-height:1}}
.cd-block .lbl{{font-family:'Raleway',sans-serif;font-size:9px;color:#888;
                text-transform:uppercase;letter-spacing:.8px}}
.cd-colon{{font-family:'Oswald',sans-serif;font-size:30px;color:var(--red);
            margin-top:4px;line-height:1}}
.promo-col img{{width:100%;max-width:240px;margin:0 auto 12px;
                filter:drop-shadow(0 6px 18px rgba(0,0,0,.2))}}
.promo-col .signed{{font-family:'Raleway',sans-serif;font-size:14px;color:var(--a);
                     text-align:center;font-weight:600}}

@media(max-width:700px){{
  .order-wrap{{flex-direction:column}}
  .promo-col{{flex:unset;width:100%;order:-1}}
  .oh-bottom{{flex-direction:column;text-align:center}}
  .oh-bottom .help{{text-align:center}}
}}
</style>
</head>
<body>

<!-- HEADER -->
<div class="order-header">
  <div class="oh-inner">
    <div class="oh-top">
      <h1>{b['title']}</h1>
      <h2>{b['subtitle']}</h2>
    </div>
    <div class="oh-bottom">
      <span class="complete">Complete your order</span>
      <span class="help">Do you need some help? Send me an email<br>to <a href="mailto:support@example.com">support@example.com</a></span>
    </div>
  </div>
</div>

<!-- BODY -->
<div class="order-wrap">

  <!-- LEFT: FORM CARD -->
  <div class="form-card">

    <!-- STEP 1 -->
    <div class="step-header">---- Step #1: Contact information ----</div>
    <div class="form-section">
      <div class="field"><input type="text"  placeholder="Enter Your First name"></div>
      <div class="field"><input type="text"  placeholder="Enter Your Last name"></div>
      <div class="field"><input type="email" placeholder="Enter Your Email Address"></div>
      <div class="field"><input type="text"  placeholder="Enter Full Shipping Address"></div>
      <div class="field"><input type="text"  placeholder="Enter Your City"></div>
      <div class="field"><input type="text"  placeholder="Enter Your Zip code"></div>
      <div class="field">
        <select>
          <option>Canada</option><option>United States</option>
          <option>United Kingdom</option><option>Australia</option>
          <option>New Zealand</option><option>Other</option>
        </select>
      </div>
    </div>

    <!-- STEP 2 -->
    <div class="step-header">--- Step #2: Payment Information ---</div>
    <div class="payment-section" style="padding-top:20px;">

      <!-- Credit card option -->
      <div class="payment-option">
        <div class="radio-row">
          <input type="radio" name="pay" checked>
          <span>Credit or debit card</span>
          <div class="card-logos" style="margin-left:auto;">
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

      <!-- Mollie option -->
      <div class="payment-option">
        <div class="radio-row">
          <input type="radio" name="pay">
          <span>Mollie</span>
          <div class="mollie-logos">
            <div class="card-logo" style="background:#EB001B;">MC</div>
            <div class="card-logo" style="background:#1A1F71;">VISA</div>
            <div class="card-logo" style="background:#2E77BC;">AMEX</div>
            <div class="card-logo" style="background:#003087;">PP</div>
          </div>
        </div>
        <p style="font-family:'Raleway',sans-serif;font-size:11px;color:#aaa;margin-top:4px;">
          🔒 Secure payments powered by mollie
        </p>
      </div>

      <a href="confirmed.html" class="btn-confirm">CONFIRM MY ORDER</a>

      <!-- Trust badges -->
      <div class="trust-badges">
        <div class="badge"><span class="icon">🛡</span><span>Secure<br>Checkout</span></div>
        <div class="badge"><span class="icon">✅</span><span>Satisfaction<br>Guarantee</span></div>
        <div class="badge"><span class="icon">🔒</span><span>Privacy<br>Protected</span></div>
      </div>
    </div>

  </div><!-- /form-card -->

  <!-- RIGHT: PROMO -->
  <div class="promo-col">
    <div class="promo-countdown">
      <div class="cd-row">
        <div class="cd-block"><div class="num">31</div><div class="lbl">Days</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num">00</div><div class="lbl">Hours</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num">15</div><div class="lbl">Minutes</div></div>
        <div class="cd-colon">:</div>
        <div class="cd-block"><div class="num">01</div><div class="lbl">Seconds</div></div>
      </div>
    </div>
    <img src="cover.png" alt="{b['title']}">
    <p class="signed">Get Your Signed Copy Today</p>
  </div>

</div><!-- /order-wrap -->

{FOOTER_HTML}
</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 3 — CONFIRMATION
# ══════════════════════════════════════════════════════════════════════════════
def confirmed(b):
    survey_items = ""
    for item in b["survey"]:
        survey_items += f"""
      <label style="display:flex;align-items:center;justify-content:space-between;
                    background:#f0f2f5;border-radius:50px;padding:14px 20px;
                    margin-bottom:10px;cursor:pointer;transition:background .15s;"
             onmouseover="this.style.background='#e4e6ea'"
             onmouseout="this.style.background='#f0f2f5'">
        <span style="font-family:'Raleway',sans-serif;font-size:15px;color:#444;">{item}</span>
        <input type="radio" name="survey" style="width:20px;height:20px;accent-color:var(--a);flex-shrink:0;">
      </label>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{b['title']} — Order Confirmed</title>
{GF}
<style>
{cvars(b)}
{RESET}
body{{background:#fff}}

/* ── HEADER ── */
.confirm-header{{background:var(--p);padding:50px 20px 40px;text-align:center}}
.confirm-header h1{{font-family:'Oswald',sans-serif;font-size:clamp(36px,7vw,60px);
                    font-weight:700;color:#FFE600;text-transform:uppercase;
                    letter-spacing:1px;margin-bottom:10px}}
.confirm-header h2{{font-family:'Oswald',sans-serif;font-size:clamp(20px,4vw,32px);
                    font-weight:500;color:#fff;margin-bottom:14px}}
.confirm-header p{{font-family:'Raleway',sans-serif;font-size:15px;color:rgba(255,255,255,.80);
                   max-width:600px;margin:0 auto 6px}}
.confirm-header em{{font-style:italic;color:rgba(255,255,255,.65)}}

/* ── BODY ── */
.confirm-body{{max-width:860px;margin:0 auto;padding:48px 20px;display:flex;gap:40px;flex-wrap:wrap}}
.confirm-cover{{flex:0 0 320px}}
.confirm-cover img{{width:100%;filter:drop-shadow(0 8px 24px rgba(0,0,0,.20))}}
.confirm-right{{flex:1;min-width:240px}}
.confirm-right h2{{font-family:'Oswald',sans-serif;font-size:36px;font-weight:400;
                    color:#333;margin-bottom:14px}}
.confirm-right p{{font-family:'Raleway',sans-serif;font-size:15px;line-height:1.85;
                   color:#555;margin-bottom:12px}}

/* Survey */
.survey-title{{font-family:'Raleway',sans-serif;font-size:17px;font-weight:600;
               color:#333;margin:24px 0 14px}}
.survey-form{{max-width:520px}}

@media(max-width:700px){{
  .confirm-body{{flex-direction:column}}
  .confirm-cover{{flex:unset;max-width:300px;margin:0 auto}}
}}
</style>
</head>
<body>

<!-- HEADER -->
<div class="confirm-header">
  <h1>Order Confirmed 👍</h1>
  <h2>Congrats! Your Book Is On The Way</h2>
  <p>You Will Receive Your Signed Copy Of The Book Once The Book Is Published, Thank you for your support.</p>
  <p><em>(International Shipping Might Take A Bit Longer)</em></p>
</div>

<!-- BODY: cover LEFT, thank you + survey RIGHT -->
<div class="confirm-body">
  <div class="confirm-cover">
    <img src="cover.png" alt="{b['title']}">
  </div>
  <div class="confirm-right">
    <h2>Thank you!</h2>
    <p>I will personally sign and send you a copy. Now, please answer the below question which will help me customize the book to you.</p>
    <p class="survey-title">What Are You Most Looking Forward To In The Book?</p>
    <form class="survey-form">
      {survey_items}
    </form>
  </div>
</div>

{FOOTER_HTML}
</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 4 — TERMS & CONDITIONS
# ══════════════════════════════════════════════════════════════════════════════
def terms(b):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{b['title']} — Terms &amp; Conditions</title>
{GF}
<style>
{cvars(b)}
{RESET}
body{{background:#fff}}
.legal-topbar{{background:var(--p);height:12px}}
.legal-page{{max-width:920px;margin:0 auto;padding:40px 20px 60px;display:flex;gap:40px;align-items:flex-start}}
.legal-main{{flex:1;min-width:0}}
.legal-main h1{{font-family:'Raleway',sans-serif;font-size:32px;font-weight:700;color:#1a1a2e;margin-bottom:6px}}
.legal-main .updated{{font-family:'Raleway',sans-serif;font-size:13px;color:#777;font-style:italic;margin-bottom:6px}}
.legal-main .please{{font-family:'Raleway',sans-serif;font-size:14px;color:#555;margin-bottom:28px}}
.legal-main h2{{font-family:'Raleway',sans-serif;font-size:22px;font-weight:700;color:#1a1a2e;margin:28px 0 8px}}
.legal-main h3{{font-family:'Raleway',sans-serif;font-size:16px;font-weight:700;color:#1a1a2e;margin:16px 0 6px;padding-left:16px}}
.legal-main p{{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:10px}}
.legal-main blockquote{{border-left:3px solid #ddd;padding-left:16px;margin:10px 0}}
.legal-main blockquote p{{color:#555}}
/* Sidebar */
.legal-sidebar{{flex:0 0 220px}}
.sidebar-box{{border:1px solid #ddd;border-radius:4px;overflow:hidden;margin-bottom:20px}}
.sidebar-head{{background:var(--p);color:#fff;font-family:'Oswald',sans-serif;font-size:13px;
               font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:10px 14px}}
.sidebar-body{{padding:14px;font-family:'Raleway',sans-serif;font-size:13px;line-height:1.7;color:#555}}
@media(max-width:700px){{
  .legal-page{{flex-direction:column}}
  .legal-sidebar{{flex:unset;width:100%}}
}}
</style>
</head>
<body>
<div class="legal-topbar"></div>
<div class="legal-page">
  <div class="legal-main">
    <h1>Terms and Conditions</h1>
    <p class="updated">Our Terms and Conditions were last updated on Jan 31st 2026.</p>
    <p class="please">Please read them carefully before using Our Service.</p>

    <h2>Article 1: General</h2>
    <p>By using the Site, you agree to be bound by these Terms and Conditions and to use the Site in accordance with these Terms of Service, our Privacy Policy and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from [Company].</p>
    <p>Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.</p>
    <h3>Article 1a: Age limit</h3>
    <blockquote>
      <p>Age restrictions apply. [Company] does not permit those under 18 to use the Service. We do our best to restrict access to our sites, products and services to minors. Even if the content of our products and services is not of a shocking nature, we prefer to target a mature audience capable of understanding the implications and responsibilities of the business world.</p>
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
    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
    <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>

    <h2>Article 8: Company information</h2>
    <p><em>[Company]</em></p>
    <p><em>[Company]</em><br><em>[Contact Info]</em></p>
  </div>

  <div class="legal-sidebar">
    <div class="sidebar-box">
      <div class="sidebar-head">Hello</div>
      <div class="sidebar-body">Welcome to our Terms and Conditions! These boxes aren't legally binding, you can use them as an aid for understanding the legal language.</div>
    </div>
  </div>
</div>

{FOOTER_HTML}
</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
# PAGE 5 — PRIVACY POLICY
# ══════════════════════════════════════════════════════════════════════════════
def privacy(b):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{b['title']} — Privacy Policy</title>
{GF}
<style>
{cvars(b)}
{RESET}
body{{background:#fff}}
.legal-topbar{{background:var(--p);height:12px}}
.legal-page{{max-width:920px;margin:0 auto;padding:40px 20px 60px;display:flex;gap:40px;align-items:flex-start}}
.legal-main{{flex:1;min-width:0}}
.legal-main h1{{font-family:'Raleway',sans-serif;font-size:32px;font-weight:700;color:#1a1a2e;margin-bottom:14px}}
.legal-main .updated{{font-family:'Raleway',sans-serif;font-size:13px;color:#777;font-style:italic;margin-bottom:20px}}
.legal-main h2{{font-family:'Raleway',sans-serif;font-size:22px;font-weight:700;color:#1a1a2e;margin:28px 0 8px}}
.legal-main p{{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:10px}}
.legal-main ul{{padding-left:20px;margin-bottom:12px}}
.legal-main ul li{{font-family:'Raleway',sans-serif;font-size:14px;line-height:1.85;color:#444;margin-bottom:6px}}
.legal-main ul li a{{color:var(--a);text-decoration:underline}}
.legal-main ul li a:hover{{opacity:.8}}
/* Sidebar */
.legal-sidebar{{flex:0 0 220px}}
.sidebar-box{{border:1px solid #ddd;border-radius:4px;overflow:hidden;margin-bottom:20px}}
.sidebar-head{{background:var(--p);color:#fff;font-family:'Oswald',sans-serif;font-size:13px;
               font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:10px 14px}}
.sidebar-body{{padding:14px;font-family:'Raleway',sans-serif;font-size:13px;line-height:1.7;color:#555}}
.sidebar-body .def-term{{font-family:'Oswald',sans-serif;font-size:12px;text-transform:uppercase;
                          letter-spacing:.5px;color:var(--a);margin-top:12px;margin-bottom:3px}}
@media(max-width:700px){{
  .legal-page{{flex-direction:column}}
  .legal-sidebar{{flex:unset;width:100%}}
}}
</style>
</head>
<body>
<div class="legal-topbar"></div>
<div class="legal-page">
  <div class="legal-main">
    <h1>Privacy Policy</h1>
    <p class="updated">Our Privacy Policy was last updated on Jan 31st 2026.</p>
    <p>This Privacy Policy governs the manner in which the website collects, uses, maintains and discloses information collected from users (each, a 'User') of the website ('Site'). This privacy policy applies to the Site and all products and services offered by [Company].</p>

    <h2>Personal identification information</h2>
    <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our Site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, where appropriate, an email address. Users may, however, visit our Site anonymously.</p>
    <p>We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personal identification information, however, it may prevent them from engaging in certain Site related activities.</p>

    <h2>Non-personal identification information</h2>
    <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>

    <h2>Web browser cookies</h2>
    <p>Our Site may use 'cookies' to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>

    <h2>How we use collected information</h2>
    <p>[Company] may collect and use Users' personal information for the following purposes:</p>
    <ul>
      <li><a href="#">To improve customer service</a><br>Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
      <li><a href="#">To personalize user experience</a><br>We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
      <li><a href="#">To send periodic emails</a><br>We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc.</li>
    </ul>

    <h2>How we protect your information</h2>
    <p>We adopt appropriate data collection, storage and processing practices, and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>

    <h2>Sharing your personal information</h2>
    <p>We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>

    <h2>Third party websites</h2>
    <p>Users may find advertising or other content on our Site that links to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.</p>

    <h2>Changes to this privacy policy</h2>
    <p>[COMPANY] has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.</p>

    <h2>Your acceptance of these terms</h2>
    <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
  </div>

  <div class="legal-sidebar">
    <div class="sidebar-box">
      <div class="sidebar-head">Hi There</div>
      <div class="sidebar-body">
        Welcome to our Privacy Policy! These boxes aren't legally binding, you can use them as an aid for understanding the legal language.
        <div class="def-term">Definitions</div>
        "Personal Information" is information someone can use to identify you.
      </div>
    </div>
  </div>
</div>

{FOOTER_HTML}
</body>
</html>"""


# ══════════════════════════════════════════════════════════════════════════════
# GENERATE ALL 25
# ══════════════════════════════════════════════════════════════════════════════
builders = {
    "index.html":     landing,
    "order.html":     order,
    "confirmed.html": confirmed,
    "terms.html":     terms,
    "privacy.html":   privacy,
}

for b in BOOKS:
    path = os.path.join(SITES, b["folder"])
    os.makedirs(path, exist_ok=True)
    for fname, fn in builders.items():
        with open(os.path.join(path, fname), "w", encoding="utf-8") as f:
            f.write(fn(b))
        print(f"  ✓  {b['folder']}/{fname}")

print("\nAll 25 pages generated.")
