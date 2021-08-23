# Artflare
Artflare is a group drawing game inspired by the party game [`Jackbox`](https://store.steampowered.com/app/434170/The_Jackbox_Party_Pack_3)

Each player draws some art and writes some captions for the art at random. Then they are shuffled and given to players at random and players use what they are given to try to make the most funny combination. The winner is voted on by everyone based on what they thought as the most funny.

## Original what it's based on
![logo](example.gif)

## Example
I have a running instance hosted on Cloudflare pages at [`artflare.io`](https://artflare.io)

## Getting started
This is running on Cloudflare pages and Cloudflare workers.

1. Deploy the Cloudflare worker with:
```console
wrangler publish --new-class ArtRoom --new-class RateLimiter
```

2. Once you get your worker url replace the domain value in "src\containers\Game\index.js" so the ui knows how to connect.

3. Setup Cloudflare page for the ui on the Cloudflare website to deploy the ui automatically.

## Why was this made?
I built this for fun to enter the 2021 Cloudflare summer developer challenge and hopefully get some swag. I had very little time to build this so it's super rough, it's just prototype to show a concept.
