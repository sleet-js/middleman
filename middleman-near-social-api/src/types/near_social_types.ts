// ========================================
// NEAR_SOCIAL TYPES
// the response objects the near.social indexer returns. every type
// here mirrors one object in the api docs.
// ========================================

// ------------------------------------------------------------
// accounts
// ------------------------------------------------------------

export interface NEAR_SOCIAL_ACCOUNT_SUMMARY {
  account_id: string;
  name: string | null;
  avatar_url: string | null;
}

export interface NEAR_SOCIAL_ACCOUNT_CARD {
  account_id: string;
  name: string | null;
  avatar_url: string | null;
  about: string | null;
  followers: number;
  viewer?: NEAR_SOCIAL_ACCOUNT_VIEWER;
  cursor?: string;
}

export interface NEAR_SOCIAL_ACCOUNT_VIEWER {
  following: boolean;
  followed_by: boolean;
}

export interface NEAR_SOCIAL_PROFILE {
  account_id: string;
  has_profile: boolean;
  name: string | null;
  about: string | null;
  avatar: string | null;
  avatar_url: string | null;
  banner: string | null;
  banner_url: string | null;
  location: string | null;
  links: Record<string, string>;
  counts: NEAR_SOCIAL_ACCOUNT_COUNTS;
  joined_at: number | null;
  viewer?: NEAR_SOCIAL_ACCOUNT_VIEWER;
}

export interface NEAR_SOCIAL_ACCOUNT_COUNTS {
  followers: number;
  following: number;
  posts: number;
}

// ------------------------------------------------------------
// posts
// ------------------------------------------------------------

export interface NEAR_SOCIAL_POST_MEDIA {
  src: string;
  url: string;
  mime: string;
  w: number | null;
  h: number | null;
  alt: string | null;
}

export interface NEAR_SOCIAL_POST_COUNTS {
  replies: number;
  reposts: number;
  likes: number;
  quotes: number;
}

export interface NEAR_SOCIAL_POST_VIEWER {
  liked: boolean;
  reposted: boolean;
}

export interface NEAR_SOCIAL_POST {
  key: string;
  id: string;
  author: NEAR_SOCIAL_ACCOUNT_SUMMARY;
  text: string;
  media: NEAR_SOCIAL_POST_MEDIA[];
  created_at: number;
  block_height: number;
  edited_at: number | null;
  reply_to: NEAR_SOCIAL_POST_REF | null;
  root: string | null;
  quote: NEAR_SOCIAL_POST | NEAR_SOCIAL_UNAVAILABLE_POST | null;
  mentions: string[];
  hashtags: string[];
  counts: NEAR_SOCIAL_POST_COUNTS;
  viewer?: NEAR_SOCIAL_POST_VIEWER;
  link: NEAR_SOCIAL_LINK | null;
}

export interface NEAR_SOCIAL_POST_REF {
  key: string;
  author: NEAR_SOCIAL_ACCOUNT_SUMMARY;
}

// a quoted post that no longer exists.
export interface NEAR_SOCIAL_UNAVAILABLE_POST {
  key: string;
  unavailable: true;
}

export interface NEAR_SOCIAL_LINK {
  url: string;
  preview?: NEAR_SOCIAL_LINK_PREVIEW;
}

export interface NEAR_SOCIAL_LINK_PREVIEW {
  kind: "card" | "youtube" | "near_fm" | "unavailable" | "none";
  // card
  title?: string;
  description?: string;
  site_name?: string;
  image?: string;
  large?: boolean;
  // youtube
  video_id?: string;
  start?: number | null;
  shorts?: boolean;
  // near_fm
  uuid?: string;
  artist?: string;
  artist_url?: string;
  cover?: string;
  audio?: string;
  mime?: string;
  duration?: number;
}

// ------------------------------------------------------------
// feeds
// ------------------------------------------------------------

export interface NEAR_SOCIAL_FEED_ITEM {
  type: "post" | "repost";
  post: NEAR_SOCIAL_POST;
  reposted_by: NEAR_SOCIAL_ACCOUNT_SUMMARY | null;
  reposted_at: number | null;
  cursor?: string;
  // only on /v1/feed/for_you
  reason?: "following" | "trending" | "new";
}

