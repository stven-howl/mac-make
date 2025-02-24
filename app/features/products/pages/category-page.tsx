import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Category | Product Hunt Clone" },
    { name: "description", content: "Products in this category" },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { category } = params;
  return {
    category,
    products: [],
  };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  const { category, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Category: {category}</h1>
    </div>
  );
}
