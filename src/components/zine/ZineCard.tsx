import Image from 'next/image';
import Link from 'next/link';
import type { Zine } from '@/app/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ZineCardProps {
  zine: Zine;
}

export default function ZineCard({ zine }: ZineCardProps) {
  return (
    <Link href={`/zine/${zine.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] overflow-hidden">
            <Image
              src={zine.coverImage}
              alt={`Cover of ${zine.title}`}
              width={400}
              height={600}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={zine.aiHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-headline group-hover:text-accent transition-colors">{zine.title}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-sm text-muted-foreground">by {zine.author}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
