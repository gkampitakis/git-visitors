# Git Visitors Badge 

![visitors](https://git-visitors.gkampitakis.vercel.app/api)

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

Also I have created two cronjobs which reset the `daily` and `monthly` metrics each day and month respectively.

Run locally: 
```bash

npm run setupEnv

# If you dont have installed vercel run npm i -g vercel@latest
vercel login

vercel dev

```

Publish: 

```bash 
vercel --prod
```

## Supported Routes

All routes are `@Get`requests.

- `/api/reset/all` Reset all metrics for all destinations.
- `/api/reset/monthly` Reset monthly metrics for all destinations.
- `/api/reset/daily` Reset daily metrics for all destinations.
- `/api/*` When called the prefix creates a domain and starts countering visits. (eg /api/home)