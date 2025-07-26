import Link from 'next/link';
import { zines, featuredZines, trendingZines, fictionZines, poetryZines, techZines } from './data';
import ZineCard from '@/components/zine/ZineCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from 'lucide-react';
import { Zine } from '../data';

export default function ExplorePage() {
  const allZines = zines.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-8">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
          Explore
        </h1>
      </section>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="art">Art</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="poetry">Poetry</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ExploreSection title="Featured" zines={featuredZines} />
          <ExploreSection title="Trending" zines={trendingZines} />
           <ExploreSection title="Fiction" zines={fictionZines.slice(0,6)} />
        </TabsContent>
        <TabsContent value="art">
           <ExploreSection title="Art" zines={zines.slice(0, 6)} />
        </TabsContent>
        <TabsContent value="fiction">
           <ExploreSection title="Fiction" zines={fictionZines} />
        </TabsContent>
        <TabsContent value="poetry">
           <ExploreSection title="Poetry" zines={poetryZines} />
        </TabsContent>
        <TabsContent value="tech">
           <ExploreSection title="Tech" zines={techZines} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ExploreSection({ title, zines, viewAllLink }: { title: string, zines: Zine[], viewAllLink?: string }) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-headline">
          {title}
        </h2>
        {viewAllLink && (
           <Button variant="link" asChild>
            <Link href={viewAllLink}>
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {zines.map((zine, index) => (
          <ZineCard key={`${zine.id}-${index}`} zine={zine} />
        ))}
      </div>
    </section>
  )
}
