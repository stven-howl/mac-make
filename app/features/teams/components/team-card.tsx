import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";

interface TeamCardProps {
  id: string;
  leaderName: string;
  leaderAvatar: string;
  projectTitle: string;
  roles: string[];
}

export function TeamCard({
  id,
  leaderName,
  leaderAvatar,
  projectTitle,
  roles,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center gap-4">
          <CardTitle className="text-base leading-loose">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center gap-2 text-base"
            >
              <span>{leaderName}</span>
              <Avatar className="size-5">
                <AvatarImage src={leaderAvatar} />
                <AvatarFallback>{leaderName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            </Badge>
            <span>is looking for</span>
            {roles.map((role, index) => (
              <Badge key={index} variant="default" className="text-base">
                {role}
              </Badge>
            ))}
            <span> to build</span>
            <span> {projectTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="justify-end">
          <Button variant="link">Join team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
