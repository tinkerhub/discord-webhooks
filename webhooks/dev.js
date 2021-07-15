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
hook.setUsername("DEV.to ~ Popular Articles");

// Fetch the top articles using DEV.to API
async function getTopPost() {
  let req = await fetch("https://dev.to/api/articles?top=1");
  let res = await req.json();
  return res[Math.floor(Math.random() * res.length)];
}

// Call the async function and then use `discord-webhook-node` to send the embed!
// Join the TinkerHub Discord server and go to #tech-news to see it in action!
getTopPost().then((data) => {
  const embed = new MessageBuilder()
    .setTitle(data.title)
    .setURL(data.url)
    .setColor("#00b0f4")
    .setDescription("**__Excerpt__** ```" + data.description + "```")
    .addField(`**__Author__**`, `${data.user.username}`)
    .addField(`**__Tags__**`, `${data.tags}`)
    .setImage(data.social_image)
    .setFooter(
      "❤️ " +
        data.public_reactions_count +
        " reactions · " +
        `Published on ${data.readable_publish_date}`
    );

  // send embed
  hook.send(embed);
});
