// Legacy slugify export — kept for any remaining imports
// All data is now in Cloudflare D1 via lib/db.js

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
