import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Categories | Product Hunt Clone" },
    { name: "description", content: "Browse products by category" },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Categories</h1>
    </div>
  );
}
