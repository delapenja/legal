# Puna Ime 🇦🇱

**Llogaritësi i Afatit të Njoftimit për Zgjidhjen e Kontratës së Punës**
*Employment Termination Notice Period Calculator*

A bilingual (Albanian / English) static website that calculates employment termination notification periods, effective dates, and employee rights based on the **Albanian Labor Code** (Law no. 7961/1995, as amended — 2024 consolidated version).

## Features

- **Notice period calculation** — based on employment duration (Art. 142–143)
- **Termination process timeline** — key dates from initiation to effective termination (Art. 144)
- **Seniority compensation** — eligibility check and calculation (Art. 145)
- **Job search leave** — 20 hours/week entitlement (Art. 143.5)
- **Lawsuit deadline** — 180-day filing window (Art. 146.2)
- **Bilingual UI** — Albanian (default) and English, with localStorage persistence
- **Print-ready** — clean print layout for saving results
- **Mobile responsive** — works on all screen sizes

## Legal Reference

Based on the Albanian Labor Code, Articles 140–158:

| Employment Duration          | Notice Period | Article   |
|------------------------------|---------------|-----------|
| During probation (≤3 months) | 5 days        | Art. 142  |
| Up to 6 months               | 2 weeks       | Art. 143  |
| Over 6 months – 2 years      | 1 month       | Art. 143  |
| Over 2 years – 5 years       | 2 months      | Art. 143  |
| Over 5 years                 | 3 months      | Art. 143  |

**Art. 143.3**: Notice period extends to end of week (2-week notice) or end of month (1/2/3-month notices).

## Deployment

This is a static site — no build step required. Deploy directly to GitHub Pages:

1. Push to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder `/`
4. Site will be available at `https://<username>.github.io/<repo-name>/`

## Local Development

Simply open `index.html` in any browser, or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

## Project Structure

```
├── index.html          # Main page
├── css/
│   └── style.css       # Responsive styles + print layout
├── js/
│   ├── i18n.js         # Albanian/English translations
│   └── app.js          # Calculation engine + UI logic
└── README.md
```

## Disclaimer

This tool is for **informational purposes only** and does not constitute legal advice. Always refer to the official Albanian Labor Code and consult a legal professional for specific situations.

## License

MIT
