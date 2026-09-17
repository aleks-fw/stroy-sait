(function () {
  "use strict";

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".house-card, .why__item, .process__step, .project-card, .calc__box, .cta__title, .cta__sub"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Calculator ---------- */
  var BASE_PRICE_PER_M2 = {
    shell: 28000,
    preclean: 42000,
    turnkey: 58000
  };
  var FLOOR_MULTIPLIER = {
    "1": 1,
    "1.5": 1.08,
    "2": 1.15
  };

  var areaInput = document.getElementById("area");
  var areaValue = document.getElementById("areaValue");
  var floorsSelect = document.getElementById("floors");
  var finishSelect = document.getElementById("finish");
  var resultValue = document.getElementById("resultValue");
  var resultHint = document.getElementById("resultHint");

  function formatRub(n) {
    return Math.round(n / 1000) * 1000
      ? new Intl.NumberFormat("ru-RU").format(Math.round(n / 1000) * 1000) + " ₽"
      : "0 ₽";
  }

  function recalc() {
    var area = parseInt(areaInput.value, 10);
    var floors = floorsSelect.value;
    var finish = finishSelect.value;

    areaValue.textContent = area;

    var pricePerM2 = BASE_PRICE_PER_M2[finish];
    var multiplier = FLOOR_MULTIPLIER[floors];
    var total = area * pricePerM2 * multiplier;

    resultValue.textContent = formatRub(total);
    resultHint.textContent =
      "≈ " + new Intl.NumberFormat("ru-RU").format(Math.round(pricePerM2 * multiplier)) +
      " ₽ за м² · демо-оценка, не публичная оферта";
  }

  if (areaInput && floorsSelect && finishSelect) {
    areaInput.addEventListener("input", recalc);
    floorsSelect.addEventListener("change", recalc);
    finishSelect.addEventListener("change", recalc);
    recalc();
  }

  /* ---------- CTA form (demo, no backend) ---------- */
  var form = document.getElementById("ctaForm");
  var done = document.getElementById("ctaDone");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.hidden = true;
      if (done) done.hidden = false;
    });
  }
})();
