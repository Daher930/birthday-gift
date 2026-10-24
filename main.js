/* ============ عدّل هنا فقط: كل نصوص الموقع في هذا القسم ============ */
const CONFIG = {
  name: "فاطمة",
  lead: "كل عام وأنتِ حبيبتي",
  sub: "هذه هديتي لكِ في عيد ميلادك: موقع صغير كتبتُ كل سطر فيه من أجلك.",
  startDate: "2025-10-25T00:00:00",   // أول لقاء بينكما: سنة-شهر-يوم
  passcode: "18112025",                       // كلمة سر اختيارية، اتركها فارغة لإلغائها
  passHint: "ادخلي كلمة السر",

  timeline: [
    { date: "25 أكتوبر 2025", title: "أول لقاء",
      text: "مازلت اذكر يوم أول جذوةٍ\nللحب يوم تبادل النظرات\n\nيوم أرتوى طرفي وذابت جرأتي\nفي خدك الوردي والبسمات",
      photo: "" },
    { date: "18 نوفمبر 2025", title: "يوم الخطوبة",
      text: "ضممتكِ يومها بعيني وفي عقلي وقلبي وكأنني أضمّ الدنيا كلها بين ذراعيّ،\nوأخفيتُ وجهي في حضنكِ وكأن قلبي وجد بيته أخيراً.\nكان العناق طويلاً، ومع ذلك بدا العمر كله قليلاً بجانبه،\nوفي ذلك الدفء عاهدتُ قلبي أن أبقى لكِ سكناً وأماناً.",
      photo: "" },
    { date: "6 يونيو 2026", title: "يوم زواجنا",
      text: "في ذلك اليوم صار الحلم بيتاً، وصار اسمكِ بجانب اسمي إلى الأبد.\nمشيتُ إليكِ وكل خطوة تهمس لي: وصلتَ إلى قلبكَ أخيراً.\nومنذ ذلك اليوم صارت أيامي كلها أجمل، لأنكِ فيها.",
      photo: "" },
    { date: "اليوم", title: "عيد ميلادك", text: "ولا تزال أجمل المحطات أمامنا.", photo: "" }
    /* لإضافة صورة: ضعها في مجلد img واكتب مثلاً photo: "img/1.jpg" */
  ],

  wishText: "تمنّي ما شئتِ يا فاطمة،\nوسأبذل كل ما أستطيع ليتحقق.\nكل عام وأنتِ بخير.",

  finalTitle: "أحبك",
  finalText: "شكراً لأنك شريكة عمري.\nكل عام وأنتِ أجمل ما في حياتي."
};
/* =================================================================== */

const $ = id => document.getElementById(id);
const ar = n => n.toLocaleString("ar-EG");

$("lead").textContent = CONFIG.lead;
$("name").textContent = CONFIG.name;
$("sub").textContent = CONFIG.sub;
$("envTo").textContent = "إلى " + CONFIG.name;
$("finalTitle").textContent = CONFIG.finalTitle;
$("finalText").textContent = CONFIG.finalText;
document.title = "إلى " + CONFIG.name;

CONFIG.timeline.forEach(t => {
  const li = document.createElement("li");
  const time = document.createElement("time"); time.textContent = t.date;
  const h = document.createElement("h3"); h.textContent = t.title;
  const p = document.createElement("p"); p.textContent = t.text;
  li.append(time, h, p);
  if (t.photo) {
    const f = document.createElement("figure");
    const img = document.createElement("img");
    img.src = t.photo; img.alt = t.title; img.loading = "lazy";
    f.append(img); li.append(f);
  }
  $("timeline").append(li);
});

