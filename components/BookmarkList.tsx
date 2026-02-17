"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Bookmark } from "@/lib/types"
import BookmarkItem from "./BookmarkItem"

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    let channel: any

    const setup = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // Initial fetch
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setBookmarks(data || [])

      // Proper filtered realtime subscription
      channel = supabase
              .channel("bookmarks-channel")
              .on(
                "postgres_changes",
                {
                  event: "*",
                  schema: "public",
                  table: "bookmarks",
                  filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                  console.log("Realtime fired:", payload)

                  if (payload.eventType === "INSERT") {
                    setBookmarks((prev) => [
                      payload.new as Bookmark,
                      ...prev,
                    ])
                  }

                  if (payload.eventType === "DELETE") {
                    setBookmarks((prev) =>
                      prev.filter((b) => b.id !== payload.old.id)
                    )
                  }
                }
              )
              .subscribe()
    }

    setup()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  )
}