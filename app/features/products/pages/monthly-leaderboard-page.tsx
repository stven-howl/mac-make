import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Monthly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the month" },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month } = params;
  return {
    date: { year, month },
    products: [],
  };
}

export default function MonthlyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { date, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Monthly Leaderboard</h1>
      <p className="text-gray-600">
        {date.year}/{date.month}
      </p>
    </div>
  );
}
