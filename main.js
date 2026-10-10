// Mağaza bağlantıları: uygulama yayına girince adresi buraya yaz; boşken düğme "Yakında" görünür.
const MAGAZA = {
  ios: "",      // örn. https://apps.apple.com/tr/app/agros-kapinda/id0000000000
  android: "",  // örn. https://play.google.com/store/apps/details?id=app.agrosjet.yemek
};

const IKON = {
  ios: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.37 12.5c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.54 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.14.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.3-3.5M14.2 6.06c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21"/></svg>',
  android: '<svg viewBox="0 0 24 24"><path fill="#00D7FE" d="M3.6 2.3c-.2.2-.3.6-.3 1v17.4c0 .4.1.8.3 1l9.7-9.7z"/><path fill="#FFCE00" d="m16.5 15.3-3.2-3.3 3.2-3.3 3.9 2.2c1.1.6 1.1 1.7 0 2.3z"/><path fill="#FF3A44" d="M16.5 15.3 13.3 12l-9.7 9.7c.4.4 1 .4 1.7 0z"/><path fill="#00F076" d="M16.5 8.7 5.3 2.3c-.7-.4-1.3-.4-1.7 0l9.7 9.7z"/></svg>',
};

function magazaDugmesi(tur) {
  const url = MAGAZA[tur];
  const el = document.createElement(url ? "a" : "span");
  el.className = "magaza" + (url ? "" : " yakinda");
  if (url) { el.href = url; el.rel = "noopener"; }
  else el.setAttribute("aria-label", (tur === "ios" ? "App Store" : "Google Play") + " — yakında");
  el.innerHTML = IKON[tur] + (tur === "ios"
    ? "<span><small>Download on the</small><b>App Store</b></span>"
    : "<span><small>GET IT ON</small><b>Google Play</b></span>");
  return el;
}

document.querySelectorAll("[data-magazalar]").forEach((kap) => {
  kap.append(magazaDugmesi("ios"), magazaDugmesi("android"));
});

document.querySelectorAll("[data-yil]").forEach((s) => { s.textContent = new Date().getFullYear(); });

// Üst bar: kaydırınca alt çizgi
const ust = document.getElementById("ust");
const ustGuncelle = () => ust.classList.toggle("kaydi", window.scrollY > 8);
window.addEventListener("scroll", ustGuncelle, { passive: true });
ustGuncelle();

// Görünür olunca beliren bölümler
const belirenler = document.querySelectorAll(".bolum-bas, .grup-baslik, .hizmet, .adimlar li, .neden-sol, .neden-liste li, .isletme-kart, .indir-ic");
if ("IntersectionObserver" in window) {
  belirenler.forEach((el) => el.classList.add("belir"));
  const gozcu = new IntersectionObserver((girdiler) => {
    girdiler.forEach((g) => {
      if (g.isIntersecting) { g.target.classList.add("gorundu"); gozcu.unobserve(g.target); }
    });
  }, { threshold: 0.15 });
  belirenler.forEach((el) => gozcu.observe(el));
}
