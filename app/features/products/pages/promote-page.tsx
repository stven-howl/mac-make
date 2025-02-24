import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Promote Product | Product Hunt Clone" },
    { name: "description", content: "Promote your product" },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    promotionPlans: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  // Handle promotion form submission
  return {};
}

export default function PromotePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { promotionPlans } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Promote Your Product</h1>
    </div>
  );
}
