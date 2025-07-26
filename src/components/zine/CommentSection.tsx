import { comments } from "@/app/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function CommentSection({ zineId }: { zineId: string }) {
  const zineComments = comments.filter(c => c.zineId === zineId);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="https://placehold.co/40x40" data-ai-hint="person smiling" alt="Your avatar" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="w-full space-y-2">
                <Textarea placeholder="Add a comment..." />
                <Button>
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-6">
            {zineComments.length > 0 ? (
                zineComments.map((comment, index) => (
                    <div key={comment.id}>
                        <div className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="person portrait" />
                                <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{comment.author}</p>
                                <p className="text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                        {index < zineComments.length - 1 && <Separator className="mt-6" />}
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground py-4">Be the first to comment!</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
