# Didactik — Backend / Frontend Gap Analysis

> Last audited: Session 12 state (June 2026)
> Backend repo: `didactik-archive` · Frontend repo: `emem-attah` / `didactik-portal`

---

## 1 — Quick summary

| Area | Status |
|---|---|
| Auth (login / refresh / logout / me) | ✅ Fully implemented — both sides |
| Asset list + detail | ✅ Fully implemented — both sides |
| Asset submit flow (4-step wizard) | ✅ Fully implemented — both sides |
| Asset withdraw | ✅ Backend + frontend |
| Asset confirm-upload | ✅ Backend only — no frontend UI |
| Languages reference list | ✅ Backend + frontend (Step 1 selects) |
| Countries reference list | ✅ Backend + frontend (Step 1 selects) |
| Taxonomy terms list | ✅ Backend · ⚠️ Frontend only reads/displays — no write UI |
| Search (`/api/v1/search/`) | ✅ Backend + frontend (Discover page) |
| Suggest (`/api/v1/suggest/`) | ✅ Backend · ❌ Frontend never calls it |
| Production company CRUD | ✅ Backend · ⚠️ Frontend read-only (shows name only) |
| Broadcaster CRUD | ✅ Backend · ⚠️ Frontend read-only |
| Rights grants CRUD | ✅ Backend · ❌ No frontend UI at all |
| Consents read-only list | ✅ Backend · ❌ No frontend UI at all |
| Licensing enquiry | ❌ Backend **missing** · Frontend has `mailto:` fallback |

---

## 2 — All backend endpoints vs frontend consumption

### Authentication

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/auth/login/` | POST | ✅ `CookieTokenObtainPairView` | ✅ `auth.ts · postLogin()` | HttpOnly refresh cookie, body returns `{access}` only |
| `/api/v1/auth/refresh/` | POST | ✅ `CookieTokenRefreshView` | ✅ `auth.ts · silentRefresh()` | Called on mount + `apiFetch` 401 retry |
| `/api/v1/auth/logout/` | POST | ✅ `LogoutView` | ✅ `auth.ts · postLogout()` | Clears cookie, frontend discards access token |
| `/api/v1/auth/me/` | GET | ✅ `CurrentUserProfileView` | ✅ `AuthContext.tsx` after login | Returns role, company/broadcaster info |

### Assets

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/assets/` | GET | ✅ `AssetViewSet.list` (no pagination class — returns plain array) | ✅ `DashboardPage`, `AssetsPage`, `BroadcasterDashboardPage`, `DiscoverPage` | Role-filtered: PC sees own company; broadcaster sees `ready_to_list` only |
| `/api/v1/assets/{id}/` | GET | ✅ `AssetViewSet.retrieve` → `AssetDetailSerializer` | ✅ `AssetDetailPage` (production) + `BroadcasterAssetDetailPage` | |
| `/api/v1/assets/` | POST/PUT/PATCH/DELETE | ✅ Admin-only CRUD | ❌ No frontend UI (admin-only ops, correct) | Correct to not expose in portal |
| `/api/v1/assets/initiate-upload/` | POST | ✅ `AssetViewSet.initiate_upload` | ✅ `Step4Upload.tsx` | Creates Asset + Consent atomically; returns presigned B2 URL or 202 |
| `/api/v1/assets/{id}/confirm-upload/` | POST | ✅ `AssetViewSet.confirm_upload` | ❌ **Not called from frontend** | Frontend does XHR PUT to B2 then moves on; confirm step not triggered |
| `/api/v1/assets/{id}/withdraw/` | POST | ✅ `AssetViewSet.withdraw` | ✅ `AssetDetailPage.tsx` (production) | |
| `/api/v1/assets/{id}/request-license/` | POST | ❌ **Does not exist** | ⚠️ `BroadcasterAssetDetailPage.tsx` — `mailto:` fallback | Documented in `TECH_DEBT_LICENSING_API.md` |

