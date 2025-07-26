import Image from "next/image";
import { userProfile } from "../data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ZineCard from "@/components/zine/ZineCard";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="mb-8">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
           <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint={userProfile.aiHint} />
              <AvatarFallback>{userProfile.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold font-headline">{userProfile.name}</h1>
              <p className="text-muted-foreground mt-1">{userProfile.bio}</p>
            </div>
            <Button variant="outline" className="md:ml-auto">
              <Pencil className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="my-zines">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="my-zines">My Zines</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>
        <TabsContent value="my-zines" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {userProfile.myZines.map(zine => (
                    <ZineCard key={zine.id} zine={zine} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="bookmarks" className="mt-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {userProfile.bookmarkedZines.map(zine => (
                    <ZineCard key={zine.id} zine={zine} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
