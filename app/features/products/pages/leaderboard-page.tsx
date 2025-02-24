import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import type { Route } from "./+types/leaderboard-page";
import { PageHeader } from "~/common/components/page-header";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Leaderboard | Wemake" },
    { name: "description", content: "Top products leaderboard" },
  ];
};


export default function LeaderboardPage() {
  return (
    <div className="space-y-20">
      <PageHeader
        title="Leaderboards"
        description="The most popular products on Wemake"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Daily Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products by day
          </p>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={10}
            viewsCount={10}
            votesCount={120}
          />
        ))}
        <Button variant="link" className="text-xl font-light self-center">
          <Link to="/products/leaderboards/daily">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Weekly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products by week
          </p>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={10}
            viewsCount={10}
            votesCount={120}
          />
        ))}
        <Button variant="link" className="text-xl font-light self-center">
          <Link to="/products/leaderboards/weekly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Monthly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products by month
          </p>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={10}
            viewsCount={10}
            votesCount={120}
          />
        ))}
        <Button variant="link" className="text-xl font-light self-center">
          <Link to="/products/leaderboards/monthly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Yearly Leaderboard
          </h2>
          <p className="text-xl font-light text-foreground">
            The most popular products by year
          </p>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={10}
            viewsCount={10}
            votesCount={120}
          />
        ))}
        <Button variant="link" className="text-xl font-light self-center">
          <Link to="/products/leaderboards/yearly">
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
