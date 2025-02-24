interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col py-20 items-center justify-center rounded-md bg-gradient-to-t from-background to-primary/10">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-2xl font-light text-foreground">{description}</p>
    </div>
  );
}
