'use client';

import { useState, useEffect } from 'react';
import ZineCard from '../components/zine/ZineCard';
import { zineService } from '../services/zineService';
import { mapBackendZinesToFrontend } from '../utils/zineMappers';
import type { FrontendZine } from '../utils/zineMappers';

export default function Home() {
  const [zines, setZines] = useState<FrontendZine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZines = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const backendZines = await zineService.getAllZines();
        const frontendZines = mapBackendZinesToFrontend(backendZines);
        setZines(frontendZines);
        
      } catch (err) {
        console.error('Error fetching zines:', err);
        setError('Failed to load zines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchZines();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            My Publications
          </h1>
          <button className="hidden md:flex px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Create New
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[2/3] rounded-t-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {!loading && !error && (
          <>
            {zines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                {zines.map((zine) => (
                  <ZineCard key={zine.id} zine={zine} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No zines found. Create your first zine!</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Create New Zine
                </button>
              </div>
            )}
          </>
        )}

        <button className="mt-8 w-full md:hidden px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create New
        </button>
      </section>
    </div>
  );
}