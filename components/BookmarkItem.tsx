"use client"

import { supabase } from "@/lib/supabaseClient"
import { Bookmark } from "@/lib/types"

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const deleteBookmark = async () => {
    await supabase.from("bookmarks").delete().eq("id", bookmark.id)
  }

  return (
    <div className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 flex justify-between items-center mb-2">
      <div className="flex flex-col">
        <a
          href={bookmark.url}
          target="_blank"
          className="text-blue-600 font-medium hover:underline break-all"
        >
          {bookmark.title}
        </a>
        <span className="text-sm text-gray-500 break-all">
          {bookmark.url}
        </span>
      </div>

      <button
        onClick={deleteBookmark}
        className="text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer"
      >
        Delete
      </button>
    </div>
  )
}