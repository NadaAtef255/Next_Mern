import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(typeof +id);
  const client = await clientPromise;
  const db = client.db("Next");
  let response;
  if (id) {
    const post = await db.collection("Posts").findOne({ id: +id });
    response = post;
  } else {
    const posts = await db.collection("Posts").find({}).toArray();
    response = posts;
    console.log(response);
  }

  return new Response(JSON.stringify(response));
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("Next");

  try {
    const { title, body } = await req.json();

    if (!title || !body) {
      return new Response(
        JSON.stringify({ error: "Title and body are required" }),
        {
          status: 400,
        }
      );
    }

    const newPost = {
      id: Date.now(),
      userId: 9,
      title,
      body,
    };

    await db.collection("Posts").insertOne(newPost);

    return new Response(
      JSON.stringify({ message: "Post added successfully", post: newPost }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to add post" }), {
      status: 500,
    });
  }
}
