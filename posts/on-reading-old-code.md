---
title: On Reading Old Code
date: 2026-10-25
description: Why reading code you wrote years ago is one of the best ways to improve.
slug: on-reading-old-code
---

Open a project you haven't touched in three years. Read the code. Chances are, you'll wince.

That wince is growth.

## Your past self is a stranger

Code you wrote long ago reads like it was written by someone else. Maybe it was. You were different then. You cared about different things. You didn't know what you know now.

The bad news: much of it will be embarrassing. Clever tricks that don't pay off. Abstractions that solve problems you no longer have. Comments explaining the obvious and omitting explanations for the non-obvious.

The good news: you can spot it now. That's the point.

## What to look for

When I read old code, I look for three things:

1. **What was I trying to protect against?** Defensive code often reveals the real constraints of the time — a shaky API, a flaky dependency, a team convention that no longer applies.
2. **What did I overcomplicate?** The functions that are 100 lines when 20 would do. The classes that wrap other classes. The design patterns used "just in case."
3. **What still works?** The parts you don't want to touch. Those are the ones with clear names, simple logic, and few dependencies.

Delete what doesn't serve. Keep what does. Rewrite the rest.

## Make it a habit

Reading old code isn't just about cleaning up. It's about calibrating your taste. If everything you wrote two years ago looks perfect, you haven't learned anything. If it all looks terrible, you've learned a lot.

Either way, you're better than you were. Now write something your future self will want to read.

---

*hello@asimawdah.com*
