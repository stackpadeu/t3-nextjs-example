import { api } from "~/trpc/server";

export async function PostList() {
  const posts = await api.post.getAll();

  if (posts.length === 0) {
    return <p className="text-white/70">Nog geen posts.</p>;
  }

  return (
    <ul className="flex w-full max-w-md flex-col gap-2">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-col rounded-xl bg-white/10 px-4 py-3"
        >
          <span className="text-lg font-semibold">{post.name}</span>
          <span className="text-sm text-white/70">
            door {post.createdBy.name} ·{" "}
            {post.createdAt.toLocaleDateString("nl-NL")}
          </span>
        </li>
      ))}
    </ul>
  );
}