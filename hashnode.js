// webhook URL - DO NOT LEAK
const webhook = process.env.TECHNEWS_WEBHOOK_URL;
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const hook = new Webhook(webhook);
const fetch = require("node-fetch");

// Fetch the top articles using DEV.to API
async function getTopPost() {
  let query = `
    query {
        storiesFeed(type: FEATURED) {
          author {
            name,
            username
          }
          slug,
          title,
          type,
          popularity,
          totalReactions,
          dateAdded,
          coverImage,
          contentMarkdown
        }
               
    }`;
  let req = await fetch("https://dev.to/api/articles?top=1");
  let res = await req.json();
  return res[Math.floor(Math.random() * res.length)];
}

/*

curl 'https://api.hashnode.com/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://api.hashnode.com' --data-binary '{"query":"query {\n  storiesFeed(type: FEATURED) {\n    author {\n    \tname,\n      username\n    }\n    slug,\n    title,\n    type,\n    popularity,\n    totalReactions,\n    dateAdded,\n    coverImage,\n    contentMarkdown\n  }\n}"}' --compressed

*/