async function Page({ params }) {
  const id = Number(params.id);

  let post;
  let allPosts = [];
  try {
    const response = await fetch(`http://localhost:3000/api/posts?id=${id}`);
    const allP_Response = await fetch(`http://localhost:3000/api/posts`);

    post = await response.json();
    allPosts = await allP_Response.json();
  } catch (err) {
    console.log("Error fetching post:", err);
  }

  console.log(post);
  const currentIndex = allPosts.findIndex((p) => p.id === id);
  const previousPost = allPosts[currentIndex - 1] || null;
  const nextPost = allPosts[currentIndex + 1] || null;

  return (
    <div className="flex justify-center items-center shadow border border-red-500 rounded  flex-col min-h-screen">
      {post ? (
        <>
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">
            {post.title}
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            {post.body}
          </p>
          <div className="flex gap-4">
            {previousPost && (
              <a
                href={`/posts/${previousPost.id}`}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Previous
              </a>
            )}
            {nextPost && (
              <a
                href={`/posts/${nextPost.id}`}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Next
              </a>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <h1 className="text-4xl font-extrabold text-red-600">
            Post not found
          </h1>
        </div>
      )}
    </div>
  );
}

export default Page;
