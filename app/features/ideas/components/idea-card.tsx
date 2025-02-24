import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  claimed: boolean;
}

export function IdeaCard({
  id,
  title,
  viewCount,
  likeCount,
  createdAt,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
        <CardContent className="flex items-center gap-2 text-sm px-0">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">{viewCount}</span>
          </div>
          <DotIcon className="w-4 h-4" />
          <span className="text-sm text-muted-foreground">{createdAt}</span>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 px-0">
          <Button variant="outline" className="text-sm font-light">
            <HeartIcon className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">{likeCount}</span>
          </Button>
          {!claimed ? (
            <Button variant="default" className="text-sm font-light">
              <Link to={`/ideas/${id}/claim`}>Claim Idea now &rarr;</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="text-sm font-light">
              <LockIcon className="w-4 h-4" />
              Claimed
            </Button>
          )}
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
