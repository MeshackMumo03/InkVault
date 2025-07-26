import Link from 'next/link';
import { zines } from '@/app/data';
import ZineCard from '@/components/zine/ZineCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from './data';

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
          Discover New Zines
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
          Find your next favorite publication. Search by title, author, or keyword.
        </p>
        <div className="mt-6 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search for zines..." className="pl-10 h-12 text-lg" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center md:text-left">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                 <p className="text-sm text-muted-foreground">{category.zineCount} publications</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button variant="outline" asChild>
                  <Link href="#">
                    View Category <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center md:text-left">
          Trending Zines
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {zines.slice(0, 4).map((zine) => (
            <ZineCard key={zine.id} zine={zine} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg">Explore More Zines</Button>
        </div>
      </section>
    </div>
  );
}
