"use client";

import { useEffect, useState } from "react";
import Posts from "@/components/Post";
import { postList } from "@/utils/constants/posts";

export default function UserHome() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("posts");

    if (stored) {
      // ✅ Use saved posts
      setPosts(JSON.parse(stored));
    } else {
      // ✅ First time → seed with default posts
      localStorage.setItem("posts", JSON.stringify(postList));
      setPosts(postList);
    }
  }, []);

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
}