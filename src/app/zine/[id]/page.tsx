// src/app/zine/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zineService } from '@/services/zineService';
import { mapBackendZineContentsToFrontend } from '@/utils/zineMappers';
import type { FrontendZine, FrontendZineContent } from '@/utils/zineMappers';

export default function ZinePage() {
  const params = useParams();
  const router = useRouter();
  const zineId = parseInt(params.id as string);

  const [zine, setZine] = useState<FrontendZine | null>(null);
  const [contents, setContents] = useState<FrontendZineContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchZineData = async () => {
      if (isNaN(zineId)) {
        setError('Invalid zine ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch zine contents (which includes zine metadata)
        const backendContents = await zineService.getZineContents(zineId);
        const frontendContents = mapBackendZineContentsToFrontend(backendContents);
        
        // Extract zine metadata from the first content item
        if (backendContents.length > 0 && backendContents[0].zine) {
          const backendZine = backendContents[0].zine;
          const frontendZine: FrontendZine = {
            id: backendZine.zineId.toString(),
            title: backendZine.zineTitle,
            author: backendZine.zineAuthor,
            coverImage: backendZine.coverImage,
            aiHint: backendZine.aiHint,
            description: backendZine.zineDescription,
          };
          setZine(frontendZine);
        }
        
        setContents(frontendContents);
      } catch (err) {
        console.error('Error fetching zine:', err);
        setError('Failed to load zine. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchZineData();
  }, [zineId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading zine...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!zine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Zine not found</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Zines
          </button>
        </div>
      </div>

      {/* Zine Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Zine Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src={zine.coverImage}
              alt={`Cover of ${zine.title}`}
              className="w-48 h-64 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{zine.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {zine.author}</p>
              <p className="text-gray-700 mb-4">{zine.description}</p>
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {zine.aiHint}
              </div>
            </div>
          </div>
        </div>

        {/* Zine Contents - Magazine Column Layout */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {contents.length > 0 ? (
            <div className="p-8 md:p-12 max-w-6xl mx-auto">
              {/* Group content by sections */}
              {(() => {
                // Define types for sections
                type HeadingSection = {
                  type: 'heading';
                  content: FrontendZineContent;
                  index: number;
                };

                type SubtopicSection = {
                  type: 'subtopic';
                  subtopic: FrontendZineContent;
                  children: FrontendZineContent[];
                  side: 'left' | 'right';
                  index: number;
                };

                type StandaloneSection = {
                  type: 'standalone';
                  content: FrontendZineContent;
                  index: number;
                };

                type Section = HeadingSection | SubtopicSection | StandaloneSection;

                const sections: Section[] = [];
                let currentSection: SubtopicSection | null = null;
                let subtopicIndex = 0;

                contents.forEach((content, index) => {
                  if (content.contentType === 'heading') {
                    // Headings are full-width and start new sections
                    sections.push({
                      type: 'heading',
                      content: content,
                      index: index
                    });
                  } else if (content.contentType === 'subtopic') {
                    // Start a new subtopic section
                    currentSection = {
                      type: 'subtopic',
                      subtopic: content,
                      children: [],
                      side: subtopicIndex % 2 === 0 ? 'left' : 'right',
                      index: index
                    };
                    sections.push(currentSection);
                    subtopicIndex++;
                  } else if (currentSection && (content.contentType === 'paragraph' || content.contentType === 'image')) {
                    // Add to current subtopic section
                    currentSection.children.push(content);
                  } else {
                    // Standalone content (shouldn't happen in your structure, but fallback)
                    sections.push({
                      type: 'standalone',
                      content: content,
                      index: index
                    });
                  }
                });

                return sections.map((section, sectionIndex) => {
                  if (section.type === 'heading') {
                    const content = section.content;
                    return (
                      <div key={`heading-${section.index}`} className="mb-12 text-center">
                        {sectionIndex === 0 ? (
                          // First heading is the main title
                          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            {content.text}
                          </h1>
                        ) : (
                          // Subsequent headings are section titles
                          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 inline-block">
                            {content.text}
                          </h2>
                        )}
                      </div>
                    );
                  }

                  if (section.type === 'subtopic') {
                    const alignmentClass = section.side === 'left' ? 'text-left' : 'text-right';
                    const containerClass = section.side === 'left' ? 'mr-auto' : 'ml-auto';

                    return (
                      <div key={`subtopic-${section.index}`} className="mb-16">
                        <div className={`max-w-2xl ${containerClass}`}>
                          {/* Subtopic heading */}
                          <h3 className={`text-lg md:text-xl font-medium text-gray-600 uppercase tracking-wide mb-6 ${alignmentClass}`}>
                            {section.subtopic.text}
                          </h3>
                          
                          {/* Content under this subtopic */}
                          <div className="space-y-6">
                            {section.children.map((childContent: FrontendZineContent, childIndex: number) => {
                              if (childContent.contentType === 'paragraph' && childContent.text) {
                                return (
                                  <p key={`para-${childContent.id}`} className={`text-base md:text-lg leading-relaxed text-gray-800 ${alignmentClass}`}>
                                    {childContent.text}
                                  </p>
                                );
                              }
                              
                              if (childContent.contentType === 'image' && childContent.imageUrl) {
                                return (
                                  <div key={`img-${childContent.id}`} className={alignmentClass}>
                                    <img
                                      src={childContent.imageUrl}
                                      alt={childContent.alt || 'Zine content'}
                                      className="w-full max-w-md rounded-lg shadow-lg"
                                    />
                                    {childContent.caption && (
                                      <p className={`mt-3 text-sm text-gray-600 italic font-medium ${alignmentClass}`}>
                                        {childContent.caption}
                                      </p>
                                    )}
                                  </div>
                                );
                              }
                              
                              return null;
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                });
              })()}
              
              {/* Author attribution at the bottom */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-right text-lg font-medium text-gray-700">
                  - {zine.author}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 mb-4">This zine doesn't have any content yet.</p>
              <p className="text-sm text-gray-500">Content will appear here once it's added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}