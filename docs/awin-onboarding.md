# Awin onboarding for PassendPlanen

Checked against Awin's official German signup and Partner Success documentation on 2026-08-11.

## Before applying

The technical preview can run without affiliate data. For the strongest compliance and advertiser application, finish these public details first:

1. Confirm that the public legal contact is `info@passendplanen.de`; optionally mirror it as `NEXT_PUBLIC_LEGAL_EMAIL` in Vercel.
2. Use the canonical production domain `https://www.passendplanen.de/` as the promotional site.
3. Keep the affiliate disclosure visible. PassendPlanen already has a dedicated transparency page and marks affiliate links in the product components.

Prepare the following private information without committing it to GitHub:

- full legal name and German tax residence;
- an email address for the Awin login;
- bank details for EUR payouts;
- the applicable German tax ID or tax number;
- a debit or credit card for Awin's signup deposit.

## Publisher signup

Open the official [German Awin publisher signup](https://ui.awin.com/publisher-signup/de/awin/step1).

### 1. Account creation

- **Publisher name:** `PassendPlanen`. If a registered company operates the site, use its legal company name instead.
- **Tax residence:** `Germany` / `Deutschland`.
- **First name:** `Schayan`.
- **Last name:** `Yousefian`.
- Enter the chosen account email twice and create a unique password of at least 12 characters.
- Select **Next step**.

### 2. Publisher segment

Choose the closest content/editorial website category. PassendPlanen is a content and decision-support publisher with calculators; it is not a cashback, voucher, influencer-only or paid-search business.

### 3. Promotional site

Use the production address:

```text
https://www.passendplanen.de/
```

Suggested German description:

```text
PassendPlanen ist eine deutschsprachige Content- und Rechner-Website für Haus- und Gartenprojekte. Besucher berechnen ihren Bedarf mit transparenten Planungsregeln und erhalten anschließend nur fachlich passende, manuell geprüfte Produktempfehlungen. Affiliate-Provisionen beeinflussen das Ranking nicht; Werbung und Affiliate-Links werden klar gekennzeichnet.
```

Suggested promotion description if a separate short field is shown:

```text
SEO-Ratgeber, kostenlose Projekt-Rechner, interne Themencluster und kontextbezogene Produktempfehlungen auf der eigenen Website. Kein Cashback, keine Gutscheine und kein Brand-Bidding.
```

Select the Haus, Garten, Heimwerken or closely matching sectors offered by the form. Do not claim traffic figures that are not yet available.

### 4. Verification

Complete the identity/payment verification shown by Awin and submit the application. Awin's current German FAQ states a one-time EUR 1 deposit, credited back through the publisher account after the relevant first payout threshold. The amount displayed in the live signup form is authoritative if Awin changes it.

## After Awin approves the publisher account

1. Open **Account → Profile → Promotional sites** and verify the URL and description. Awin documents the action as **Add content site** for an additional website.
2. Open **Account → Payment details** and enter the correct bank and tax details. Awin cannot provide individual tax advice.
3. Open **Advertisers → Join programmes** and apply only to merchants whose range and data quality fit the current calculators.
4. Select the content promotion type, accept each programme's conditions and copy the matching English message from [English Awin application messages](./awin-application-messages-en.md). Every message is below Awin's current 150-character limit.

5. Track applications under **Advertisers → My programmes → Pending**.

## Advertiser application order

Programme profiles and IDs were rechecked against Awin on 2026-08-15. Apply only after the public site shows the PassendPlanen brand, the canonical `https://www.passendplanen.de/` URL and a complete legal contact.

### Confirmed active programmes

Woodstore24 DE/AT (Awin advertiser ID `48707`) is now approved and enabled in the repository registry. Its current import scope is the supported flooring catalog; terrace decking and privacy-screen product catalogs remain separate follow-up adapters. Once Awin exposes the programme in the feed list, the next manual sync will discover it automatically.

### Wave 1: strongest calculator fit

| Order | Programme | Awin ID | Primary calculators |
| ---: | --- | ---: | --- |
| 1 | [GFP-international DE](https://ui.awin.com/merchant-profile/26365) | 26365 | Greenhouse, garden house, carport |
| 2 | [GartenHaus GmbH (DE)](https://ui.awin.com/merchant-profile/22747) | 22747 | Garden house, carport, terrace |
| 3 | [Woodstore24 DE/AT](https://ui.awin.com/merchant-profile/48707) | 48707 | Terrace, privacy screen, flooring |
| 4 | [LaminatDEPOT DE](https://ui.awin.com/merchant-profile/69012) | 69012 | Flooring |
| 5 | [Meaco GmbH DE](https://ui.awin.com/merchant-profile/45487) | 45487 | Dehumidifier |
| 6 | [Benz24 DE/AT](https://ui.awin.com/merchant-profile/18314) | 18314 | Drywall, terrace, privacy screen, irrigation |

Use the matching English message from [English Awin application messages](./awin-application-messages-en.md) for each programme. The messages are personalized to the advertiser and checked against Awin's current 150-character limit.

### Wave 2: broad coverage and additional model choice

| Order | Programme | Awin ID | Role |
| ---: | --- | ---: | --- |
| 7 | [OBI DE](https://ui.awin.com/merchant-profile/9326) | 9326 | Broad fallback for nine calculators |
| 8 | [Gartenfachmarkt24 DE](https://ui.awin.com/merchant-profile/112978) | 112978 | Greenhouse and garden-house alternative |
| 9 | [Ecovacs DE](https://ui.awin.com/merchant-profile/30763) | 30763 | Robot mower models |
| 10 | [ANTHBOT DE](https://ui.awin.com/merchant-profile/125144) | 125144 | Additional robot mower models |
| 11 | [Globus Baumarkt DE](https://ui.awin.com/merchant-profile/11830) | 11830 | Broad DIY backup |

Do not start A/B tests when these programmes are merely approved. First validate feeds, product attributes, shipping-price handling and outgoing links. The repository keeps every programme disabled until `applicationStatus` is `active`, and the scheduled feed workflow additionally requires the repository variable `AWIN_FEED_SCHEDULE_ENABLED=true` after a successful manual run.

## Product feeds for this repository

Only configure feeds after the relevant advertiser programmes have approved the account.

1. In Awin open **Toolbox → Create-a-Feed**.
2. Select approved advertisers, categories and the required columns.
3. Create or copy the reusable feed download URLs. Awin notes that the product-feed API key is different from the Publisher API token.
   Include the stock and purchase fields `in_stock`, `stock_status` and `is_for_sale` in every feed. Without them, the importer keeps offers unavailable until the stock state can be verified.
4. Store the feed configuration only in the GitHub Actions repository secret `AWIN_FEED_URLS_JSON`. Direct download URLs remain supported. If you want new joined German programmes to be discovered automatically, the secret can now contain the single `feedList` URL from Awin:

```json
{
  "feedList": "https://ui.awin.com/productdata-darwin-download/publisher/.../feedList"
}
```

The importer selects only joined German feeds from that list, allows only Awin product-data hosts, deduplicates URLs, chooses the most recently updated feed per advertiser and applies each enabled programme's configured vertical scope. A grouped configuration remains available when you want an explicit allowlist:

```json
{
  "garden-house": ["https://…"],
  "dehumidifier": ["https://…"],
  "irrigation": ["https://…"],
  "robot-mower": ["https://…"],
  "flooring": ["https://…"]
}
```
5. In GitHub open **Actions → Sync affiliate product feeds → Run workflow**.
6. Review new candidates under `data/review/` or run `npm run review:products` for a compact status. The importer now recognizes garden houses, dehumidifiers, irrigation components, robot mowers and flooring. Only products explicitly marked `reviewed: true` with `dataQuality: "mixed"` or `"curated"` in the matching override file can enter a public catalog.
7. Keep the schedule disabled until at least one manual import and link test has succeeded. Only then create the GitHub repository variable `AWIN_FEED_SCHEDULE_ENABLED` with value `true`.

Never add Awin keys, feed download URLs or API tokens to Vercel, `.env.example`, `public/` or committed source files.

## Official references

- [Awin publisher signup](https://ui.awin.com/publisher-signup/de/awin/step1)
- [Awin publisher FAQ](https://www.awin.com/de/faq)
- [Manage promotional sites](https://success.awin.com/articles/de/Knowledge/How-do-I-add-or-edit-my-promotional-sites)
- [Join an advertiser programme](https://success.awin.com/articles/de/Knowledge/How-do-I-join-an-advertiser-programme)
- [Access product data feeds](https://success.awin.com/articles/de/Knowledge/How-can-I-access-a-Product-Feed)
- [Publisher tax details](https://success.awin.com/articles/de/Knowledge/Publisher-Tax-Details-FAQs)
