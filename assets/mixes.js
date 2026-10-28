(function () {
  "use strict";

  var data = window.SHAN_D_SITE || {};
  var list = document.getElementById("mixes-list");
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");

  function escapeHTML(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function validSoundCloudLink(value) {
    try {
      var url = new URL(value);
      var host = url.hostname.toLowerCase();
      if (url.protocol !== "https:") return "";
      if (host !== "soundcloud.com" && host !== "www.soundcloud.com" && host !== "on.soundcloud.com") return "";
      return url.href;
    } catch (error) {
      return "";
    }
  }

  function playerUrl(soundCloudLink) {
    var url = new URL("https://w.soundcloud.com/player/");
    url.searchParams.set("url", soundCloudLink);
    url.searchParams.set("color", "ed1c2e");
    url.searchParams.set("auto_play", "false");
    url.searchParams.set("hide_related", "true");
    url.searchParams.set("show_comments", "false");
    url.searchParams.set("show_user", "true");
    url.searchParams.set("show_reposts", "false");
    url.searchParams.set("show_teaser", "true");
    return url.href;
  }

  function renderMixes(mixes) {
    var available = Array.isArray(mixes) ? mixes.filter(function (mix) {
      return mix && mix.title && validSoundCloudLink(mix.soundcloudLink);
    }) : [];

    if (!available.length) {
      list.innerHTML = '<div class="mix-empty"><span class="mix-empty__mark" aria-hidden="true">∿</span><h3>Mixes coming soon.</h3><p>New sessions will appear here when they are added.</p></div>';
      return;
    }

    list.innerHTML = available.map(function (mix) {
      var link = validSoundCloudLink(mix.soundcloudLink);
      var note = mix.description ? '<p class="mix-card__note">' + escapeHTML(mix.description) + '</p>' : "";
      var iframe = '<iframe class="mix-card__player" src="' + escapeHTML(playerUrl(link))
        + '" title="SoundCloud player for ' + escapeHTML(mix.title)
        + '" loading="lazy" allow="autoplay" referrerpolicy="strict-origin-when-cross-origin"></iframe>';

      return '<article class="mix-card"><div class="mix-card__copy"><p class="mix-card__eyebrow">SHAN-D / SOUNDCLOUD MIX</p><h3>'
        + escapeHTML(mix.title) + '</h3>' + note + '</div>' + iframe
        + '<a class="mix-card__link" href="' + escapeHTML(link) + '" target="_blank" rel="noopener noreferrer">OPEN ON SOUNDCLOUD <span aria-hidden="true">↗</span></a></article>';
    }).join("");
  }

  function configureMenu() {
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  function loadMixes() {
    if (!window.fetch || window.location.protocol === "file:") {
      renderMixes(data.mixes);
      return;
    }
    fetch("../content/mixes.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("Could not load mix list");
        return response.json();
      })
      .then(function (content) { renderMixes(content.mixes); })
      .catch(function () { renderMixes(data.mixes); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  configureMenu();
  loadMixes();
})();
