"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postList } from "@/utils/constants/posts";

export default function WritePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    body: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newPost = {
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      title: form.title,
      author: {
        name: form.author,
        image: "https://i.pravatar.cc/150?img=3",
      },
      description: form.description,
      mainImage: {
        asset: {
          url: "https://sciencevikinglabs.com/blog/development/2021-04-13-generated-header-images/"
        },
      },
      slug: {
        current: form.title.toLowerCase().replace(/\s+/g, "-"),
      },
      body: form.body,
      comments: [],
    };

     // ✅ Get existing posts
  const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  // ✅ Add new post
  const updatedPosts = [newPost, ...existingPosts];

  // ✅ Save back
  localStorage.setItem("posts", JSON.stringify(updatedPosts));

    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Write a New Article</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author Name"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Short Description"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="body"
          placeholder="Write your article..."
          className="border p-2 rounded h-40"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded hover:opacity-80"
        >
          Publish
        </button>
      </form>
    </div>
  );
}