### Reference data

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/languages/` | GET | ✅ `LanguageViewSet` (added Session 11) | ✅ `Step1Metadata.tsx` (wired Session 12) | `LanguageBriefSerializer` → `{id, code, name, english_name}` |
| `/api/v1/countries/` | GET | ✅ `CountryViewSet` (added Session 11) | ✅ `Step1Metadata.tsx` (wired Session 12) | `CountryBriefSerializer` → `{id, code, name}` |
| `/api/v1/taxonomy-terms/` | GET | ✅ `TaxonomyTermViewSet` (read-only) | ⚠️ Asset detail **displays** taxonomy tags from asset payload; frontend never calls taxonomy terms list directly | No tagging UI in portal (admin-only operation) |

### Search

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/search/` | GET `?q=` | ✅ `SearchView` (paginated, role-filtered) | ✅ `DiscoverPage.tsx` (search mode) | Returns `{count, next, previous, results[SearchAsset]}` |
| `/api/v1/suggest/` | GET `?q=` | ✅ `SuggestView` (returns top 10) | ❌ **Never called from frontend** | No typeahead/autocomplete in current UI |

### Production companies

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/production-companies/` | GET | ✅ `ProductionCompanyViewSet.list` | ❌ Not directly — company name comes embedded in asset serializer | |
| `/api/v1/production-companies/{id}/` | GET | ✅ | ⚠️ `Step3Consent.tsx` calls `apiGet('/api/v1/production-companies/')` to get country for jurisdiction resolution | Called, but uses the list endpoint and filters client-side |
| `/api/v1/production-companies/{id}/` | PATCH | ✅ (admin or own PC user) | ❌ No profile-edit UI in portal | |

### Broadcasters

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/broadcasters/` | GET/GET detail | ✅ `BroadcasterViewSet` | ❌ Not called from frontend | Broadcaster sees their name in `me` response; no profile page |
| `/api/v1/broadcasters/{id}/` | PATCH | ✅ | ❌ No profile-edit UI | |

### Rights grants

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/rights-grants/` | GET/POST/PATCH/DELETE | ✅ Full CRUD | ❌ **No frontend UI at all** | Admin/PC operation; not yet in portal scope |

### Consents

| Endpoint | Method | Backend | Frontend call | Notes |
|---|---|---|---|---|
| `/api/v1/consents/` | GET (read-only) | ✅ `ConsentViewSet` | ❌ **No frontend UI at all** | Audit trail only; admin and PC user can read their own; no portal page |

---

## 3 — What is fully done ✅

1. **Auth layer** — cookie-based JWT, silent refresh, role-aware routing. No gaps.
2. **Asset submission flow (4 steps)** — metadata, submitter details, consent (with privacy policy drawer), direct XHR upload to B2. Jurisdiction routing and multi-jurisdictional consent texts for NG/ZA/KE/EU/Other are complete and versioned.
3. **Asset list and detail** — production company portal (own assets, all statuses) and broadcaster portal (only `ready_to_list`).
4. **Asset withdrawal** — production company self-service.
5. **Language + country reference selects** — Step 1 wizard now populates from `/api/v1/languages/` and `/api/v1/countries/`.
6. **Search** — full-text + taxonomy trigram search with pagination, role-filtered, used in Discover page.
7. **Privacy policy drawer** — inline in Step 3 consent step, with full 11-section policy text.
8. **65 backend tests** and **44 frontend Vitest tests** all passing as of Session 12.

---

## 4 — What is missing or incomplete ⚠️❌

### 4a — Missing backend endpoint (blocking feature)

#### `POST /api/v1/assets/{id}/request-license/`

**Priority: Medium (Traction MVP)**

- The broadcaster licensing enquiry form in `BroadcasterAssetDetailPage.tsx` is complete — it validates `intended_use`, `territories`, `duration`, `notes` via Zod.
- On submit, it currently constructs a `mailto:` link to `admin@didactikmedia.com` instead of posting to an API.
- **Implementation guide is in [`TECH_DEBT_LICENSING_API.md`](file:///Users/samuelogbonna-eze/Documents/GitHub/emem-attah/TECH_DEBT_LICENSING_API.md)** at the portal root.

Suggested model fields:
```python
class LicensingEnquiry(Model):
    asset = FK(Asset)
    requester = FK(User)
    intended_use = CharField(max_length=100)
    territories = TextField()
    duration = CharField(max_length=100)
    notes = TextField(blank=True)
    created_at = DateTimeField(auto_now_add=True)
    status = CharField(choices=['pending','responded','closed'])
