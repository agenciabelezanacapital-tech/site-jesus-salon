// Public summary for this salon only. OAuth credentials stay on the server.
const LOCATION = 'accounts/100581861635974186172/locations/16055632170132873624';
let cached;
let pending;

async function readGoogleSummary() {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    }),
    signal: AbortSignal.timeout(8000)
  });
  if (!tokenResponse.ok) throw new Error('Google authorization unavailable');
  const token = await tokenResponse.json();
  if (typeof token.access_token !== 'string' || !token.access_token) throw new Error('Missing access token');
  const response = await fetch(`https://mybusiness.googleapis.com/v4/${LOCATION}/reviews?pageSize=1`, {
    headers: { Authorization: `Bearer ${token.access_token}` },
    signal: AbortSignal.timeout(8000)
  });
  if (!response.ok) throw new Error('Google summary unavailable');
  const data = await response.json();
  if (!Number.isInteger(data.totalReviewCount) || data.totalReviewCount < 0 ||
      !Number.isFinite(data.averageRating) || data.averageRating < 1 || data.averageRating > 5) {
    throw new Error('Invalid Google summary');
  }
  return { rating: data.averageRating, count: data.totalReviewCount, updatedAt: new Date().toISOString() };
}

module.exports = async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ available: false });
  }
  if (!['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'].every(key => process.env[key])) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ available: false });
  }
  try {
    if (!cached || Date.now() - Date.parse(cached.updatedAt) >= 3600000) {
      pending ||= readGoogleSummary().finally(() => { pending = null; });
      cached = await pending;
    }
    // CDN expires when the source cache expires, avoiding two additive hours.
    const ttl = Math.max(1, Math.floor((3600000 - (Date.now() - Date.parse(cached.updatedAt))) / 1000));
    res.setHeader('Cache-Control', `public, max-age=0, s-maxage=${ttl}, must-revalidate`);
    return res.status(200).json({ available: true, ...cached });
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ available: false });
  }
};
