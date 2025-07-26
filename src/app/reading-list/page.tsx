import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { readingLists, zines } from "./data";
import { ListPlus } from "lucide-react";

export default function ReadingListPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Reading Lists
        </h1>
        <Button>
          <ListPlus className="mr-2 h-4 w-4" />
          New List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {readingLists.map((list) => (
                  <li key={list.name}>
                    <button className="text-left w-full p-2 rounded-md hover:bg-muted transition-colors">
                      <p className="font-semibold">{list.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {list.publicationCount} publications
                      </p>
                      <p className="text-sm text-muted-foreground">{list.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
            {zines.slice(0, 5).map((zine, index) => (
                 <Card key={zine.id} className="overflow-hidden">
                    <div className="flex items-center">
                        <div className="w-1/4">
                            <Image
                                src={zine.coverImage}
                                alt={`Cover of ${zine.title}`}
                                width={150}
                                height={225}
                                className="object-cover w-full h-auto"
                                data-ai-hint={zine.aiHint}
                            />
                        </div>
                        <div className="w-3/4 p-4">
                            <h3 className="text-lg font-bold font-headline">{zine.title}</h3>
                            <p className="text-sm text-muted-foreground">by {zine.author}</p>
                            <p className="text-sm mt-2">{zine.description}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
