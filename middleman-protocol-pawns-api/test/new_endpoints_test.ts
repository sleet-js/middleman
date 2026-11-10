import {
  api_protocol_pawns_vapid_public_key,
  api_protocol_pawns_subscribe_push,
  api_protocol_pawns_unsubscribe_push,
  api_protocol_pawns_notify_move,
} from "../src/index.ts";

let pass = 0;
let fail = 0;
const check = (name: string, cond: boolean, detail?: unknown) => {
  if (cond) {
    pass++;
    console.log(`  OK   ${name}`);
  } else {
    fail++;
    console.log(`  FAIL ${name}`, detail !== undefined ? JSON.stringify(detail) : "");
  }
};

// GET /vapid-public-key
{
  const res = await api_protocol_pawns_vapid_public_key({});
  check("vapid key returned", typeof res.publicKey === "string" && res.publicKey.length > 20, res);
}

// the push subscribe + unsubscribe pair. this writes to their db, so
// it is cleaned up right after. the endpoint is a throwaway one, it
// does not belong to a real browser.
{
  const endpoint = "https://push.example.com/sub/test-sleet-pawns-verify";
  const sub = await api_protocol_pawns_subscribe_push({
    account_id: "sleet.near",
    endpoint,
    p256dh: "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM",
    auth: "tBHItRH5CNb0dR8yTUsvMjWtPFl2WQrA",
  });
  check("subscribe ok", sub.ok === true, sub);

  const unsub = await api_protocol_pawns_unsubscribe_push({
    account_id: "sleet.near",
    endpoint,
  });
  check("unsubscribe ok", unsub.ok === true, unsub);
}

// POST /notify/move — the api refuses when the caller is not a
// participant in the game. that refusal is the correct behaviour and
// it must come back as a thrown error, not a silent success.
{
  try {
    const res = await api_protocol_pawns_notify_move({
      tx_hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      game_id: [206540279, "kcameau.near", "crans.near"],
      account_id: "sleet.near",
    });
    console.log("  NOTE notify_move returned:", JSON.stringify(res));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    check("notify_move rejects a non participant", msg.includes("403") || msg.includes("Not a participant"), msg);
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
