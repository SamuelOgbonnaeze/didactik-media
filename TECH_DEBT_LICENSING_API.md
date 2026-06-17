# Licensing API Technical Debt

## Context
During the implementation of the Broadcaster Portal's **Asset Detail Actions**, a decision was made regarding the "Licensing Enquiry" feature. Broadcasters (content consumers) needed a way to formally request licensing rights for an asset they discovered on the platform.

Our goal was to have an in-app form that posts the structured request to a backend endpoint:
`POST /api/v1/assets/{id}/request-license/`

However, after testing the backend locally (which runs on port `8000`), we discovered that this endpoint **does not exist yet** (it returned a `404 Not Found`).

## The Compromise (Fallback)
To unblock frontend development and still provide a good user experience, we implemented the form UI fully in `BroadcasterAssetDetailPage.tsx`, but added a **`mailto:` fallback**.

**How it works currently:**
1. The user clicks "Request licensing".
2. A modal form opens (using `react-hook-form` and `zod` for validation).
3. The user fills out their Intended Use, Territories, Duration, and Additional Notes.
4. On submit, instead of making an API request, the app constructs a detailed `mailto:` link populated with the validated form data and triggers the user's default email client.

## Future Implementation Guide
When the backend API endpoint is ready, follow these steps to remove the technical debt:

1. Create the backend endpoint (`POST /api/v1/assets/{id}/request-license/`) that accepts the JSON payload from the form.
2. In `src/portal/broadcaster/pages/AssetDetailPage.tsx`, locate the `onSubmit` function in the `LicensingModal` component.
3. Replace the `window.location.href = mailtoLink;` logic with an actual API call using `apiPost` (or `@tanstack/react-query` mutation):
   ```typescript
   await apiPost(`/api/v1/assets/${assetId}/request-license/`, data);
   ```
4. Add proper success/error handling states in the modal to reflect the API response.
5. Delete this documentation file.
