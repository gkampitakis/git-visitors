# Git Visitors Badge ![visitors](https://git-visitors.vercel.app/)

## Description

A simple implementation of visitors badge.

Using: 
- Vercel for serving the function
- MongoDB Atlas for database.


Got this idea from [Gerhut](https://github.com/Gerhut).

Notes: 

In order to run properly you need to create an index on mongodb at the collection

```bash
createIndex({ 'url': 1 }, { 'unique': true })
```