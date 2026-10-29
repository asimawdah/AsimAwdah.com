---
title: The IDE Should Get Out of the Way
date: 2026-10-28
description: Why I prefer editors that stay out of my head over ones that try to think for me.
slug: the-ide-should-get-out-of-the-way
---

I've used a lot of editors over the years. Some are tiny. Some are full IDEs with project indexing, refactoring, linting, type checking, and AI completion built in. The heavier ones promise to make me more productive. Usually, they just make me more distracted.

The best coding sessions I've had are in editors that do one thing well: they let me read and write code without intervening.

## The problem with "helpful" tools

Modern IDEs are eager to help. They highlight errors before you finish typing. They suggest variable names. They offer to extract methods, inline constants, and rewrite your control flow. All of this happens while you're trying to think.

The trouble is that thinking and editing are the same activity when you're programming. You don't write code, then think about it. You think by writing. When an editor constantly interrupts with pop-ups, squiggles, and auto-completions, it breaks the thread.

I don't want my editor to have opinions about my code. I want it to hold the text, move the cursor, search when I ask, and otherwise disappear.

## What I actually use

My setup is intentionally dull:

- A text editor with syntax highlighting and basic indentation
- A terminal running the actual compiler or interpreter
- Git for version control
- A browser for documentation

That's it. No project indexer re-scanning my files in the background. No language server telling me I missed a semicolon while I'm mid-thought. When I want to check types or run tests, I do it explicitly in the terminal.

The feedback loop is slower by a few seconds, but it's mine. I decide when to run the linter. I decide when to refactor. The editor doesn't decide for me.

## Complexity budget

Every tool has a complexity budget. An IDE spends most of its budget on features you don't use most of the time. A simple editor spends its budget on being fast, predictable, and easy to reason about.

I'd rather spend my mental budget on the problem I'm solving, not on learning how to configure my editor to stop "helping."

Code is hard enough without your tools second-guessing you.

---

*If you want to discuss tools, I'm at hello@asimawnah.com.*
