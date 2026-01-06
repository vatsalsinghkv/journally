import prisma from "@/lib/prisma";
import React from "react";

export default async function Posts() {
  const posts = await prisma.post.findMany();
  return (
    <div>
      <h1>Posts - {posts.length}</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
