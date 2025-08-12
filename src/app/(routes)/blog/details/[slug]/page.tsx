"use client"
import DetailsBlog from '@/src/view/blog/blogDetails'
import { useParams } from 'next/navigation'
import React, { use } from 'react'

function BlogDetails() {
    const {slug}=useParams()
  return (
    <div><DetailsBlog/></div>
  )
}

export default BlogDetails