// load modules
require("dotenv").config();
const fetch = require("node-fetch");
const moment = require("moment");
const { Webhook, MessageBuilder } = require("discord-webhook-node");

// webhook URL - DO NOT LEAK
const webhook = process.env.TECHNEWS_WEBHOOK_URL;
// const webhook = process.env.DEV_VERSION_WEBHOOK;
console.log(webhook);

// webhook config
const hook = new Webhook(webhook);
hook.setUsername("Hashnode ~ Popular Articles");

// Fetch the top articles using Hashnode GraphQL API
async function getTopPost() {
  let query = `
    query {
        storiesFeed(type: FEATURED) {
          author {
            name,
            username,
            publicationDomain
          }
          slug,
          title,
          type,
          popularity,
          totalReactions,
          dateAdded,
          coverImage,
          contentMarkdown,
          brief
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
  return res.data.storiesFeed[
    Math.floor(Math.random() * res.data.storiesFeed.length)
  ];
}

getTopPost().then((data) => {
  console.log(data);
  const embed = new MessageBuilder()
    .setTitle(data.title)
    .setURL("https://hashnode.com/post/" + data.slug)
    .setDescription("**__Excerpt__** ```" + data.brief + "```")
    .addField(`**__Author__**`, `${data.author.username}`)
    .setColor("#9400FF")
    .setImage(data.coverImage)
    .setFooter(
      "👍 " +
        data.totalReactions +
        " reactions · " +
        `Published on ${moment(data.dateAdded).format("MMMM Do YYYY, h:mm a")}`
    );
  // .setTitle("hello test from tinkerhub-org/discord-webhooks")

  // send embed
  hook.send(embed).catch((err) => {
    console.error(err);
  });
});

/*

curl 'https://api.hashnode.com/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: https://api.hashnode.com' --data-binary '{"query":"query {\n  storiesFeed(type: FEATURED) {\n    author {\n    \tname,\n      username\n    }\n    slug,\n    title,\n    type,\n    popularity,\n    totalReactions,\n    dateAdded,\n    coverImage,\n    contentMarkdown\n  }\n}"}' --compressed

*/
