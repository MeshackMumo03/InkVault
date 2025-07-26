import { zines } from "@/app/data";
import CommentSection from "@/components/zine/CommentSection";
import ZineViewer from "@/components/zine/ZineViewer";
import { Button } from "@/components/ui/button";
import { Bookmark, Download, Share2 } from "lucide-react";
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
        <p className="text-xl text-muted-foreground">by {zine.author}</p>
        <p className="mt-4 text-lg">{zine.description}</p>
        <div className="flex items-center space-x-2 mt-6">
            <Button variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
            </Button>
            <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
            <Button>
                <Download className="mr-2 h-4 w-4" />
                Export to PDF
            </Button>
        </div>
      </div>
      
      <ZineViewer />

      <div className="mt-12">
        <CommentSection zineId={zine.id} />
      </div>
    </div>
  )
}