// every list endpoint answers with this shape.
export interface NEAR_SOCIAL_PAGE<t> {
  items: t[];
  next_cursor: string | null;
}

// ------------------------------------------------------------
// notifications
// ------------------------------------------------------------

export type NEAR_SOCIAL_NOTIFICATION_KIND =
  "like" | "repost" | "reply" | "quote" | "mention" | "follow";

export interface NEAR_SOCIAL_NOTIFICATION {
  kind: NEAR_SOCIAL_NOTIFICATION_KIND;
  actors: NEAR_SOCIAL_ACCOUNT_SUMMARY[];
  actor_count: number;
  post: NEAR_SOCIAL_POST | null;
  created_at: number;
  cursor?: string;
}

// how many notifications the account has newer than `since`.
export interface NEAR_SOCIAL_NOTIFICATIONS_COUNT {
  count: number;
}

// ------------------------------------------------------------
// status / transactions
// ------------------------------------------------------------

export interface NEAR_SOCIAL_STATUS {
  standard: string;
  chain_id: string;
  social_account_id: string;
  last_block_height: number;
  last_block_ts: number;
  lag_ms: number;
  counts: {
    accounts: number;
    posts: number;
    likes: number;
    follows: number;
  };
}

export type NEAR_SOCIAL_TX_ACTION_STATUS =
  "ok" | "invalid_json" | "too_many_keys" | "invalid_borsh";

export type NEAR_SOCIAL_TX_KEY_STATUS =
  | "ok"
  | "ignored"
  | "invalid"
  | "key_too_long"
  | "value_too_large"
  | "rate_limited";

export interface NEAR_SOCIAL_TX_KEY {
  key: string;
  status: NEAR_SOCIAL_TX_KEY_STATUS;
  reason?: string;
}

export interface NEAR_SOCIAL_TX_FILE {
  path: string;
  deleted: boolean;
  offset?: number;
  full_size?: number;
}

export interface NEAR_SOCIAL_TX_ACTION {
  kind: "kv" | "fastfs";
  status: NEAR_SOCIAL_TX_ACTION_STATUS;
  keys?: NEAR_SOCIAL_TX_KEY[];
  file?: NEAR_SOCIAL_TX_FILE;
}

export interface NEAR_SOCIAL_TX {
  tx_hash: string;
  indexed: boolean;
  block_height?: number;
  block_ts?: number;
  predecessor_id?: string;
  actions?: NEAR_SOCIAL_TX_ACTION[];
}

// ------------------------------------------------------------
// stream
// ------------------------------------------------------------

export interface NEAR_SOCIAL_BLOCK_EVENT {
  block_height: number;
  block_ts: number;
  tx_hashes: string[];
  posts: string[];
  accounts: string[];
}

// ------------------------------------------------------------
// search / hashtags
// ------------------------------------------------------------

export interface NEAR_SOCIAL_HASHTAG {
  tag: string;
  count: number;
}

// ------------------------------------------------------------
// batch
// ------------------------------------------------------------

export interface NEAR_SOCIAL_BATCH_RESPONSE {
  items: (NEAR_SOCIAL_POST | null)[];
}

// ------------------------------------------------------------
// thread
// ------------------------------------------------------------

export interface NEAR_SOCIAL_THREAD {
  post: NEAR_SOCIAL_POST;
  ancestors: NEAR_SOCIAL_POST[];
  parent_missing: boolean;
}

// ------------------------------------------------------------
// legacy socialdb migration
// ------------------------------------------------------------

export interface NEAR_SOCIAL_LEGACY_PROFILE {
  name: string | null;
  about: string | null;
  location: string | null;
  links: Record<string, string>;
}

export interface NEAR_SOCIAL_LEGACY_IMAGE {
  kind: "ipfs" | "url" | "nft";
  proxy_url: string;
}

export interface NEAR_SOCIAL_LEGACY {
  account_id: string;
  exists: boolean;
  profile: NEAR_SOCIAL_LEGACY_PROFILE | null;
  avatar: NEAR_SOCIAL_LEGACY_IMAGE | null;
  banner: NEAR_SOCIAL_LEGACY_IMAGE | null;
  follows: string[];
  follows_on_network: number;
  already_following: number;
}

// ========================================
// copyright 2026 by sleet.near
