'use client'

import { Categories } from './Categories'
import { CommunitySidebar } from './CommunitySidebar'
import { PostList } from './PostList'

export function CommunityContent() {
  return (
    <div className="p-6">
      {/* Categories */}
      <Categories />

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PostList />
        </div>
        <div>
          <CommunitySidebar />
        </div>
      </div>
    </div>
  )
}
