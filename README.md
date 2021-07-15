# discord-webhooks

Webhooks used in the #tech-news channel of the [TinkerHub](https://tinkerhub.org) Discord server.

### Webhooks

- **DEV.to**

    DEV.to's API is used to fetch the most popular posts from DEV.to.

    ```
    https://dev.to/api/articles?top=1
    ```

    The endpoint returns an array of the most popular posts. But it's highly likely for the same post to be popular accross multiple days; so to change it up, a random object is selected from the array of popular posts.

    The selected array is then formatted into a nice looking Discord embed using the [`discord-webhook-node`](https://npmjs.org/package/discord-webhook-node) package and finally sent to the specified channel using the secret 👀 Discord webhook URL.

- [**Hashnode**](https://hashnode.com)

    The process is similar to DEV.to's webhook. Except this time, there's a few different things around the API. Hashnode's API is a GraphQL API, so you only get the data that you ask for. You can play around with it [here](https://api.hashnode.com).

    Hashnode's API has a single endpoint (as a result of it being a GraphQL API) and whatever stuff you want is specified in a special format (similar to JSON), in the form of schema. See line 19 of `hashnode.js` to see the schema that was used for this webhook. 

### Local Setup

```bash
# Clone this repository
git clone https://github.com/TinkerHub/discord-webhooks.git

# slide into the directory
cd discord-webhooks

# install the dependencies
npm install
```

Then go the `.env` (create one, if it doesn't exist), you need to "keep a few secrets".

```env
TECHNEWS_WEBHOOK_URL=<YOUR_DISCORD_WEBHOOK_URL_HERE>
```

Replace `<YOUR_DISCORD_WEBHOOK_URL_HERE>` with the URL of your webhook.

And then finally run the script by running `npm start`.

### License

This repo is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.

[🍩](https://khaleelgibran.com)



*P.S. Thanks to GitHub Copilot for helping me write this article!*