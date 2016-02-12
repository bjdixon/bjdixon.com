---
title: "Installing and using virtualenvwrapper"
date: 2013-12-14
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

Virtualenv is a part of everyday life. However it can be painful to manage a ton of virtual environments. Without careful management, adding virtual environments all over the place can cause clutter in version control.

virtualenvwrapper allows storing as many virtual environments as you need in a single non-project location. It provides commands to create, edit, switch, and remove virtual environments.

###Install pip

```$ sudo apt-get install python-pip```

###Install virtualenv

```$ sudo pip install virtualenv```

###Create a dir to store your virtualenvs (eg. ~/.virtualenvs)

```$ mkdir ~/.virtualenvs```

At this point virtualenv is setup with the standard commands. The following instructions are to setup the virtualenvwrapper.

###Install virtualenvwrapper

```$ sudo pip install virtualenvwrapper```

###Set WORKON_HOME to your virtualenv dir

```$ export WORKON_HOME=~/.virtualenvs```

###Add virtualenvwrapper.sh to .bashrc

Add this line to the end of ~/.bashrc so that the virtualenvwrapper commands are loaded.

```$ . /usr/local/bin/virtualenvwrapper.sh```

Exit and re-open your shell, or reload .bashrc with the command ```$ source ~/.bashrc``` and you should be ready to go.

###Create a new virtualenv

```$ mkvirtualenv myprojectenv```

to exit your new virtualenv, use **deactivate** as normal.

###Switch between enviornments with workon

To load or switch between virtualenvs, use the workon command:

```$ workon myprojectenv```

###References

http://virtualenvwrapper.readthedocs.org/en/latest/
http://www.rdegges.com/why-dont-you-use-virtualenvwrapper/
