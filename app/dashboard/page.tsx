import Navbar from "@/components/Navbar"
import BookmarkForm from "@/components/BookmarkForm"
import BookmarkList from "@/components/BookmarkList"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <BookmarkForm />
        <BookmarkList />
      </div>
    </div>
  )
}