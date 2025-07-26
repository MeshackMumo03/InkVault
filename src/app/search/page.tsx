import { Input } from "@/components/ui/input";
import { Search, X, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { recentSearches, trendingSearches } from "./data";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for publications, users, or topics"
          className="pl-12 pr-12 h-14 text-lg rounded-full shadow-sm"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
        >
          <X className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Clear search</span>
        </Button>
      </div>

      <Tabs defaultValue="publications" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
        </TabsList>
        <TabsContent value="publications">
          {/* Content for publications search results will go here */}
        </TabsContent>
        <TabsContent value="users">
          {/* Content for users search results will go here */}
        </TabsContent>
        <TabsContent value="topics">
          {/* Content for topics search results will go here */}
        </TabsContent>
      </Tabs>

      <div className="space-y-8 mt-8">
        <div>
          <h2 className="text-xl font-bold font-headline mb-4">
            Recent searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <Badge key={search} variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted">
                {search}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold font-headline mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Trending searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search) => (
              <Badge key={search} variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-muted">
                {search}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
