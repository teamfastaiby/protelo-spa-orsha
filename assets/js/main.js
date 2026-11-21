/* Арбори Прайм Групп — меню, FAQ, заявка в WhatsApp */
(function () {
  "use strict";

  var WA = "375339955670"; // +375 (33) 995-56-70

  var burger = document.getElementById("burger"), drawer = document.getElementById("drawer"), dclose = document.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("data-open", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (dclose) dclose.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.addEventListener("click", function (e) { if (e.target === drawer) setDrawer(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__i");
      var open = item.getAttribute("data-open") === "true";
      item.parentElement.querySelectorAll('.faq__i[data-open="true"]').forEach(function (o) { if (o !== item) o.setAttribute("data-open", "false"); });
      item.setAttribute("data-open", open ? "false" : "true");
      q.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var box = form.querySelector(".formout");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var phoneEl = form.querySelector('[name="phone"]');
      var phone = phoneEl ? phoneEl.value.trim() : "";
      if (phone.replace(/\D/g, "").length < 6) {
        if (box) { box.className = "formout msg--err"; box.textContent = "Укажите телефон — перезвоним и согласуем время визита мастера."; }
        if (phoneEl) phoneEl.focus();
        return;
      }
      var labels = { name: "Имя", phone: "Телефон", what: "Процедура", where: "Гость", size: "Человек", when: "Когда", message: "Пожелания" };
      var lines = ["Запись в салон «ПроТело»:"];
      ["name", "phone", "what", "size", "where", "when", "message"].forEach(function (k) {
        var el = form.querySelector('[name="' + k + '"]');
        if (el && el.value && el.value.trim()) lines.push(labels[k] + ": " + el.value.trim());
      });
      lines.push(form.getAttribute("data-form") || "Прошу сориентировать по цене и времени.");
      var text = lines.join("\n");
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank");
      if (box) { box.className = "formout"; box.textContent = "Открыли WhatsApp с готовым сообщением — останется нажать «Отправить». Если срочно, звоните: +375 (29) 528-60-50."; }
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
