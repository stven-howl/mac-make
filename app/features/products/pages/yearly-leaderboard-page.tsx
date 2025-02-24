import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Yearly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the year" },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year } = params;
  return {
    year,
    products: [],
  };
}

export default function YearlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { year, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Yearly Leaderboard</h1>
      <p className="text-gray-600">Year {year}</p>
    </div>
  );
}
