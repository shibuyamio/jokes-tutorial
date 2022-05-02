import type { Joke } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Pick<Joke, "content"> | null };

export const loader: LoaderFunction = async ({ params }) => {
  console.log(params);

  const data: LoaderData = {
    joke: await db.joke.findUnique({
      select: { content: true },
      where: { id: params.jokeId },
    }),
  };

  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
    </div>
  );
}
