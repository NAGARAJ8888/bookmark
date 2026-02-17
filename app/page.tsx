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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Smart Bookmark
        </h1>

        <p className="text-gray-500 mb-6 text-sm">
          Your private, real-time bookmark manager
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium cursor-pointer"
        >
          Sign in with Google
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  )
}