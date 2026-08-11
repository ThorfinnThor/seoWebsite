# Awin onboarding for MachPlan

Checked against Awin's official German signup and Partner Success documentation on 2026-08-11.

## Before applying

The technical preview can run without affiliate data. For the strongest compliance and advertiser application, finish these public details first:

1. Configure a reachable `NEXT_PUBLIC_LEGAL_EMAIL` in Vercel so imprint and privacy notice are complete and indexable.
2. Replace the temporary Vercel address once the final name and domain are chosen, or update the promotional site in Awin later.
3. Keep the affiliate disclosure visible. MachPlan already has a dedicated transparency page and marks affiliate links in the product components.

Prepare the following private information without committing it to GitHub:

- full legal name and German tax residence;
- an email address for the Awin login;
- bank details for EUR payouts;
- the applicable German tax ID or tax number;
- a debit or credit card for Awin's signup deposit.

## Publisher signup

Open the official [German Awin publisher signup](https://ui.awin.com/publisher-signup/de/awin/step1).

### 1. Account creation

- **Publisher name:** `MachPlan` while this is the public working name. If a registered company operates the site, use its legal company name instead.
- **Tax residence:** `Germany` / `Deutschland`.
- **First name:** `Schayan`.
- **Last name:** `Yousefian`.
- Enter the chosen account email twice and create a unique password of at least 12 characters.
- Select **Next step**.

### 2. Publisher segment

Choose the closest content/editorial website category. MachPlan is a content and decision-support publisher with calculators; it is not a cashback, voucher, influencer-only or paid-search business.

### 3. Promotional site

Use the current public address until the final domain exists:

```text
https://seo-website-woad.vercel.app/
```

Suggested German description:

```text
MachPlan ist eine deutschsprachige Content- und Rechner-Website für Haus- und Gartenprojekte. Besucher berechnen ihren Bedarf mit transparenten Planungsregeln und erhalten anschließend nur fachlich passende, manuell geprüfte Produktempfehlungen. Affiliate-Provisionen beeinflussen das Ranking nicht; Werbung und Affiliate-Links werden klar gekennzeichnet.
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
4. Select the content promotion type, accept each programme's conditions and use this short application message where appropriate:

```text
Deutschsprachige Haus-&-Garten-Rechner mit transparentem Bedarfsscore; nur passende, manuell geprüfte Produkte, klar gekennzeichnete Affiliate-Links.
```

5. Track applications under **Advertisers → My programmes → Pending**.

## Product feeds for this repository

Only configure feeds after the relevant advertiser programmes have approved the account.

1. In Awin open **Toolbox → Create-a-Feed**.
2. Select approved advertisers, categories and the required columns.
3. Create or copy the reusable feed download URLs. Awin notes that the product-feed API key is different from the Publisher API token.
4. Store the complete URLs only in the GitHub Actions repository secret `AWIN_FEED_URLS_JSON`, as a JSON array of strings.
5. In GitHub open **Actions → Sync affiliate product feeds → Run workflow**.
6. Review new candidates under `data/review/`. Only products explicitly marked `reviewed: true` can enter public recommendations.
7. Keep the schedule disabled in practice until at least one manual import and link test has succeeded.

Never add Awin keys, feed download URLs or API tokens to Vercel, `.env.example`, `public/` or committed source files.

## Official references

- [Awin publisher signup](https://ui.awin.com/publisher-signup/de/awin/step1)
- [Awin publisher FAQ](https://www.awin.com/de/faq)
- [Manage promotional sites](https://success.awin.com/articles/de/Knowledge/How-do-I-add-or-edit-my-promotional-sites)
- [Join an advertiser programme](https://success.awin.com/articles/de/Knowledge/How-do-I-join-an-advertiser-programme)
- [Access product data feeds](https://success.awin.com/articles/de/Knowledge/How-can-I-access-a-Product-Feed)
- [Publisher tax details](https://success.awin.com/articles/de/Knowledge/Publisher-Tax-Details-FAQs)
