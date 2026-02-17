"use client"

import { supabase } from "@/lib/supabaseClient"

export default function Navbar() {
  const logout = async () => {
    await supabase.auth.signOut()
    location.href = "/"
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Smart Bookmark
        </h1>
        <button
          onClick={logout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  )
}