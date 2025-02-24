import type { Route } from "~/types";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Daily Leaderboard | Product Hunt Clone" },
    { name: "description", content: "Top products of the day" },
  ];
};

export function loader({ request, params }: Route.LoaderArgs) {
  const { year, month, day } = params;
  return {
    date: { year, month, day },
    products: [],
  };
}

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  const { date, products } = loaderData;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Daily Leaderboard</h1>
      <p className="text-gray-600">
        {date.year}/{date.month}/{date.day}
      </p>
    </div>
  );
}
