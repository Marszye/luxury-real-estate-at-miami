# Vercel Deployment Checklist — marszye Luxury Real Estate SaaS

Production deployment guide for the $20,000 Luxury Real Estate SaaS on Vercel.

---

## 1. Environment Variables

Configure these in **Vercel → Project → Settings → Environment Variables**:

### Required (Production)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | `5sfaf5tk` |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | API version | `2024-03-01` |
| `SANITY_API_TOKEN` | **Server-only** write token for mutations | `sk...` |
| `RESEND_API_KEY` | Resend email API key | `re_...` |
| `CONTACT_EMAIL` | Lead notification recipient | `concierge@maison.com` |
| `API_SIGNATURE_SECRET` | Request signing secret | Base64 string |
| `LEAD_ENCRYPTION_KEY` | Lead PII encryption | Base64 string |
| `REVALIDATION_SECRET` | Sanity webhook auth | Random secret |
| `DRAFT_SECRET` | Draft mode auth (optional) | Random secret |

### Optional

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | AI concierge / vision analysis |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role (server-only) |

### Security Rules

- **Never** expose `SANITY_API_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`, or `API_SIGNATURE_SECRET` to the browser.
- Use `NEXT_PUBLIC_` prefix only for values that must be client-visible (e.g. project IDs, dataset).

---

## 2. Sanity Webhook Setup

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project.
2. **API** → **Webhooks** → **Add webhook**.
3. Configure:
   - **Name:** Vercel Revalidation
   - **URL:** `https://your-domain.vercel.app/api/revalidate`
   - **Trigger:** On create, update, delete (all document types)
   - **Projection:** `{ _type, "slug": slug.current }`
   - **HTTP method:** POST
   - **API version:** 2024-03-01
   - **Secret:** Same value as `REVALIDATION_SECRET` in Vercel
4. In **Headers**, add: `Authorization` = `Bearer <REVALIDATION_SECRET>` (use the same value as `REVALIDATION_SECRET` in Vercel)

---

## 3. Sanity CORS

1. **API** → **CORS origins**.
2. Add:
   - `https://your-domain.vercel.app`
   - `https://*.vercel.app` (for preview deployments)
   - `http://localhost:3000` (local dev)

---

## 4. ISR & Data Fetching

- **Revalidation:** 60 seconds (configurable in `lib/sanity.client.ts`).
- **CDN:** `useCdn: true` in production for fast global delivery.
- **Draft Mode:** `useCdn: false` when previewing unpublished content.

---

## 5. Studio Access

- **URL:** `https://your-domain.vercel.app/studio`
- **Developer Login** and **Admin** in nav both link to `/studio`.
- Studio is protected by Sanity’s built-in authentication.
- Theme: Obsidian/Gold branding in `sanity.config.ts`.

---

## 6. Image Optimization

- **next/image** with Sanity Image Builder.
- Formats: AVIF, WebP.
- Remote pattern: `cdn.sanity.io`.
- `buildSanityImageUrl()` in `sanity/lib/image.ts` for optimized URLs.

---

## 7. Pre-Deploy Checklist

- [ ] All env vars set in Vercel (Production + Preview).
- [ ] Sanity webhook configured with correct URL and secret.
- [ ] CORS includes production and preview URLs.
- [ ] `SANITY_API_TOKEN` has **Editor** or **Administrator** role.
- [ ] Test `/api/send-token` and `/api/send` after deploy.
- [ ] Test `/studio` login.
- [ ] Verify property listings load with ISR.

---

## 8. Post-Deploy Verification

1. **Homepage:** Properties load, images render.
2. **Schedule Tour:** Form submits, email received.
3. **AI Concierge:** Chat and image upload work.
4. **Studio:** Login and content edits work.
5. **Webhook:** Edit a property in Studio → site revalidates within ~60s.

---

## 9. Troubleshooting

| Issue | Check |
|-------|-------|
| 401 Unauthorized (send/vision) | `API_SIGNATURE_SECRET` set, token fetched before request |
| 500 API_SIGNATURE_SECRET | Env var present in Vercel, redeploy after adding |
| Stale content | Webhook URL correct, `REVALIDATION_SECRET` matches |
| Studio 404 | `basePath: '/studio'` in sanity.config, route exists |
| Images broken | `cdn.sanity.io` in next.config images.remotePatterns |
