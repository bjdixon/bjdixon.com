---
title: "Replacing partial strings in MySQL databases"
date: 2014-07-31
author: "bjdixon"
authorUrl: "https://github.com/bjdixon"
template: post.hbt
---

I'm sure there's a better way but sometimes I need to replace a partial string in a database. For example replacing a domain name. 

Be careful with this. Find/replace is awesome and if you're not careful it can really screw you up. With that in mind:

    UPDATE DBNAME.TableName
    SET DBNAME.TableName = REPLACE(DBNAME.TableName.FieldName,'OldString','NewString')
    WHERE DBNAME.TableName.FieldName like '%OldString%';
