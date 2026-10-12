# Data model and evidence labels

Each creator/channel record includes a unique ID, public display name, factual bio, niche, region when sourced, platform, language, source URL, profile/source URL, source name, last-checked date and a verification status.

- `source-listed`: the public channel appears on the cited source. This is not independent account verification.
- `needs-review`: candidate submitted by an admin/user; identity, Telugu content and source must be reviewed.
- `verified`: reserve for a profile whose claimed identity has actually been independently checked. The bundled dataset currently has no such claims.

Metrics should include the source and retrieval date in future data additions. Never infer engagement, rates, audience location, contact details or availability. Do not use fabricated profile pictures; the app uses initials and original UI artwork.

Creator imports require a unique ID, name, HTTPS profile URL and HTTPS source URL. The prototype stores imported records in local browser storage, not a shared database.
