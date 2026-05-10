/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

interface PostItemProps {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  author: {
    name: string;
    image: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: object;
}

const PostItem: React.FC<PostItemProps> = ({
  slug,
  title,
  description,
  author,
  mainImage,
}) => {
  return (
    <Link href={`/post/${slug.current}`}>
      <div className="rounded-lg group cursor-pointer overflow-hidden">
        {mainImage?.asset?.url && (
          <img
            src={mainImage.asset.url}
            alt={title}
            className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          />
        )}

        <div className="flex justify-between p-5 bg-white">
          <div>
            <p>{title}</p>
            <p>
              {description} By {author?.name}
            </p>
          </div>

          <img
            src={author?.image}
            alt={author?.name}
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>
    </Link>
  );
};

interface PostsProps {
  posts: PostItemProps[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
    {posts.map((post, idx) => (
      <PostItem key={idx} {...post} />
    ))}
  </div>
);

export default Posts;