/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { postList } from "@/utils/constants/posts";

/* ================= TYPES ================= */

// Comment type
interface CommentType {
  id: number;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
}

// Rich text child
interface Child {
  text: string;
  bold?: boolean;
}

// Block content
interface Block {
  type: "paragraph";
  children: Child[];
}

// Post type
interface Post {
  slug: { current: string };
  title: string;
  description: string;
  createdAt: string;
  mainImage?: {
    asset?: { url?: string };
  };
  author?: {
    name?: string;
    image?: string;
  };
  body?: Block[];
  comments?: CommentType[];
}

/* ================= CLIENT COMMENT COMPONENT ================= */

function CommentSection({ slug }: { slug: string }) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Used only to force UI refresh after adding comment
  const [, setRefresh] = useState<boolean>(false);

  // Validate form fields
  const validate = (): string | null => {
    if (!name || !email || !comment) {
      return "All fields are required";
    }

    if (name.length < 5 || name.length > 100) {
      return "Name must be between 5 and 100 characters";
    }

    if (comment.length < 10 || comment.length > 1000) {
      return "Comment must be between 10 and 1000 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    return null;
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    const newComment: CommentType = {
      id: Date.now(),
      name,
      email,
      comment,
      createdAt: new Date().toISOString(),
    };

    const posts = postList as Post[];

    const postIndex = posts.findIndex(
      (p) => p.slug.current === slug
    );

    if (postIndex !== -1) {
      if (!posts[postIndex].comments) {
        posts[postIndex].comments = [];
      }

      posts[postIndex].comments?.push(newComment);
    }

    // Reset form
    setName("");
    setEmail("");
    setComment("");

    // Force UI refresh
    setRefresh((prev) => !prev);
  };

  const currentPost = (postList as Post[]).find(
    (p) => p.slug.current === slug
  );

  return (
    <>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-200" />

      <div className="max-w-3xl mx-auto p-5">
        <h3 className="text-yellow-500">Enjoyed this article?</h3>
        <h4 className="text-3xl font-bold">
          Leave a comment below!
        </h4>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-7 flex flex-col gap-5"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="border px-3 py-2 rounded"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Your email"
            className="border px-3 py-2 rounded"
          />

          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            className="border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded"
          >
            Submit
          </button>
        </form>

        {/* COMMENTS */}
        <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow">
          <h3 className="text-4xl">Comments</h3>
          <hr className="pb-2" />

          {currentPost?.comments?.length ? (
            currentPost.comments.map((c) => (
              <div key={c.id}>
                <p>
                  <span className="text-yellow-500">
                    {c.name}
                  </span>
                  : {c.comment}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* ================= MAIN PAGE ================= */

// eslint-disable-next-line @next/next/no-async-client-component
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = (postList as Post[]).find(
    (p) => p.slug.current === slug
  );

  if (!post) {
    return (
      <div className="p-10 text-center text-xl">
        Post not found
      </div>
    );
  }

  return (
    <main>
      <Header />

      {/* MAIN IMAGE */}
      <img
        src={post.mainImage?.asset?.url ?? ""}
        alt={post.title || "Post image"}
        className="w-full h-56 object-cover"
      />

      {/* CONTENT */}
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3 font-bold">
          {post.title}
        </h1>

        <h2 className="text-xl font-light text-gray-500 mb-4">
          {post.description}
        </h2>

        {/* AUTHOR */}
        <div className="flex items-center space-x-3 mb-10">
          <img
            className="h-10 w-10 rounded-full"
            src={post.author?.image ?? ""}
            alt={post.author?.name ?? "Author"}
          />

          <p className="text-sm text-gray-600">
            Blog post by{" "}
            <span className="font-semibold">
              {post.author?.name ?? "Unknown"}
            </span>{" "}
            —{" "}
            {new Date(post.createdAt).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>

        {/* BODY */}
        <div className="space-y-6">
          {post.body?.map((block, i) => (
            <div key={i}>
              {block.type === "paragraph" && (
                <p className="text-lg leading-8 text-gray-800">
                  {block.children.map((child, j) => (
                    <span
                      key={j}
                      className={
                        child.bold ? "font-semibold" : ""
                      }
                    >
                      {child.text}
                    </span>
                  ))}
                </p>
              )}

              {/* Inline image after 2nd block */}
              {i === 1 && (
                <img
                  src={
                    post.mainImage?.asset?.url ?? ""
                  }
                  alt="Inline"
                  className="w-full rounded-lg my-8"
                />
              )}
            </div>
          ))}
        </div>
      </article>

      {/* COMMENTS SECTION */}
      <CommentSection slug={slug} />
    </main>
  );
}