```

### 4b — Backend endpoint exists but frontend doesn't call it

#### `POST /api/v1/assets/{id}/confirm-upload/`

**Priority: Low (currently works without it)**

- `Step4Upload.tsx` does XHR PUT to B2, then on success calls `onUploadComplete()` which navigates away.
- It never calls `confirm-upload`. The backend endpoint transitions `PENDING_UPLOAD → UPLOADED` and verifies the file actually reached B2.
- Without calling it, assets stay in `PENDING_UPLOAD` status indefinitely until an admin manually confirms.
- **Fix:** After a successful XHR upload (status 200), call `apiPost('/api/v1/assets/{asset_id}/confirm-upload/', {})` before navigating.

#### `GET /api/v1/suggest/`

**Priority: Low (nice-to-have)**

- The `SuggestView` endpoint is live and returns the top 10 trigram matches.
- The Discover page has a plain `<input type="search">` with no typeahead.
- Adding an autocomplete dropdown on the search input would improve UX and use this endpoint.

### 4c — Frontend has no UI for existing backend features

| Feature | Backend endpoint | Why missing |
|---|---|---|
| Rights grants | `/api/v1/rights-grants/` | Traction MVP model — outside current portal scope |
| Consent audit trail | `/api/v1/consents/` | Admin-facing only; no PC user UI planned yet |
| Production company profile edit | `PATCH /api/v1/production-companies/{id}/` | No profile page in portal yet |
| Broadcaster profile edit | `PATCH /api/v1/broadcasters/{id}/` | No profile page in portal yet |

---

## 5 — Deferred items from `deferred-items.md` (relevant to frontend/API work)

| Item | Status | Priority |
|---|---|---|
| Broadcaster licensing endpoint `POST /api/v1/assets/{id}/request-license/` | ❌ Unbuilt | Traction MVP |
| `confirm-upload` not called from frontend after XHR upload | ❌ Bug | Should fix soon |
| `suggest/` endpoint unused | ❌ Unused | Low |
| `PrivacyPolicyDrawer.test.tsx` + Step 1 select tests | ❌ Skipped in Session 12 | Before Traction MVP launch |
| Screener authorization model (`ScreenerAuthorization`) | ❌ Not built | Traction MVP |
| Bid model | ❌ Not built | Traction MVP |
| License agreement model | ❌ Not built | Traction MVP |
| Rate limiting on `/api/v1/auth/token/` | ❌ Not done | Before production scale |

---

## 6 — Data shape notes (frontend types vs backend serializers)

These are confirmed matches between `src/portal/shared/types.ts` and the Django serializers:

| Frontend type | Backend serializer | Notes |
|---|---|---|
| `AssetListItem` | `AssetListSerializer` | Includes `production_company.name`, `primary_language.english_name`, `production_country.name`, `status`, `created_at` |
| `AssetDetail` | `AssetDetailSerializer` | Extends list; adds `description`, `original_title`, `taxonomy_tags[]`, `submitter_name`, `storage_location` |
| `SearchAsset` | `SearchAssetSerializer` | Same shape as list + `matched_taxonomy_tags` for highlighted terms |
| `PaginatedResponse<T>` | DRF `PageNumberPagination` | `{count, next, previous, results[]}` |
| `UploadInitiatedResponse` | `UploadInitiatedSerializer` | `{asset_id, upload_url, expires_in_seconds, storage_key, status, message}` |
| `MeResponse` | `MeSerializer` | `{id, email, role, production_company?, broadcaster?}` |

---

## 7 — Recommended next actions (prioritised)

1. **[Bug / High]** Fix `Step4Upload.tsx` to call `confirm-upload` after successful XHR PUT — otherwise all submitted assets stay in `PENDING_UPLOAD` and admin has no automated signal that the file arrived.

2. **[Feature / Medium]** Build `POST /api/v1/assets/{id}/request-license/` backend endpoint + model. Then swap the `mailto:` fallback in `BroadcasterAssetDetailPage.tsx` with a real `apiPost` call. Guide is in `TECH_DEBT_LICENSING_API.md`.

3. **[Tests / Medium]** Add Vitest tests for `PrivacyPolicyDrawer.tsx` and the language/country select logic in `Step1Metadata.tsx` (skipped in Session 12).

4. **[UX / Low]** Wire the `suggest/` endpoint to the Discover page search input as a typeahead autocomplete.

5. **[Operational / Pre-pilot]** Create `privacy@didactikmedia.com` and `onboarding@didactikmedia.com`, publish `didactikmedia.com/privacy`, and verify B2 application key type — these are non-code pre-pilot blockers.
