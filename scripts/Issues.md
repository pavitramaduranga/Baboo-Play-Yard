# Baboo Play Yard Issues

## Phase 1

- [x] Remove phonics button and the entire feature.
- [x] Fix intermittent key press sound.
- [x] Improve the "Baboo Stories" button in the current UI.
- [x] Move the main welcome/play button slightly upward.
- [ ] Bring the full screen button to where the removed phonics button was.
- [x] Scan the codebase and remove unwanted code.
- [x] Fix number display text issue, previously shown as repeated number emojis.

## Phase 2

- [ ] Get a domain.
- [x] Host the site.
- [ ] Set up Buy Me a Coffee.
- [ ] Set up analytics.

## Phase 3

- [ ] Find 5 testers.
- [ ] Initiate influencer outreach.
- [ ] Write in Quora.

## Phase 4

- [ ] Add newsletter signup: "If you liked this, we have many more you might like."
- [x] Add a share button or share section so parents can easily share Baboo Play Yard with other families.

## SEO Analysis: Kids Keyboard Target

### Primary Goal

Target search intent around a safe, playful keyboard experience for young children. The strongest keyword theme should be "kids keyboard", supported by phrases like "keyboard game for toddlers", "toddler keyboard game", "keyboard play for kids", "safe keyboard game for kids", and "keyboard learning game for preschoolers".

### Current SEO Snapshot

- The home page is currently the best landing page for SEO because `keyBoard.html` redirects direct visitors back to the home page unless they enter through the Start Keyboard Play button.
- The home page now includes a keyword-focused title, meta description, Open Graph tags, Twitter card tags, structured data, and visible kids keyboard content.
- The gated keyboard page has `noindex`, so `index.html` remains the main page for "kids keyboard" discovery.
- The coloring pages page now has basic metadata and `noindex` while it is a coming-soon page.
- The site now has a visible footer and parent-focused FAQ content on the home page.
- Canonical URLs, `og:url`, and sitemap entries are still waiting on the final production domain.
- The site is very lightweight, which is good for performance, but external Google Fonts may still affect load timing. Performance should be tested after deployment.
- The current file name `keyBoard.html` is less SEO-friendly than a descriptive lowercase URL like `kids-keyboard.html`, but changing it requires updating links and the direct-entry guard.

### High Priority SEO Work

- [x] Rewrite the home page title to include the target phrase. Suggested title: `Kids Keyboard Game for Toddlers | Baboo Play Yard`.
- [x] Add a home page meta description. Suggested description: `Baboo Play Yard is a safe kids keyboard game for toddlers and preschoolers to press keys, see colorful feedback, and play with a parent nearby.`
- [x] Update the H1 or supporting copy so "kids keyboard" appears naturally near the top of the page.
- [x] Add a short content section on the home page that explains what the keyboard play does, who it is for, and why it is safer for parent-supervised play.
- [ ] Add canonical tags after deciding the production domain.
- [x] Add Open Graph and Twitter card metadata so shared links look polished.
- [x] Add structured data for the app, likely `WebApplication` or `SoftwareApplication`, with the audience set for young children and parents.
- [x] Decide whether `keyBoard.html` should remain gated. If it stays gated, optimize `index.html` as the main "kids keyboard" landing page and consider `noindex` for `keyBoard.html`.

### Medium Priority SEO Work

- [ ] Rename `keyBoard.html` to a cleaner lowercase URL such as `kids-keyboard.html` or `keyboard-play.html`.
- [ ] Rename `coloringPages.html` to `coloring-pages.html` for consistency and readability.
- [x] Add `robots.txt`.
- [ ] Add `sitemap.xml` after the final domain is selected.
- [x] Add a visible page footer with simple internal links: Keyboard Play, Coloring Pages, Baboo Stories.
- [x] Add a small FAQ section targeting parent search intent, such as safety, age range, sound, fullscreen, and whether it works offline.
- [ ] Add screenshots or preview images for richer sharing and future app-store style presentation.
- [ ] Consider self-hosting fonts or using font-display best practices to improve loading experience.

### Content Suggestions

- Add parent-focused copy: "A safe kids keyboard game for ages 1 to 5."
- Explain the core interaction: "Press any letter or number to see big colorful feedback, playful sounds, and friendly emoji reactions."
- Clarify supervision: "Designed for parent-supervised computer play."
- Avoid overclaiming safety. Use wording like "safer" and "parent-friendly" instead of implying complete protection.
- Add a simple FAQ:
  - Is Baboo Play Yard for toddlers?
  - Does it work with a laptop keyboard?
  - Can parents turn sound off?
  - Can children click the on-screen keyboard?
  - Is it free to use?
  Status: added to the home page.

### Technical SEO Suggestions

- Add a unique title and meta description to every HTML page.
- Add one clear H1 per page and keep headings in logical order.
- Add canonical URLs once the production domain is known.
- Add `robots.txt` and `sitemap.xml` for deployment. Status: `robots.txt` added; `sitemap.xml` is waiting on the production domain.
- Add social preview metadata using `og:title`, `og:description`, `og:type`, and `og:url`.
- Add structured data only for content that is visible and accurate.
- Keep Core Web Vitals strong: aim for fast loading, low layout shift, and responsive interactions.
- Test the deployed site with Google Search Console, PageSpeed Insights, and the Rich Results Test after hosting.

### Strategic Recommendation

Use `index.html` as the main SEO page for "kids keyboard" because it is the page visitors and crawlers can land on reliably. Keep the actual keyboard play behind the Start Keyboard Play button if that product decision matters, but make the home page much more explicit about the keyboard game so search engines and parents can understand the value before entering the play area.
