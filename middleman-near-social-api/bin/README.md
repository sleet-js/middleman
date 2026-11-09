# middleman-near-social-api/bin

cli bins for the near.social indexer api (https://api2.near.social). the api is
public and has no auth, so these bins need no base url.

all commands are run from the project root.

## near_social_status

GET /v1/status — how far the indexer has got on the chain.

```sh
bun middleman-near-social-api/bin/near_social_status.ts
```

## near_social_feed_for_you

GET /v1/feed/for_you — the home feed.

```sh
bun middleman-near-social-api/bin/near_social_feed_for_you.ts --limit 20
bun middleman-near-social-api/bin/near_social_feed_for_you.ts --viewer mob.near --limit 20
```

## near_social_feed_global

GET /v1/feed/global — every top-level post, newest first.

```sh
bun middleman-near-social-api/bin/near_social_feed_global.ts --limit 20
```

## near_social_feed_following

GET /v1/feed/following/{account_id} — posts and reposts from the account
and everyone it follows.

```sh
bun middleman-near-social-api/bin/near_social_feed_following.ts mob.near --limit 20
```

## near_social_hashtag_feed

GET /v1/hashtags/{tag} — posts with the hashtag.

```sh
bun middleman-near-social-api/bin/near_social_hashtag_feed.ts near --limit 20
```

## near_social_hashtags_trending

GET /v1/hashtags/trending — the top ten hashtags over the last 24 hours.

```sh
bun middleman-near-social-api/bin/near_social_hashtags_trending.ts
```

## near_social_account

GET /v1/accounts/{account_id} — the account's profile.

```sh
bun middleman-near-social-api/bin/near_social_account.ts mob.near
bun middleman-near-social-api/bin/near_social_account.ts mob.near --viewer root.near
```

## near_social_account_posts

GET /v1/accounts/{account_id}/posts — the account's posts and reposts.

```sh
bun middleman-near-social-api/bin/near_social_account_posts.ts mob.near --limit 20
```

## near_social_account_replies

GET /v1/accounts/{account_id}/replies — the account's replies.

```sh
bun middleman-near-social-api/bin/near_social_account_replies.ts mob.near --limit 20
```

## near_social_account_media

GET /v1/accounts/{account_id}/media — the account's posts that carry media.

```sh
bun middleman-near-social-api/bin/near_social_account_media.ts mob.near --limit 20
```

## near_social_account_likes

GET /v1/accounts/{account_id}/likes — the posts the account liked.

```sh
bun middleman-near-social-api/bin/near_social_account_likes.ts mob.near --limit 20
```

## near_social_account_followers

GET /v1/accounts/{account_id}/followers — who follows the account.

```sh
bun middleman-near-social-api/bin/near_social_account_followers.ts root.near --limit 20
```

## near_social_account_following

GET /v1/accounts/{account_id}/following — who the account follows.

```sh
bun middleman-near-social-api/bin/near_social_account_following.ts mob.near --limit 20
```

## near_social_search_posts

GET /v1/search/posts?q= — posts whose text contains the query.

```sh
bun middleman-near-social-api/bin/near_social_search_posts.ts near --limit 20
```

## near_social_search_accounts

GET /v1/search/accounts?q= — accounts matching the query.

```sh
bun middleman-near-social-api/bin/near_social_search_accounts.ts mob --limit 20
```

## near_social_suggestions

GET /v1/suggestions — popular accounts to follow.

```sh
bun middleman-near-social-api/bin/near_social_suggestions.ts --limit 20
bun middleman-near-social-api/bin/near_social_suggestions.ts --viewer mob.near --limit 20
```

## near_social_post

GET /v1/posts/{account_id}/{post_id} — the post and its ancestors.

```sh
bun middleman-near-social-api/bin/near_social_post.ts mob.near 1790730753936
```

## near_social_post_replies

GET /v1/posts/{account_id}/{post_id}/replies — the replies to the post.

```sh
bun middleman-near-social-api/bin/near_social_post_replies.ts mob.near 1790730753936 --limit 20
```

## near_social_post_quotes

GET /v1/posts/{account_id}/{post_id}/quotes — the posts that quote the post.

```sh
bun middleman-near-social-api/bin/near_social_post_quotes.ts mob.near 1790730753936 --limit 20
```

## near_social_post_likes

GET /v1/posts/{account_id}/{post_id}/likes — the accounts that liked the post.

```sh
bun middleman-near-social-api/bin/near_social_post_likes.ts mob.near 1790730753936 --limit 20
```

## near_social_post_reposts

GET /v1/posts/{account_id}/{post_id}/reposts — the accounts that reposted
the post.

```sh
bun middleman-near-social-api/bin/near_social_post_reposts.ts mob.near 1790730753936 --limit 20
```

## near_social_post_preview

GET /v1/posts/{account_id}/{post_id}/preview — the link preview for the
post's url.

```sh
bun middleman-near-social-api/bin/near_social_post_preview.ts mob.near 1790730753936
```

## near_social_posts_batch

POST /v1/posts/batch — up to one hundred posts by key.

```sh
bun middleman-near-social-api/bin/near_social_posts_batch.ts mob.near/1790730753936,mob.near/1790730753937
```

## near_social_notifications

GET /v1/notifications/{account_id} — the account's notifications.

```sh
bun middleman-near-social-api/bin/near_social_notifications.ts mob.near --limit 20
```

## near_social_notifications_count

GET /v1/notifications/{account_id}/count — how many notifications the
account has newer than `since`.

```sh
bun middleman-near-social-api/bin/near_social_notifications_count.ts mob.near
bun middleman-near-social-api/bin/near_social_notifications_count.ts mob.near --since 1759140000000
```

## near_social_tx

GET /v1/tx/{tx_hash} — what the indexer did with a transaction's writes.

```sh
bun middleman-near-social-api/bin/near_social_tx.ts <tx_hash>
```

## near_social_stream

GET /v1/stream — the server-sent-events block stream. it prints the
events it receives until the timeout.

```sh
bun middleman-near-social-api/bin/near_social_stream.ts --seconds 20
```

## near_social_legacy

GET /v1/legacy/{account_id} — the account's legacy near.social profile
and follows.

```sh
bun middleman-near-social-api/bin/near_social_legacy.ts mob.near
```

## near_social_legacy_image

GET /v1/legacy/{account_id}/image/{kind} — the legacy avatar or banner
image bytes.

```sh
bun middleman-near-social-api/bin/near_social_legacy_image.ts mob.near avatar
bun middleman-near-social-api/bin/near_social_legacy_image.ts mob.near banner
```

=======================================
<br/>
copyright 2026 by sleet.near
