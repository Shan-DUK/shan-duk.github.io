# Shan-D website

This is the source for the Shan-D music website. The shop uses Bandcamp for checkout and digital downloads. Fans buy music on the artist's Bandcamp pages; the website does not collect card or PayPal details.

## Public website

The project includes `netlify.toml` so Netlify can publish it as a static site. After the `Shan-DUK/shan-duk.github.io` GitHub repository is connected to Netlify, the live site deploys from the `main` branch whenever it changes. The site does not need a build command.

The homepage is the landing page. Shows, Music, Mixes and About each have their own page, with shared navigation between them. The mailing-list signup stays on the homepage.

## Simple online editor

The `/admin/` page links to Pages CMS, an online editor that signs in with GitHub and saves edits to the repository.

1. Open the `/admin/` page.
2. Sign in to Pages CMS with the GitHub account that owns this repository.
3. Give the Pages CMS GitHub App access to this repository only.
4. Choose a numbered section:
   - **1. Music shop** — release names, prices, artwork, previews and Bandcamp links.
   - **2. Upcoming shows** — dates, venues, cities and ticket links.
   - **3. Mixes** — mix names and notes, with a SoundCloud link or an uploaded audio file.
   - **4. Website info** — About text, artist photos, social links and mailing-list form details.
5. Save. Netlify deploys the update automatically.

The [plain-English editing guide](admin/help.html) has short step-by-step instructions.

SoundCloud links and uploaded audio are added to the public website. Anyone who visits the site can listen to those mixes, so only add content you want everyone to hear.

## Content and images

- `content/music.json` holds the releases shown in the shop.
- `content/shows.json` holds upcoming dates.
- `content/mixes.json` holds the mixes and their SoundCloud links.
- `content/site-details.json` holds the About text, artist photos, socials and newsletter settings.
- `.pages.yml` defines the simple edit forms and the cover-art, artist-photo and mix-audio upload folders.
- `assets/covers/` holds release cover art. Upload new covers through the editor.
- `assets/artist/` holds artist photos. Add or replace them through **4. Website info → Photos of Shan-D**.

## Mailing list

The homepage embeds the published Google Form. It collects an email address and a required consent choice. Form responses are stored in the Google account that owns the form, not in public website files. A private linked spreadsheet called **Fan Mailing List** keeps the sign-ups in a simple table. The Pages CMS editor's **4. Website info → Mailing list sign-up** setting holds only the public responder link.

When Shan-D asks for a mailing-list email, use the current Google Form responses as the subscriber list, check Gmail for any `UNSUBSCRIBE` requests before sending, and send recipients as BCC from the connected Gmail account. Include `Reply UNSUBSCRIBE to stop receiving emails` in each message. Drafting copy does not send it; send only when Shan-D explicitly asks. There are no subscribers yet, so the first campaign should wait until people sign up.

## Bandcamp and payouts

Bandcamp handles checkout and digital delivery. Set or confirm the payout details in the Shan-D Bandcamp account. Never put a PayPal password, bank details, or payment API key in this public repository.
