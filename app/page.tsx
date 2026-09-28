"use client";

import { useState } from "react";

type Post = {
  id: number;
  author: string;
  username: string;
  content: string;
  time: string;
  likes: number;
  replies: number;
};

const startingPosts: Post[] = [
  {
    id: 1,
    author: "Maya",
    username: "@maya",
    content:
      "I finally finished the book I've been reading for three months. Definitely worth it.",
    time: "2m",
    likes: 4,
    replies: 2,
  },
  {
    id: 2,
    author: "Omar",
    username: "@omar",
    content: "Anyone else finding this week ridiculously long?",
    time: "5m",
    likes: 7,
    replies: 3,
  },
  {
    id: 3,
    author: "Samer",
    username: "@Samer",
    content:
      "Trying a new coffee place this afternoon. Give me your best coffee order.",
    time: "12m",
    likes: 2,
    replies: 5,
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(startingPosts);
  const [text, setText] = useState("");

  function createPost() {
    if (!text.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: "You",
      username: "@participant",
      content: text,
      time: "now",
      likes: 0,
      replies: 0,
    };

    setPosts([newPost, ...posts]);
    setText("");
  }

  function likePost(id: number) {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  }

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-2xl px-5 py-4">
          <h1 className="text-xl font-bold">SocialFeed</h1>
        </div>
      </header>

      <div className="mx-auto max-w-2xl">
        {/* Create post */}
        <section className="border-b bg-white p-5">
          <div className="flex gap-3">
            <Avatar name="Y" />

            <div className="flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                className="min-h-24 w-full resize-none rounded-lg border border-neutral-300 p-3 outline-none focus:border-neutral-500"
              />

              <div className="mt-2 flex justify-end">
                <button
                  onClick={createPost}
                  disabled={!text.trim()}
                  className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white disabled:opacity-30"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="bg-white">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => likePost(post.id)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}

function PostCard({
  post,
  onLike,
}: {
  post: Post;
  onLike: () => void;
}) {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState<string[]>([]);

  function submitReply() {
    if (!reply.trim()) return;

    setReplies([...replies, reply]);
    setReply("");
    setShowReply(false);
  }

  return (
    <article className="border-b p-5">
      <div className="flex gap-3">
        <Avatar name={post.author[0]} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">{post.author}</span>
            <span className="text-neutral-500">{post.username}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500">{post.time}</span>
          </div>

          <p className="mt-2 leading-6">{post.content}</p>

          <div className="mt-4 flex gap-6 text-sm text-neutral-500">
            <button
              onClick={() => setShowReply(!showReply)}
              className="hover:text-black"
            >
              Reply · {post.replies + replies.length}
            </button>

            <button onClick={onLike} className="hover:text-black">
              ♡ {post.likes}
            </button>
          </div>

          {/* Reply input */}
          {showReply && (
            <div className="mt-4 flex gap-2">
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Reply to ${post.author}...`}
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              />

              <button
                onClick={submitReply}
                className="rounded-lg bg-black px-4 py-2 text-sm text-white"
              >
                Reply
              </button>
            </div>
          )}

          {/* Display replies */}
          {replies.length > 0 && (
            <div className="mt-4 space-y-3 border-l-2 border-neutral-200 pl-4">
              {replies.map((replyText, index) => (
                <div key={index}>
                  <div className="text-sm">
                    <span className="font-semibold">You</span>
                    <span className="ml-2 text-neutral-500">
                      @participant · now
                    </span>
                  </div>

                  <p className="mt-1 text-sm">{replyText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-semibold">
      {name}
    </div>
  );
}