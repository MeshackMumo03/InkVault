"use client";

import { useState } from 'react';
import { suggestLayout } from '@/lib/actions';
import type { SuggestLayoutOutput } from '@/ai/flows/suggest-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, ArrowRight, Image as ImageIcon, Type as TypeIcon } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type ComponentType = 'Header' | 'Text' | 'Image';
interface LayoutComponent {
  id: string;
  type: ComponentType;
  content: string;
}

function SortableItem({ id, type, content }: { id: string, type: ComponentType, content: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = type === 'Header' ? TypeIcon : type === 'Image' ? ImageIcon : TypeIcon;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-card border rounded-lg flex items-center gap-4 touch-none">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div className="flex-grow">
        <p className="font-medium">{type}</p>
        <p className="text-sm text-muted-foreground truncate">{content}</p>
      </div>
    </div>
  );
}


export default function AILayoutClient() {
  const [textContent, setTextContent] = useState('');
  const [imageCaptions, setImageCaptions] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestLayoutOutput | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<LayoutComponent[]>([]);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleAddCaption = () => {
    if (imageCaptions.length < 5) {
      setImageCaptions([...imageCaptions, '']);
    }
  };

  const handleCaptionChange = (index: number, value: string) => {
    const newCaptions = [...imageCaptions];
    newCaptions[index] = value;
    setImageCaptions(newCaptions);
  };
  
  const handleSuggestLayout = async () => {
    if (!textContent.trim()) {
      toast({
        title: 'Content needed',
        description: 'Please add some text content to get layout suggestions.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setSuggestions(null);

    const nonEmptyCaptions = imageCaptions.map(c => c.trim()).filter(Boolean);
    const result = await suggestLayout({ textContent, imageCaptions: nonEmptyCaptions });
    
    if (result.success && result.data) {
      setSuggestions(result.data);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to get suggestions.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const handleSelectSuggestion = (suggestion: SuggestLayoutOutput['layoutSuggestions'][0]) => {
    const layoutItems: LayoutComponent[] = suggestion.componentList.map((comp, index) => ({
      id: `${suggestion.name.replace(/\s+/g, '-')}-${index}`,
      type: comp.includes('image') ? 'Image' : comp.includes('header') ? 'Header' : 'Text',
      content: comp,
    }));
    setSelectedLayout(layoutItems);
  };

  const handleDragEnd = (event: any) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setSelectedLayout((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="h-fit sticky top-24">
        <CardHeader>
          <CardTitle>1. Add Your Content</CardTitle>
          <CardDescription>Provide the text and image ideas for your zine.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text-content">Text Content</Label>
            <Textarea
              id="text-content"
              placeholder="Paste or write your zine's main text here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={10}
            />
          </div>
          <div className="space-y-2">
            <Label>Image Captions (optional)</Label>
            <div className="space-y-2">
              {imageCaptions.map((caption, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder={`Caption for image ${index + 1}...`}
                  value={caption}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                />
              ))}
            </div>
            {imageCaptions.length < 5 && (
              <Button variant="outline" size="sm" onClick={handleAddCaption}>
                Add another caption
              </Button>
            )}
          </div>
          <Button onClick={handleSuggestLayout} disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Suggest Layouts
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>2. Get AI Suggestions</CardTitle>
                <CardDescription>Our AI will suggest layouts based on your content.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {suggestions ? (
                <div className="space-y-4">
                  {suggestions.layoutSuggestions.map((suggestion) => (
                    <Card key={suggestion.name} className="bg-background">
                      <CardHeader>
                        <CardTitle className="text-lg">{suggestion.name}</CardTitle>
                        <CardDescription>{suggestion.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {suggestion.componentList.map((comp, i) => (
                            <li key={i}>{comp}</li>
                          ))}
                        </ul>
                        <Button className="w-full mt-4" onClick={() => handleSelectSuggestion(suggestion)}>
                          Use this Layout <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                ) : (
                    !isLoading && <p className="text-center text-muted-foreground py-8">Your layout suggestions will appear here.</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>3. Design Your Zine</CardTitle>
                <CardDescription>Drag and drop to arrange your zine's layout.</CardDescription>
            </CardHeader>
            <CardContent>
                {selectedLayout.length > 0 ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={selectedLayout} strategy={verticalListSortingStrategy}>
                       <div className="space-y-2">
                        {selectedLayout.map(item => <SortableItem key={item.id} id={item.id} type={item.type} content={item.content} />)}
                      </div>
                    </SortableContext>
                  </DndContext>
                ) : (
                    <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg">
                        <p>Select a layout suggestion to start designing.</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
