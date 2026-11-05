# Abia Citizen Request — Pilot Demo

Professional demo of a citizen complaint / service request system for Abia State:

1. **Report** — submit issue → receive ticket ID  
2. **Status** — look up by ID  
3. **Desk** — officer queue, update status + note  

## Stack
Next.js 14 · TypeScript · Tailwind · in-memory store (demo only)

## Run
```bash
npm install
npm run dev
```

## Production note
Replace in-memory store with a database, add officer auth, audit log, and official domain under state ownership.
