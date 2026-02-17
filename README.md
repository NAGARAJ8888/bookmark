# 🔖 Smart Bookmark App

A full-stack real-time bookmark manager built using **Next.js (App Router)** and **Supabase**.

Users can securely sign in with Google, store private bookmarks, and see real-time updates across multiple tabs — all without page refresh.

---

## 🚀 Live Demo

👉 https://bookmark-gilt-seven.vercel.app

---

## ✨ Features

- 🔐 Google OAuth Authentication (Supabase Auth)
- 🗄 Private user bookmarks (Row Level Security)
- ⚡ Real-time updates using Supabase Realtime
- 🧹 Instant delete & insert sync across tabs
- 📱 Fully responsive UI (Tailwind CSS)
- ☁️ Deployed on Vercel

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- Supabase (Auth, Database, Realtime)
- PostgreSQL
- Tailwind CSS
- Vercel Deployment

---

## 🔐 Database Design

```sql
bookmarks
- id (uuid)
- user_id (uuid, references auth.users)
- title (text)
- url (text)
- created_at (timestamp)