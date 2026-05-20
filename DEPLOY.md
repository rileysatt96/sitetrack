# SiteTrack — Deployment Guide

## Step 1: Set up the database (5 minutes)

1. Go to https://supabase.com and open your project
2. In the left sidebar, click **SQL Editor**
3. Click **New query**
4. Open the file `schema.sql` from this folder, copy the entire contents, paste it into the editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned" — your tables and sample data are created

## Step 2: Create your admin account (2 minutes)

1. Still in Supabase SQL Editor, run this query (replace with your real details):

```sql
INSERT INTO users (name, email, pin, role) VALUES
  ('Your Name', 'you@yourcompany.com', '1234', 'admin');
```

2. You can delete the placeholder admin from the seed data:
```sql
DELETE FROM users WHERE email = 'admin@yourcompany.com';
```

## Step 3: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com and sign up (free) with your GitHub account
2. Install the Vercel CLI (optional) OR use the web interface:

### Option A — Drag & Drop (easiest):
1. Go to https://vercel.com/new
2. Click "Browse" and select the entire `sitetrack` folder
3. Click Deploy
4. In ~60 seconds you'll get a URL like `sitetrack-abc123.vercel.app`

### Option B — GitHub (recommended for ongoing updates):
1. Create a new repo at https://github.com/new
2. Upload the sitetrack folder contents to it
3. Go to https://vercel.com/new, import your GitHub repo
4. Click Deploy
5. Future updates: just push to GitHub, Vercel auto-redeploys

## Step 4: Customize (2 minutes)

Open `js/config.js` and update:
- `companyName` — your company name
- `overdueThresholdDays` — how many days before an item is flagged (default: 7)

## Step 5: Add your equipment (ongoing)

1. Open your new URL, log in as admin
2. Go to **Admin** tab
3. Add your jobsites, supervisors, and equipment
4. Go to **Admin → Print QR Labels** to generate labels for all items
5. Print on Avery 22807 2"×2" labels (or similar), laminate, stick on equipment

## Step 6: Share with supervisors

1. In the Admin tab, add each supervisor with their name, email, and a PIN
2. Send them the URL and their PIN
3. They can "Add to Home Screen" on iPhone/Android to install it like an app

---

## Ongoing: Adding more equipment

Just use the Admin tab — no code changes needed.

## Ongoing: Closing a jobsite

In Supabase, run:
```sql
UPDATE jobsites SET status = 'closed' WHERE name = 'Your Site Name';
```
(A UI for this can be added later)

## Questions?

The app is built with plain HTML/CSS/JS + Supabase. Any web developer can maintain or extend it.
