# Backend production review / fixes

## Fixed
- Auth rate limiter no longer blocks `current-user`, refresh, or logout requests.
- Refresh tokens are stored as SHA-256 hashes instead of plaintext.
- Logout is idempotent and clears cookies even when the access token is expired.
- JWT payload validation added.
- Registration works with standalone local MongoDB; no replica-set transaction dependency.
- File type validation now returns HTTP 400 instead of an unhandled 500.
- Cloudinary upload/delete flows roll back newly uploaded assets when DB save fails.
- Project image deletion no longer removes the DB record before Cloudinary deletion succeeds.
- Project deletion cleans Cloudinary before deleting the DB record.
- Project validator no longer treats `images`/`thumbnail` as URL strings even though the Mongoose model stores objects.
- GitHub/LeetCode requests have timeouts, GraphQL error handling, and a 5-minute in-memory cache.
- Graceful HTTP + MongoDB shutdown added.
- `trust proxy` enabled in production.
- Environment validation and `.env.example` cleaned up.
- `ms` is now an explicit dependency.
- `create-admin` cleanup fixed so `finally` always runs.

## Important
1. After using this version, log in again because refresh-token storage format changed.
2. Never commit `.env` or GitHub tokens.
3. Generate strong random JWT secrets (32+ characters, preferably 64+).
4. Local Docker MongoDB can stay standalone with this version. If you later use MongoDB transactions, use a replica set or MongoDB Atlas.
