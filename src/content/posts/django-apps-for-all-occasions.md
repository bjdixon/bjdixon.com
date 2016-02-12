---
title: "Django apps and extensions for all occasions"
date: 2014-01-20
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

I've used most of these and the others are highly recommended. I'll be using them when the need arises. Pretty much I update this list as I find better alternatives or discover new gems. 

The descriptions are mostly not mine, but provide a good reminder for use-cases.

**django-debug-toolbar:** Gives you a running toolbar on all your pages when in development showing static contents, templates, context and a variety of other really cool things. Removes the need to debug from terminal.

**django-mptt:** Efficient DB storage and retrieval of hierarchical data. e.g. modelling nested sections of a website, navigation trees, or any other parent-child relationships.

**django-fsm:** Manage state and transitions, safely and effectively. Great for workflows. Any time you find yourself using boolean fields that are dependant and mutually exclusive, you probably need a state field.

**django-crispy-forms:** simple things like adding the necessary markup for bootstrap to forms is super-boring otherwise ; in general, it helps with custom form layout, which is usually a template maintenance hell

**django-rest-framework:** for making REST APIs - more customizable than tastypie

**django-secure:** to help improve any django project's security in a very simple way.

**django-remote-forms:** for working with django's forms in a purely RESTful way.

**django-haystack:** makes search really easy.

**django-allauth:** deals with a lot of the authentication flow for you, and supports a lot of oauth providers.

**django-oauth2-provider:** for easy-to-configure Oauth2 authentication in django. works nicely with tastypie and djangorestframework as an added bonus

**django-taggit:** a django tagging app and the autosuggest works with it to auto suggest tags that have already been used previously when you start typing.

**django-braces:** nice set of mixins. I'm pretty sure you have already written something similar, but these are better. 

**django mailer:** provides a backend for sending email (EMAIL_BACKEND) which stores emails in a queue in the database, to be sent out later from a cronjob using your actual email backend.

**django-jenkins:** CI

**Fabric:** Run tests before committing

**sorl-thumbnail:** Makes it easy to process images and display thumbnails.

**celery:** this once was a django extension, but is still nice for delayed tasks.

**selenium:** for functional testing

###References

http://www.reddit.com/r/django/comments/1ypfre/ask_rdjango_what_are_your_favourite_extensions/
https://news.ycombinator.com/item?id=7030994
Two Scoops of Django
