import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import { Button } from "../components/ui/button";
import { ProductCard } from "../../features/products/components/product-card";
import { PostCard } from "../../features/community/components/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";
import { JobCard } from "../../features/jobs/components/job-card";
import { TeamCard } from "../../features/teams/components/team-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | KeyStone" },
    { name: "description", content: "Welcome to KeyStone" },
  ];
};

export default function HomePage() {
  return (
    <div className="container px-20 space-y-20">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Today's Products
          </h2>
          <p className="text-xl font-light text-foreground">
            The best products for today
          </p>
          <Button variant="link" className="text-xl font-light">
            <Link to="/products/leaderboards">Explore all products &rarr;</Link>
          </Button>
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
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest discussions
          </h2>
          <p className="text-xl font-light text-foreground">
            The latest discussions
          </p>
          <Button variant="link" className="text-xl font-light">
            <Link to="/products/leaderboards">
              Explore all discussions &rarr;
            </Link>
          </Button>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <PostCard
            key={index}
            id={`postId-${index}`}
            title={`What is the best productivity app?`}
            author="Nico"
            authorAvatar="https://github.com/shadcn.png"
            category="Productivity"
            createdAt="12 hours ago"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            IdeasGPT
          </h2>
          <p className="text-xl font-light text-foreground">
            Find Ideas for your next project
          </p>
          <Button variant="link" className="text-xl font-light">
            <Link to="/products/leaderboards">Explore all ideas &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <IdeaCard
            key={index}
            id="ideaId"
            title="A startup that creates an AI-powered productivity app, delivering customized recommendations and tracking of progress using a mobile app"
            viewCount={123}
            likeCount={123}
            createdAt="12 hours ago"
            claimed={index % 2 !== 0}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Latest jobs
          </h2>
          <p className="text-xl font-light text-foreground">
            Find the latest jobs
          </p>
          <Button variant="link" className="text-xl font-light">
            <Link to="/products/leaderboards">Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <JobCard
            key={index}
            id="jobId"
            company="Tesla"
            companyLogoUrl="https://github.com/teslamotors.png"
            title="Software Engineer"
            salary="$100,000 - $120,000"
            location="San Francisco, CA"
            createdAt="12 hours ago"
            type="Full-time"
            positionLocation="Remote"
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h2 className="text-5xl font-bold leading-tight tracking-tight">
            Find a team mate
          </h2>
          <p className="text-xl font-light text-foreground">
            Join a team to build your next big idea
          </p>
          <Button variant="link" className="text-xl font-light">
            <Link to="/products/leaderboards">Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <TeamCard
            key={index}
            id="teamId"
            leaderName="Nico"
            leaderAvatar="https://github.com/shadcn.png"
            projectTitle="social media app"
            roles={["React Developer", "Backend Developer", "Product Manager"]}
          />
        ))}
      </div>
    </div>
  );
}
