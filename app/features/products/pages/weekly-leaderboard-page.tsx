import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Weekly Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the week" },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, week } = params;
  return {
    date: { year, week },
    products: [],
  };
}

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { date, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Weekly Leaderboard</h1>
      <p className="text-gray-600">
        Year {date.year}, Week {date.week}
      </p>
    </div>
  );
}
