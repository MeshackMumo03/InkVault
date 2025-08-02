'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ZineCard from '@/components/zine/ZineCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from 'lucide-react';
import { zineService } from '@/services/zineService';
import { mapBackendZinesToFrontend } from '@/utils/zineMappers';
import type { FrontendZine } from '@/utils/zineMappers';

export default function ExplorePage() {
  const [allZines, setAllZines] = useState<FrontendZine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZines = async () => {
      try {
        setLoading(true);
        setError(null);
        const backendZines = await zineService.getAllZines();
        const frontendZines = mapBackendZinesToFrontend(backendZines);
        setAllZines(frontendZines);
      } catch (err) {
        console.error('Error fetching zines:', err);
        setError('Failed to load zines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchZines();
  }, []);

  // Helper function to shuffle array (for trending)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Filter functions
  const getFeaturedZines = (zines: FrontendZine[]) => {
    // Latest 3 zines (assuming higher ID = newer)
    return zines
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, 3);
  };

  const getTrendingZines = (zines: FrontendZine[]) => {
    // Random 3 zines
    return shuffleArray(zines).slice(0, 3);
  };

  const getZinesByCategory = (zines: FrontendZine[], category: string) => {
    return zines.filter(zine => 
      zine.aiHint.toLowerCase().includes(category.toLowerCase())
    );
  };

  // Get categorized zines
  const featuredZines = getFeaturedZines(allZines);
  const trendingZines = getTrendingZines(allZines);
  const fictionZines = getZinesByCategory(allZines, 'fiction');
  const artZines = getZinesByCategory(allZines, 'art');
  const poetryZines = getZinesByCategory(allZines, 'poetry');
  const techZines = getZinesByCategory(allZines, 'tech');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
            Explore
          </h1>
        </section>
        
        {/* Loading State */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[2/3] rounded-t-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
            Explore
          </h1>
        </section>
        
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          {featuredZines.length > 0 && (
            <ExploreSection title="Featured" zines={featuredZines} />
          )}
          {trendingZines.length > 0 && (
            <ExploreSection title="Trending" zines={trendingZines} />
          )}
          {fictionZines.length > 0 && (
            <ExploreSection title="Fiction" zines={fictionZines.slice(0, 6)} />
          )}
          
          {/* Show message if no zines */}
          {allZines.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No zines available yet.</p>
              <Link href="/create">
                <Button>Create the first zine!</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="art">
          {artZines.length > 0 ? (
            <ExploreSection title="Art" zines={artZines} />
          ) : (
            <EmptyCategory category="Art" />
          )}
        </TabsContent>

        <TabsContent value="fiction">
          {fictionZines.length > 0 ? (
            <ExploreSection title="Fiction" zines={fictionZines} />
          ) : (
            <EmptyCategory category="Fiction" />
          )}
        </TabsContent>

        <TabsContent value="poetry">
          {poetryZines.length > 0 ? (
            <ExploreSection title="Poetry" zines={poetryZines} />
          ) : (
            <EmptyCategory category="Poetry" />
          )}
        </TabsContent>

        <TabsContent value="tech">
          {techZines.length > 0 ? (
            <ExploreSection title="Tech" zines={techZines} />
          ) : (
            <EmptyCategory category="Tech" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ExploreSection({ 
  title, 
  zines, 
  viewAllLink 
}: { 
  title: string; 
  zines: FrontendZine[]; 
  viewAllLink?: string; 
}) {
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
  );
}

function EmptyCategory({ category }: { category: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">No {category.toLowerCase()} zines found yet.</p>
      <p className="text-sm text-gray-500 mb-4">
        Create a zine with "{category}" in the AI hint to see it here!
      </p>
      <Link href="/create">
        <Button variant="outline">Create New Zine</Button>
      </Link>
    </div>
  );
}