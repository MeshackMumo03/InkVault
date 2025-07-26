import { zines } from "@/app/data";
import CommentSection from "@/components/zine/CommentSection";
import ZineViewer from "@/components/zine/ZineViewer";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Send } from "lucide-react";
import { notFound } from "next/navigation";

export default function ZinePage({ params }: { params: { id: string } }) {
  const zine = zines.find(z => z.id === params.id);

  if (!zine) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-primary">{zine.title}</h1>
        <p className="text-lg text-muted-foreground">by {zine.author}</p>
        <p className="mt-4 text-lg">{zine.description}</p>
        <div className="flex items-center space-x-6 mt-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>23</span>
            </div>
            <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>5</span>
            </div>
            <div className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>12</span>
            </div>
        </div>
      </div>
      
      <ZineViewer />

      <div className="mt-12">
        <CommentSection zineId={zine.id} />
      </div>
    </div>
  )
}
