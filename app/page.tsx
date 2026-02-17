"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.replace("/dashboard")
      }
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.replace("/dashboard")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <button
        onClick={handleLogin}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  )
}