"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookMarked, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

const onboardingSteps = [
  {
    title: 'Welcome to InkVault!',
    description: 'Share your thoughts, stories, and ideas with the world. Create your first publication and start writing.',
    image: 'https://placehold.co/600x400',
    aiHint: 'drawing notebook'
  },
  {
    title: 'Design Your Zine',
    description: 'Use our AI-powered layout assistant to arrange your content, or drag and drop elements to create a unique design.',
    image: 'https://placehold.co/600x400',
    aiHint: 'graphic design tools'
  },
  {
    title: 'Share and Discover',
    description: 'Publish your zine to the world, explore creations from others, and connect with a community of creators.',
    image: 'https://placehold.co/600x400',
    aiHint: 'community people'
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
            <BookMarked className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">
              InkVault
            </span>
        </Link>
        <Button variant="ghost" onClick={handleSkip}>Skip</Button>
      </header>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full">
            <div className="mb-8">
                <Image 
                    src={step.image} 
                    alt={step.title} 
                    width={600} 
                    height={400} 
                    className="rounded-lg object-cover w-full aspect-video"
                    data-ai-hint={step.aiHint}
                />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-2 text-primary">
                {step.title}
            </h2>
            <p className="text-muted-foreground mb-8">
                {step.description}
            </p>
            
            <div className="space-y-4">
                <Progress value={progress} className="w-full h-2" />
                <div className="flex items-center justify-between gap-4">
                   <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <Button onClick={handleNext} className="w-full">
                        {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}