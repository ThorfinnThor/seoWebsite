# Launch readiness

Run the complete technical verification first:

```bash
npm run verify
```

Then print the launch-specific external and content checks:

```bash
npm run readiness
```

The launch has three useful levels:

1. **Technical preview:** all calculators, navigation and static pages work on the temporary Vercel URL. Empty affiliate catalogs are allowed.
2. **Public calculator launch:** add a reachable legal email, confirm the final legal text, select the public name/domain and verify the production deployment.
3. **Affiliate launch:** configure Awin feed access in GitHub, import and manually review products, verify tracking links and only then enable the scheduled feed refresh.

The script can verify repository and local build state. GitHub secrets, the final domain, legal approval, Awin program approval and real tracking transactions always require a manual check in the corresponding external service.
