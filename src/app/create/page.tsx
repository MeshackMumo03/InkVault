
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-8 text-primary">
            Create New Post
          </h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your post"
                className="text-2xl h-14"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-lg">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content here..."
                rows={15}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save Draft</Button>
              <Button>Publish</Button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold font-headline mb-4">Preview</h2>
          <Card>
            <CardContent className="p-4">
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                 <Image
                    src="https://placehold.co/600x400"
                    alt="Preview"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint="abstract art"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
