(function () {
  "use strict";
  var data = window.SHAN_D_SITE || {};

  // On the live site, read the editor-managed JSON files. The bundled JS file
  // remains a fallback so the site still previews when opened from a folder.
  function loadSiteContent() {
    if (!window.fetch || window.location.protocol === "file:") return Promise.resolve(data);
    var files = ["content/music.json", "content/shows.json", "content/site-details.json"];
    return Promise.all(files.map(function (path) {
      return fetch(path, { cache: "no-store" }).then(function (response) {
        if (!response.ok) throw new Error("Could not load " + path);
        return response.json();
      });
    })).then(function (parts) {
      return Object.assign({}, data, parts[2], {
        music: Array.isArray(parts[0].music) ? parts[0].music : [],
        shows: Array.isArray(parts[1].shows) ? parts[1].shows : []
      });
    });
  }
  var musicGrid = document.getElementById("music-grid");
  var showsList = document.getElementById("shows-list");
  var newsletterForm = document.getElementById("newsletter-form");
  var newsletterStatus = document.getElementById("newsletter-status");
  var newsletterSetupNote = document.getElementById("newsletter-setup-note");

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function validExternalUrl(value) {
    try {
      var url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch (error) { return ""; }
  }
  function validBandcampEmbed(value) {
    var href = validExternalUrl(value);
    if (!href) return "";
    var url = new URL(href);
    return url.hostname === "bandcamp.com" && url.pathname.indexOf("/EmbeddedPlayer/") === 0 ? href : "";
  }
  function renderMusic() {
    var items = Array.isArray(data.music) ? data.music : [];
    if (!items.length) {
      musicGrid.innerHTML = '<div class="empty-state empty-state--music"><span class="empty-state__symbol">∿</span><p>Your next release will land here.</p></div>';
      return;
    }
    musicGrid.innerHTML = items.map(function (item, index) {
      var style = ["acid", "violet", "orange", "blue", "mono"].indexOf(item.coverStyle) > -1 ? item.coverStyle : "acid";
      var image = validExternalUrl(item.artwork) || (item.artwork && /^[a-z0-9/_-]+\.(png|jpe?g|webp)$/i.test(item.artwork) ? item.artwork : "");
      var coverContents = image
        ? '<img src="' + escapeHTML(image) + '" alt="" loading="lazy">'
        : '<span class="cover-lines" aria-hidden="true"></span><span class="cover-orbit" aria-hidden="true"></span><span class="cover-index" aria-hidden="true">SD / ' + String(index + 1).padStart(2, "0") + '</span>';
      var buyUrl = validExternalUrl(item.buyUrl);
      var buyLabel = escapeHTML(item.buyLabel || "BUY DOWNLOAD");
      var playerUrl = validBandcampEmbed(item.bandcampEmbed);
      var preview = playerUrl
        ? '<button class="listen-link" type="button" aria-expanded="false" data-embed-url="' + escapeHTML(playerUrl) + '" data-item-title="' + escapeHTML(item.title || "release") + '">LISTEN ON THIS PAGE <span aria-hidden="true">▶</span></button><div class="bandcamp-preview" hidden></div>'
        : "";
      var purchase = buyUrl
        ? '<a class="buy-link" href="' + escapeHTML(buyUrl) + '" target="_blank" rel="noopener noreferrer">' + buyLabel + ' <span aria-hidden="true">↗</span></a>'
        : '<button class="buy-link buy-link--disabled" type="button" disabled>ADD CHECKOUT LINK <span aria-hidden="true">↗</span></button>';
      var badge = item.badge ? '<span class="release-badge">' + escapeHTML(item.badge) + '</span>' : "";
      return '<article class="release-card reveal"><div class="release-art release-art--' + style + '">' + coverContents + badge
        + '<span class="release-art__type">' + escapeHTML(item.format || "DIGITAL RELEASE") + '</span></div>'
        + '<div class="release-info"><div class="release-info__top"><div><p class="release-type">' + escapeHTML(item.format || "DIGITAL RELEASE") + '</p><h3>' + escapeHTML(item.title || "Untitled release") + '</h3></div><span class="release-price">' + escapeHTML(item.price || "") + '</span></div>'
        + '<p class="release-description">' + escapeHTML(item.description || "") + '</p>' + preview + purchase + '</div></article>';
    }).join("");
  }
  function configureBandcampPreviews() {
    musicGrid.addEventListener("click", function (event) {
      var button = event.target.closest(".listen-link");
      if (!button) return;
      var panel = button.nextElementSibling;
      var opening = panel.hidden;
      musicGrid.querySelectorAll(".listen-link").forEach(function (other) {
        if (other === button) return;
        other.setAttribute("aria-expanded", "false");
        other.innerHTML = 'LISTEN ON THIS PAGE <span aria-hidden="true">▶</span>';
        other.nextElementSibling.hidden = true;
        other.nextElementSibling.replaceChildren();
        other.closest(".release-card").classList.remove("is-playing");
      });
      panel.hidden = !opening;
      button.setAttribute("aria-expanded", String(opening));
      button.innerHTML = opening
        ? 'CLOSE PLAYER <span aria-hidden="true">×</span>'
        : 'LISTEN ON THIS PAGE <span aria-hidden="true">▶</span>';
      button.closest(".release-card").classList.toggle("is-playing", opening);
      if (!opening) {
        panel.replaceChildren();
        return;
      }
      var iframe = document.createElement("iframe");
      iframe.src = button.getAttribute("data-embed-url");
      iframe.title = "Bandcamp player for " + (button.getAttribute("data-item-title") || "release");
      iframe.loading = "lazy";
      iframe.allow = "autoplay";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      panel.appendChild(iframe);
    });
  }
  function formatShowDate(show) {
    if (show.dateLabel) return escapeHTML(show.dateLabel);
    if (!show.date) return "DATE TBA";
    var parsed = new Date(show.date + "T12:00:00");
    if (Number.isNaN(parsed.getTime())) return escapeHTML(show.date);
    return escapeHTML(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(parsed).toUpperCase());
  }
  function renderShows() {
    var shows = Array.isArray(data.shows) ? data.shows.slice() : [];
    shows = shows.filter(function (show) { return show && (show.date || show.dateLabel || show.venue || show.city); });
    shows.sort(function (a, b) { return String(a.date || "9999").localeCompare(String(b.date || "9999")); });
    if (!shows.length) {
      showsList.innerHTML = '<div class="empty-state empty-state--shows"><span class="empty-state__symbol">◎</span><p>Show dates will appear here as soon as they are announced.</p><a href="#newsletter">Get the next date first <span aria-hidden="true">↗</span></a></div>';
      return;
    }
    showsList.innerHTML = shows.map(function (show) {
      var ticketUrl = validExternalUrl(show.ticketUrl);
      var title = [show.venue, show.city].filter(Boolean).map(escapeHTML).join(' <span aria-hidden="true">/</span> ');
      var ticket = ticketUrl
        ? '<a class="show-ticket" href="' + escapeHTML(ticketUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="Tickets for ' + escapeHTML(show.venue || "show") + '">TICKETS <span aria-hidden="true">↗</span></a>'
        : '<span class="show-ticket show-ticket--tba">TICKETS TBA</span>';
      return '<article class="show-row reveal"><time class="show-date">' + formatShowDate(show) + '</time><div class="show-details"><h3>' + (title || "Venue / City TBA") + '</h3><p>' + escapeHTML(show.event || "LIVE SET") + '</p></div>' + ticket + '</article>';
    }).join("");
  }
  function renderAbout() { document.getElementById("about-copy").textContent = data.about || ""; }
  function renderSocials() {
    var target = document.getElementById("footer-socials");
    var socials = Array.isArray(data.socials) ? data.socials : [];
    var available = socials.filter(function (item) { return item && item.label && validExternalUrl(item.url); });
    target.innerHTML = available.map(function (item) {
      return '<a href="' + escapeHTML(validExternalUrl(item.url)) + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(item.label) + ' <span aria-hidden="true">↗</span></a>';
    }).join("");
  }
  function configureNewsletter() {
    var settings = data.newsletter || {};
    var action = validExternalUrl(settings.action);
    if (!action) {
        newsletterStatus.textContent = "The mailing list is being set up. Check back soon for new drops and dates.";
      newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        newsletterSetupNote.hidden = false;
        newsletterSetupNote.textContent = "Mailing list signups are not connected yet. Add your email provider's form link in the website editor to enable this.";
      });
      return;
    }
    newsletterForm.action = action;
    newsletterForm.method = settings.method === "get" ? "get" : "post";
    document.getElementById("newsletter-email").name = settings.emailField || "email";
      var extraFields = settings.extraFields || [];
      if (!Array.isArray(extraFields)) {
        extraFields = Object.keys(extraFields).map(function (key) {
          return { name: key, value: extraFields[key] };
        });
      }
      extraFields.forEach(function (field) {
        var key = field && field.name;
        if (!key) return;
      var hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.name = key;
        hidden.value = String(field.value || "");
      newsletterForm.appendChild(hidden);
    });
    newsletterStatus.textContent = "No noise. Just new drops and dates.";
  }
  function configureMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("primary-nav");
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
  function configureReveal() {
    if (!("IntersectionObserver" in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (item) { observer.observe(item); });
  }
  loadSiteContent().catch(function () { return data; }).then(function (content) {
    data = content;
    renderMusic();
    configureBandcampPreviews();
    renderShows();
    renderAbout();
    renderSocials();
    configureNewsletter();
    configureMenu();
    document.getElementById("year").textContent = new Date().getFullYear();
    configureReveal();
  });
})();
