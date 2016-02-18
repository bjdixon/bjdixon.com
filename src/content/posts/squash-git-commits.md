---
title: "Squashing git commits"
date: 2014-06-25
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

One liner to squash the last n commits. Don't do this if you've already pushed commits upstream. Rewriting history isn't cool.

    git reset --soft HEAD~3 && git commit -m"Squashing last 3 commits"

Example given above is for the last 3 commits.
