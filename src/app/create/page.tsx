"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, MoveUp, MoveDown } from "lucide-react";
import { zineService } from "@/services/zineService";
import type { CreateZineRequest, CreateZineContentRequest } from "@/services/zineService";

interface ContentSection {
  id: string;
  contentType: 'heading' | 'subtopic' | 'paragraph' | 'image';
  text: string;
  imageUrl: string;
  alt: string;
  caption: string;
}

export default function CreateZinePage() {
  const router = useRouter();
  
  // Zine metadata state
  const [zineTitle, setZineTitle] = useState("");
  const [zineAuthor, setZineAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [aiHint, setAiHint] = useState("");
  const [zineDescription, setZineDescription] = useState("");
  
  // Content sections state
  const [sections, setSections] = useState<ContentSection[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add a new section
  const addSection = (contentType: ContentSection['contentType']) => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      contentType,
      text: "",
      imageUrl: "",
      alt: "",
      caption: ""
    };
    setSections([...sections, newSection]);
  };
  
  // Update a section
  const updateSection = (id: string, field: keyof ContentSection, value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };
  
  // Remove a section
  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };
  
  // Move section up/down
  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(section => section.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    
    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
  };
  
  // Validate form
  const validateForm = () => {
    if (!zineTitle.trim()) return "Title is required";
    if (!zineAuthor.trim()) return "Author is required";
    if (!coverImage.trim()) return "Cover image URL is required";
    if (!aiHint.trim()) return "AI hint is required";
    if (!zineDescription.trim()) return "Description is required";
    
    for (const section of sections) {
      if (section.contentType === 'heading' || section.contentType === 'subtopic' || section.contentType === 'paragraph') {
        if (!section.text.trim()) {
          return `${section.contentType} text is required`;
        }
      }
      if (section.contentType === 'image') {
        if (!section.imageUrl.trim()) return "Image URL is required";
        if (!section.caption.trim()) return "Image caption is required";
      }
    }
    
    return null;
  };
  
  // Submit form
  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, create the zine
      const zineData: CreateZineRequest = {
        zineId: null,
        zineTitle,
        zineAuthor,
        coverImage,
        aiHint,
        zineDescription
      };
      
      const createdZine = await zineService.createZine(zineData);
      
      // Then, create all content sections
      for (const section of sections) {
        const contentData: CreateZineContentRequest = {
          zineContentId: null,
          contentType: section.contentType,
          text: section.text,
          imageUrl: section.imageUrl,
          alt: section.alt,
          caption: section.caption
        };
        
        await zineService.createZineContent(createdZine.zineId, contentData);
      }
      
      // Redirect to the new zine
      router.push(`/zine/${createdZine.zineId}`);
      
    } catch (error) {
      console.error('Error creating zine:', error);
      alert('Failed to create zine. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-8 text-primary">
          Create New Zine
        </h1>
        
        {/* Zine Metadata */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zine Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={zineTitle}
                  onChange={(e) => setZineTitle(e.target.value)}
                  placeholder="Enter zine title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={zineAuthor}
                  onChange={(e) => setZineAuthor(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/cover-image.jpg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="aiHint">AI Hint *</Label>
                <Input
                  id="aiHint"
                  value={aiHint}
                  onChange={(e) => setAiHint(e.target.value)}
                  placeholder="e.g., Automotives, Music, Art"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={zineDescription}
                onChange={(e) => setZineDescription(e.target.value)}
                placeholder="Brief description of your zine"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Content Sections */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content Sections</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection('heading')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Heading
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection('subtopic')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Subtopic
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection('paragraph')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Paragraph
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSection('image')}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Image
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {sections.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No content sections yet. Add some sections above to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <Card key={section.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-blue-600 uppercase">
                          {section.contentType}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSection(section.id, 'up')}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => moveSection(section.id, 'down')}
                            disabled={index === sections.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {(section.contentType === 'heading' || section.contentType === 'subtopic' || section.contentType === 'paragraph') && (
                        <div className="space-y-2">
                          <Label>Text *</Label>
                          {section.contentType === 'paragraph' ? (
                            <Textarea
                              value={section.text}
                              onChange={(e) => updateSection(section.id, 'text', e.target.value)}
                              placeholder={`Enter ${section.contentType} text`}
                              rows={section.contentType === 'paragraph' ? 4 : 2}
                            />
                          ) : (
                            <Input
                              value={section.text}
                              onChange={(e) => updateSection(section.id, 'text', e.target.value)}
                              placeholder={`Enter ${section.contentType} text`}
                            />
                          )}
                        </div>
                      )}
                      
                      {section.contentType === 'image' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Image URL *</Label>
                            <Input
                              value={section.imageUrl}
                              onChange={(e) => updateSection(section.id, 'imageUrl', e.target.value)}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Alt Text</Label>
                              <Input
                                value={section.alt}
                                onChange={(e) => updateSection(section.id, 'alt', e.target.value)}
                                placeholder="Image description"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Caption *</Label>
                              <Input
                                value={section.caption}
                                onChange={(e) => updateSection(section.id, 'caption', e.target.value)}
                                placeholder="Image caption"
                              />
                            </div>
                          </div>
                          
                          {section.imageUrl && (
                            <div className="mt-4">
                              <img
                                src={section.imageUrl}
                                alt="Preview"
                                className="max-w-xs h-32 object-cover rounded border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Zine"}
          </Button>
        </div>
      </div>
    </div>
  );
}