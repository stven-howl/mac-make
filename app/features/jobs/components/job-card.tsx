import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../common/components/ui/card";
import { Button } from "../../../common/components/ui/button";
import { Badge } from "../../../common/components/ui/badge";

interface JobCardProps {
  id: string;
  company: string;
  companyLogoUrl: string;
  title: string;
  salary: string;
  location: string;
  createdAt: string;
  type: string;
  positionLocation: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  title,
  salary,
  location,
  createdAt,
  type,
  positionLocation,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={companyLogoUrl}
              alt={`${company} Logo`}
              className="size-10 rounded-full"
            />
            <div className="space-x-2">
              <span className="font-medium text-accent-foreground">
                {company}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {createdAt}
              </span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">{positionLocation}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {salary}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {location}
            </span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