/* العدّاد الحي */
const start = new Date(CONFIG.startDate);
function tick() {
  const now = new Date();
  let y = now.getFullYear() - start.getFullYear();
  let a = new Date(start); a.setFullYear(start.getFullYear() + y);
  if (a > now) { y--; a = new Date(start); a.setFullYear(start.getFullYear() + y); }
  let m = 0;
  while (true) {
    const b = new Date(a); b.setMonth(a.getMonth() + m + 1);
    if (b > now) break;
    m++;
  }
  const anchor = new Date(a); anchor.setMonth(a.getMonth() + m);
  let rest = Math.max(0, Math.floor((now - anchor) / 1000));
  const d = Math.floor(rest / 86400); rest %= 86400;
  const h = Math.floor(rest / 3600);  rest %= 3600;
  const i = Math.floor(rest / 60), s = rest % 60;
  $("c-y").textContent = ar(Math.max(0, y)); $("c-m").textContent = ar(m);
  $("c-d").textContent = ar(d); $("c-h").textContent = ar(h);
  $("c-i").textContent = ar(i); $("c-s").textContent = ar(s);
}
tick(); setInterval(tick, 1000);

/* بتلات تتساقط */
function petals(count, spread) {
  const marks = ["❀", "♥", "✿", "❁"];
  for (let k = 0; k < count; k++) {
    const e = document.createElement("span");
    e.className = "petal";
    e.textContent = marks[k % marks.length];
    e.style.left = Math.random() * 100 + "vw";
    e.style.fontSize = (1.1 + Math.random() * 1.2) + "rem";
    e.style.color = k % 3 ? "#E98AAB" : "#B01E55";
    e.style.setProperty("--dx", (Math.random() * 6 - 3) + "rem");
    e.style.setProperty("--rot", (Math.random() * 540 - 270) + "deg");
    e.style.animationDuration = (5 + Math.random() * 4) + "s";
    e.style.animationDelay = (Math.random() * spread) + "s";
    document.body.append(e);
    setTimeout(() => e.remove(), (spread + 10) * 1000);
  }
}

/* قلوب صغيرة تتطاير مكان اللمس */
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.addEventListener("pointerdown", ev => {
  if (calm || ev.target.closest("#gate")) return;
  const marks = ["♥", "❀", "✿", "♡"], cols = ["#B01E55", "#FF7FA8", "#E98AAB", "#FFC4BC"];
  for (let k = 0; k < 7; k++) {
    const e = document.createElement("span");
    e.className = "pop";
    e.textContent = marks[k % marks.length];
    e.style.left = ev.clientX + "px"; e.style.top = ev.clientY + "px";
    e.style.color = cols[k % cols.length];
    document.body.append(e);
    const ang = Math.PI * 2 * (k / 7) + Math.random() * .6, dist = 40 + Math.random() * 50;
    e.animate([
      { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * dist}px), calc(-50% + ${Math.sin(ang) * dist - 30}px)) scale(1.3)`, opacity: 0 }
    ], { duration: 800 + Math.random() * 300, easing: "ease-out" }).onfinish = () => e.remove();
  }
});

/* فتح الظرف */
$("openBtn").addEventListener("click", () => {
  $("env").classList.add("open");
  setTimeout(() => $("intro").classList.add("done"), 1700);
  setTimeout(() => {
    $("intro").remove();
    document.body.classList.remove("locked");
    petals(18, 4);
  }, 2300);
});

/* الكعكة والأمنية */
$("cakeBtn").addEventListener("click", () => {
  const b = $("cakeBtn");
  b.classList.add("out"); b.disabled = true;
  b.setAttribute("aria-label", "الشمعة مطفأة");
  $("wishIntro").textContent = "تمنّيتِ؟ جميل.";
  setTimeout(() => {
    $("wish").textContent = CONFIG.wishText;
    $("wish").classList.add("show");
    petals(20, 2);
  }, 900);
});

/* المفاجأة الأخيرة */
$("finalBtn").addEventListener("click", () => {
  $("final").classList.add("show");
  $("final").scrollIntoView({ behavior: "smooth", block: "center" });
  petals(24, 2);
});

/* كلمة السر: حماية بسيطة للهدية وليست أمنية حقيقية */
if (CONFIG.passcode) {
  $("gate").classList.add("on");
  $("gateHint").textContent = CONFIG.passHint;
  const tryOpen = () => {
    if ($("gateInput").value.trim() === CONFIG.passcode) $("gate").classList.remove("on");
    else $("gateErr").textContent = "ليست هذه الكلمة، جرّبي مرة أخرى.";
  };
  $("gateBtn").addEventListener("click", tryOpen);
  $("gateInput").addEventListener("keydown", e => { if (e.key === "Enter") tryOpen(); });
}
