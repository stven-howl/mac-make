import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Product | Product Hunt Clone" },
    { name: "description", content: "Submit your product" },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  // Handle form submission
  return {};
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { categories } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Submit Your Product</h1>
    </div>
  );
}
