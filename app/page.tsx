"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        window.location.href = "/dashboard"
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          window.location.href = "/dashboard"
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  )
}