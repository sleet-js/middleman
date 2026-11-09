// ========================================
// NEAR_SOCIAL_ENDPOINT_PATHS
// the path for every endpoint this middleman knows about. one key
// per endpoint so the path is written down exactly once. logic for
// each endpoint lives in src/fun/.
// ========================================

export const NEAR_SOCIAL_ENDPOINT_PATHS = {
  // status
  near_social_status: "/v1/status",

  // feeds
  near_social_feed_for_you: "/v1/feed/for_you",
  near_social_feed_global: "/v1/feed/global",
  near_social_feed_following: "/v1/feed/following/{account_id}",
  near_social_hashtag_feed: "/v1/hashtags/{tag}",

  // accounts
  near_social_account: "/v1/accounts/{account_id}",
  near_social_account_posts: "/v1/accounts/{account_id}/posts",
  near_social_account_replies: "/v1/accounts/{account_id}/replies",
  near_social_account_media: "/v1/accounts/{account_id}/media",
  near_social_account_likes: "/v1/accounts/{account_id}/likes",
  near_social_account_followers: "/v1/accounts/{account_id}/followers",
  near_social_account_following: "/v1/accounts/{account_id}/following",

  // search / discovery
  near_social_search_posts: "/v1/search/posts",
  near_social_search_accounts: "/v1/search/accounts",
  near_social_suggestions: "/v1/suggestions",
  near_social_hashtags_trending: "/v1/hashtags/trending",

  // posts
  near_social_post: "/v1/posts/{account_id}/{post_id}",
  near_social_post_replies: "/v1/posts/{account_id}/{post_id}/replies",
  near_social_post_quotes: "/v1/posts/{account_id}/{post_id}/quotes",
  near_social_post_likes: "/v1/posts/{account_id}/{post_id}/likes",
  near_social_post_reposts: "/v1/posts/{account_id}/{post_id}/reposts",
  near_social_post_preview: "/v1/posts/{account_id}/{post_id}/preview",
  near_social_posts_batch: "/v1/posts/batch",

  // notifications
  near_social_notifications: "/v1/notifications/{account_id}",
  near_social_notifications_count: "/v1/notifications/{account_id}/count",

  // transactions
  near_social_tx: "/v1/tx/{tx_hash}",

  // live updates
  near_social_stream: "/v1/stream",

  // legacy socialdb migration
  near_social_legacy: "/v1/legacy/{account_id}",
  near_social_legacy_image: "/v1/legacy/{account_id}/image/{kind}",

  // docs
  near_social_api_md: "/api.md",
  near_social_skill_md: "/skill.md",
  near_social_standard_md: "/standard.md",
} as const;

export type NEAR_SOCIAL_ENDPOINT_KEY = keyof typeof NEAR_SOCIAL_ENDPOINT_PATHS;
// ========================================
// copyright 2026 by sleet.near
