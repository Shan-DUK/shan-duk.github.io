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
   - **3. Mixes** — mix names, notes and SoundCloud private share links.
   - **4. Website info** — About text, social links and mailing-list form details.
5. Save. Netlify deploys the update automatically.

The [plain-English editing guide](admin/help.html) has short step-by-step instructions.

SoundCloud private share links are unlisted, not password-protected. Because this website and its source files are public, only add links for mixes you want everyone to hear.

## Content and images

- `content/music.json` holds the releases shown in the shop.
- `content/shows.json` holds upcoming dates.
- `content/mixes.json` holds the mixes and their SoundCloud links.
- `content/site-details.json` holds the About text, socials and newsletter settings.
- `.pages.yml` defines the simple edit forms and cover-art upload folder.
- `assets/covers/` holds release cover art. Upload new covers through the editor.

## Mailing list

The signup form is ready to connect but does not collect addresses yet. Choose an email service and enter its signup form address and field details in **4. Website info → Mailing list sign-up**. Never store the email account password in the website files.

## Bandcamp and payouts

Bandcamp handles checkout and digital delivery. Set or confirm the payout details in the Shan-D Bandcamp account. Never put a PayPal password, bank details, or payment API key in this public repository.
