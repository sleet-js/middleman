// ========================================
// NEAR SOCIAL
// typed client for the near.social indexer api (https://api2.near.social).
// one-shot HTTP, plus the /v1/stream sse feed for live updates.
// response types are defined locally in src/types/ since there is no
// near.social tool-box package.
// ========================================

export * from "./stuff/api_near_social_get";
export * from "./stuff/api_near_social_stream";
// the post transport helper shares its name with the /v1/posts endpoint
// in fun/, so it goes out under a name of its own.
export { api_near_social_post as api_near_social_post_request } from "./stuff/api_near_social_post";
export type { API_NEAR_SOCIAL_POST_PARAMS as API_NEAR_SOCIAL_POST_REQUEST_PARAMS } from "./stuff/api_near_social_post";

export * from "./fun/api_near_social_status";
export * from "./fun/api_near_social_feed_for_you";
export * from "./fun/api_near_social_feed_global";
export * from "./fun/api_near_social_feed_following";
export * from "./fun/api_near_social_hashtag_feed";
export * from "./fun/api_near_social_hashtags_trending";
export * from "./fun/api_near_social_account";
export * from "./fun/api_near_social_account_posts";
export * from "./fun/api_near_social_account_replies";
export * from "./fun/api_near_social_account_media";
export * from "./fun/api_near_social_account_likes";
export * from "./fun/api_near_social_account_followers";
export * from "./fun/api_near_social_account_following";
export * from "./fun/api_near_social_search_posts";
export * from "./fun/api_near_social_search_accounts";
export * from "./fun/api_near_social_suggestions";
export * from "./fun/api_near_social_post";
export * from "./fun/api_near_social_post_replies";
export * from "./fun/api_near_social_post_quotes";
export * from "./fun/api_near_social_post_likes";
export * from "./fun/api_near_social_post_reposts";
export * from "./fun/api_near_social_post_preview";
export * from "./fun/api_near_social_posts_batch";
export * from "./fun/api_near_social_notifications";
export * from "./fun/api_near_social_notifications_count";
export * from "./fun/api_near_social_tx";
export * from "./fun/api_near_social_legacy";
export * from "./fun/api_near_social_legacy_image";

export { NEAR_SOCIAL_BASE_URL } from "./stuff/near_social_base_url";
export { NEAR_SOCIAL_ENDPOINT_PATHS } from "./stuff/near_social_endpoint_paths";
export type { NEAR_SOCIAL_ENDPOINT_KEY } from "./stuff/near_social_endpoint_paths";
export { near_social_build_query } from "./stuff/near_social_build_query";
export { near_social_parse_error } from "./stuff/near_social_parse_error";
export type { NEAR_SOCIAL_API_ERROR } from "./stuff/near_social_parse_error";

export * from "./types/near_social_types";
// ========================================
// copyright 2026 by sleet.near
