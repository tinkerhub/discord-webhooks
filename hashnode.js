// webhook URL - DO NOT LEAK
const webhook = process.env.TECHNEWS_WEBHOOK_URL;
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const hook = new Webhook(webhook);
const fetch = require("node-fetch");
const moment = require("moment");

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
  let req = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  let res = await req.json();
  // return res.data.storiesFeed[Math.floor(Math.random() * res.data.storiesFeed.length)];
  return res.data.storiesFeed[0];
}

getTopPost().then((data) => {
  const embed = new MessageBuilder()
    .setTitle("[HASHNODE] " + data.title)
    // .setURL(data.author.publicationDomain + "/" + data.slug)
    .addField(
      `Published on ${moment(data.dateAdded).format("MMMM Do YYYY, h:mm a")} by ${data.author.name}`,
      data.tags
    )
    .setColor("#9400FF")
    .setImage(data.coverImage)
    .setFooter("👍" + data.totalReactions);
    // .setTitle("hello test from tinkerhub-org/discord-webhooks")

  // send embed
  hook.send(embed);
});

/*

curl 'https://api.hashnode.com/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://api.hashnode.com' --data-binary '{"query":"query {\n  storiesFeed(type: FEATURED) {\n    author {\n    \tname,\n      username\n    }\n    slug,\n    title,\n    type,\n    popularity,\n    totalReactions,\n    dateAdded,\n    coverImage,\n    contentMarkdown\n  }\n}"}' --compressed

*/
