"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookmarkForm() {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const addBookmark = async () => {
    if (!title || !url) return
  
    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if (!user) return
  
    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])
  
    if (error) {
      console.error("Insert error:", error)
    }
  
    setTitle("")
    setUrl("")
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-lg font-semibold mb-4">
        Add New Bookmark
      </h2>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Bookmark Title"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="url"
          placeholder="https://example.com"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  )
}