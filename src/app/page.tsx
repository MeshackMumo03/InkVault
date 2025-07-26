
import ZineCard from '@/components/zine/ZineCard';
import { zines } from './data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                My Publications
            </h1>
            <Button asChild className="hidden md:flex">
                <Link href="/create">Create New</Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {zines.map((zine) => (
            <ZineCard key={zine.id} zine={zine} />
          ))}
        </div>
         <Button asChild size="lg" className="mt-8 w-full md:hidden">
            <Link href="/create">Create New</Link>
        </Button>
      </section>
    </div>
  );
}
