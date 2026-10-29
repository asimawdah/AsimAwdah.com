---
title: Writing Code That Works Offline
date: 2026-10-26
description: Why local-first, network-independent software is worth building.
slug: writing-code-that-works-offline
---

Most software today assumes a network connection. Open an app, and it phones home before showing you anything. Click a button, and it waits for a server. Lose Wi-Fi, and the whole thing becomes a brick.

I think that's a design failure, not a technical necessity.

## The network is not the computer

Sun's old slogan was "the network is the computer." It was catchy, but it led us to build software that treats the local machine as a thin client for someone else's computer. Your data lives on their servers. Your actions require their permission. Your work stops when their API has an outage.

Offline-first software flips this. The local machine is the computer. The network is an optional enhancement.

When you write code that works offline:

- You own your data. It lives on your disk, not someone else's.
- You work anywhere. On a plane, in a tunnel, during an outage.
- You sync when you want, not when the app demands it.
- You aren't locked into a service that might shut down next year.

## What offline-first means in practice

It means the application works with local data first. Reads hit a local database or file. Writes go local, then sync in the background. The UI never shows a spinner waiting for a round trip to the server just to display what you already know.

It means thinking about conflict resolution up front. If you edit a document offline and someone else edits it online, what happens when you reconnect? Last-write-wins? Merge? You need an answer before you ship.

It means your tests don't need a mock server. They run against local state, which makes them faster and more reliable.

## Not everything should be offline

Real-time collaboration, multiplayer games, and live dashboards need a network. That's fine. But even those can store local state and sync when possible.

The default should be local. The network should be the exception.

---

*Reach me at hello@asimawdah.com.*
