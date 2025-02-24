import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { DotIcon } from "lucide-react";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  createdAt: string;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatar,
  category,
  createdAt,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={authorAvatar} />
            <AvatarFallback>{author[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex text-sm leading-tight text-muted-foreground gap-2">
              <span>{author}</span>
              <DotIcon className="w-4 h-4" />
              <span>{category}</span>
              <DotIcon className="w-4 h-4" />
              <span>{createdAt}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link" className="text-xs font-light" asChild>
            <Link to={`/community/${id}`}>Reply &rarr;</Link>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
