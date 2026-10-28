/*
  Local preview fallback used when index.html is opened directly from a folder.
  On the live website, edit music, shows and site details from /admin/ instead.
  Bandcamp links open the release checkout and deliver the digital download.
*/
window.SHAN_D_SITE = {
  artist: "SHAN-D",
  about: "UK-based dubstep and grime producer, specialising in 140 BPM. Explore the catalogue, catch a live set, and get the next drop straight to your inbox.",
  music: [
    { title: "Full Digital Discography", format: "14 RELEASES / 20% OFF", price: "£22.80+", description: "All 14 Shan-D releases in one digital collection.", buyUrl: "https://shan-d.bandcamp.com/track/red-card#b113470783-buy", buyLabel: "BUY DIGITAL DISCOGRAPHY", coverStyle: "acid", badge: "SAVE 20%" },
    { title: "Average Man (Shan-D Remix) EP", format: "DIGITAL EP / MR NAYLOR + SHAN-D", price: "£2.00+", description: "The remix plus the instrumental version.", buyUrl: "https://shan-d.bandcamp.com/album/average-man-shan-d-remix-ep", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/album=3955889096/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/average-man.jpg", buyLabel: "BUY ON BANDCAMP", badge: "LATEST" },
    { title: "Red Card", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/red-card", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=2950673230/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/red-card.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Set Us Free (Free Download)", format: "DIGITAL TRACK / NAME YOUR PRICE", price: "FREE / PAY WHAT YOU WANT", description: "Download for free or choose what you pay.", buyUrl: "https://shan-d.bandcamp.com/track/set-us-free-free-download", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=2035969119/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/set-us-free.jpg", buyLabel: "GET ON BANDCAMP", badge: "FREE DOWNLOAD" },
    { title: "SZR", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/szr", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=2163260608/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/szr.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Raaah", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/raaah", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=3963074559/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/raaah.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Cracked", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/cracked", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=3339172928/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/cracked.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Morning Dew", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/morning-dew", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=1019283011/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/morning-dew.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Blackness", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/blackness", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=1526585799/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/blackness.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Wolf In The Estate", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/wolf-in-the-estate", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=2632700107/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/wolf-in-the-estate.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Man Of Style", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/man-of-style", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=3503882950/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/man-of-style.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Ash In The Air", format: "DIGITAL TRACK", price: "£1.50+", description: "Digital single from the Shan-D catalogue.", buyUrl: "https://shan-d.bandcamp.com/track/ash-in-the-air", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/track=1224679685/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/ash-in-the-air.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Dub In My Veins EP", format: "DIGITAL EP / 5 TRACKS", price: "£5.00+", description: "Includes the original, VIP, Screwface Remix, Freya and Smoke In My Air Max.", buyUrl: "https://shan-d.bandcamp.com/album/dub-in-my-veins-ep", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/album=1252960791/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/dub-in-my-veins.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Shan-DJ Vol. 2", format: "DIGITAL ALBUM / 4 TRACKS", price: "£4.00+", description: "Braaap, TTK, Marathon and Drop.", buyUrl: "https://shan-d.bandcamp.com/album/shan-dj-vol-2", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/album=3655280205/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/shan-dj-vol-2.jpg", buyLabel: "BUY ON BANDCAMP" },
    { title: "Shan-DJ Vol. 1", format: "DIGITAL ALBUM / 4 TRACKS", price: "£4.00+", description: "Chesty, Never Look Back, Grimey and Rinse Out The Estate.", buyUrl: "https://shan-d.bandcamp.com/album/shan-dj-vol-1", bandcampEmbed: "https://bandcamp.com/EmbeddedPlayer/v=2/album=485174649/size=large/bgcol=10100f/linkcol=ed1c2e/tracklist=false/artwork=small/transparent=true/", artwork: "assets/covers/shan-dj-vol-1.jpg", buyLabel: "BUY ON BANDCAMP" }
  ],
  // Add mix listings to content/mixes.json in the online editor.
  mixes: [],
  // Add show dates here. Use date as YYYY-MM-DD, or provide dateLabel to control its display.
  shows: [],
  // Add your provider's standard form POST URL to enable signups.
  // emailField defaults to "email"; extraFields lets you add provider-required hidden fields.
  newsletter: { action: "", method: "post", emailField: "email", extraFields: {} },
  // Empty URLs are hidden from the footer.
  socials: [
    { label: "SoundCloud", url: "" },
    { label: "Instagram", url: "" },
    { label: "YouTube", url: "" }
  ]
};
