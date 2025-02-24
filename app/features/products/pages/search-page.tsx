import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Search Products | Product Hunt Clone" },
    { name: "description", content: "Search for products" },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  return {
    query,
    searchResults: [],
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { query, searchResults } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Search Products</h1>
      <p className="text-gray-600">Search query: {query}</p>
    </div>
  );
}
