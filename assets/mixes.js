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
      if (url.protocol !== "https:" && url.protocol !== "http:") return "";
      if (host === "w.soundcloud.com" && url.pathname.indexOf("/player/") === 0) {
        var embeddedLink = url.searchParams.get("url");
        return embeddedLink ? validSoundCloudLink(embeddedLink) : "";
      }
      if (host !== "soundcloud.com" && !host.endsWith(".soundcloud.com")) return "";
      url.protocol = "https:";
      return url.href;
    } catch (error) {
      return "";
    }
  }

  function validAudioFile(value) {
    if (!value || typeof value !== "string") return "";
    try {
      var url = new URL(value, window.location.origin + "/");
      var extension = url.pathname.split(".").pop().toLowerCase();
      if (url.origin !== window.location.origin) return "";
      if (url.pathname.indexOf("/assets/mixes/") !== 0) return "";
      if (["mp3", "m4a", "aac", "wav", "ogg"].indexOf(extension) === -1) return "";
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

  function renderSocials(socials) {
    var target = document.getElementById("footer-socials");
    if (!target) return;
    var available = Array.isArray(socials) ? socials.filter(function (item) {
      if (!item || !item.label || !item.url) return false;
      try {
        var url = new URL(item.url);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch (error) {
        return false;
      }
    }) : [];
    target.innerHTML = available.map(function (item) {
      return '<a href="' + escapeHTML(item.url) + '" target="_blank" rel="noopener noreferrer">'
        + escapeHTML(item.label) + ' <span aria-hidden="true">↗</span></a>';
    }).join("");
  }

  function renderMixes(mixes) {
    var available = Array.isArray(mixes) ? mixes.map(function (mix) {
      if (!mix || !mix.title) return null;
      var source = mix.source || "";
      if (source === "upload") {
        var audioFile = validAudioFile(mix.audioFile);
        return audioFile ? { mix: mix, type: "upload", url: audioFile } : null;
      }
      if (source === "soundcloud") {
        var soundCloudLink = validSoundCloudLink(mix.soundcloudLink);
        return soundCloudLink ? { mix: mix, type: "soundcloud", url: soundCloudLink } : null;
      }
      // Existing entries without a source choice keep working when their link is valid.
      var legacySoundCloudLink = validSoundCloudLink(mix.soundcloudLink);
      if (legacySoundCloudLink) return { mix: mix, type: "soundcloud", url: legacySoundCloudLink };
      var legacyAudioFile = validAudioFile(mix.audioFile);
      return legacyAudioFile ? { mix: mix, type: "upload", url: legacyAudioFile } : null;
    }).filter(Boolean) : [];

    if (!available.length) {
      list.innerHTML = '<div class="mix-empty"><span class="mix-empty__mark" aria-hidden="true">∿</span><h3>Mixes coming soon.</h3><p>New sessions will appear here when they are added.</p></div>';
      return;
    }

    list.innerHTML = available.map(function (entry) {
      var mix = entry.mix;
      var note = mix.description ? '<p class="mix-card__note">' + escapeHTML(mix.description) + '</p>' : "";
      var player = entry.type === "soundcloud"
        ? '<iframe class="mix-card__player" src="' + escapeHTML(playerUrl(entry.url))
          + '" title="SoundCloud player for ' + escapeHTML(mix.title)
          + '" loading="lazy" allow="autoplay" referrerpolicy="strict-origin-when-cross-origin"></iframe>'
        : '<p class="mix-card__eyebrow mix-card__eyebrow--player">SHAN-D PLAYER / UPLOADED AUDIO</p><audio class="mix-card__audio" controls preload="metadata" src="'
          + escapeHTML(entry.url) + '" aria-label="Play ' + escapeHTML(mix.title)
          + '"><a href="' + escapeHTML(entry.url) + '">Play or download this mix</a></audio>';
      var sourceLink = entry.type === "soundcloud"
        ? '<a class="mix-card__link" href="' + escapeHTML(entry.url) + '" target="_blank" rel="noopener noreferrer">OPEN ON SOUNDCLOUD <span aria-hidden="true">↗</span></a>'
        : '<a class="mix-card__link" href="' + escapeHTML(entry.url) + '" download>DOWNLOAD AUDIO <span aria-hidden="true">↓</span></a>';

      return '<article class="mix-card"><div class="mix-card__copy"><p class="mix-card__eyebrow">SHAN-D / '
        + (entry.type === "soundcloud" ? "SOUNDCLOUD MIX" : "MIX ARCHIVE") + '</p><h3>'
        + escapeHTML(mix.title) + '</h3>' + note + '</div>' + player + sourceLink + '</article>';
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

  function loadSocials() {
    if (!window.fetch || window.location.protocol === "file:") {
      renderSocials(data.socials);
      return;
    }
    fetch("../content/site-details.json", { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) throw new Error("Could not load social links");
        return response.json();
      })
      .then(function (content) { renderSocials(content.socials); })
      .catch(function () { renderSocials(data.socials); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  configureMenu();
  loadMixes();
  loadSocials();
})();
