import ZineCard from '@/components/zine/ZineCard';
import { zines } from './data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
          Welcome to InkVault
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Your digital canvas for creating, sharing, and discovering unique zines.
        </p>
        <Button asChild size="lg" className="mt-6">
            <Link href="/create">Create Your Zine</Link>
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center md:text-left">Featured Zines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {zines.map((zine) => (
            <ZineCard key={zine.id} zine={zine} />
          ))}
        </div>
      </section>
    </div>
  );
}
