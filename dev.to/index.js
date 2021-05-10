// webhook URL - DO NOT LEAK
const webhook = process.env.TECHNEWS_WEBHOOK_URL;
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(webhook);
const fetch = require("node-fetch");
  
// Fetch the top articles using DEV.to API
async function getTopPost() {
    let req = await fetch("https://dev.to/api/articles?top=1");
    let res = await req.json();
    return res[Math.floor(Math.random() * res.length)];
}

// Call the async function and then use `discord-webhook-node` to send the embed!
// Join the TinkerHub Discord server and go to #tech-news to see it in action!
getTopPost().then(data => {
    const embed = new MessageBuilder()
        .setTitle(data.title)
        .setURL(data.url)
        .addField(`Published on ${data.readable_publish_date} by ${data.user.username}`, data.tags)
        .setColor('#00b0f4')
        .setDescription(data.description)
        .setImage(data.social_image)
        .setFooter("❤️ " + data.public_reactions_count)
    
    // send embed
    hook.send(embed);
});
