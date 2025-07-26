
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Settings</h1>
      </header>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Display</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                 <RadioGroup defaultValue="system" className="flex space-x-4">
                  <Button variant="outline" className="flex-1">Light</Button>
                  <Button variant="outline" className="flex-1">Dark</Button>
                  <Button variant="outline" className="flex-1">System</Button>
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label>Font Size</Label>
                <RadioGroup defaultValue="medium" className="flex space-x-4">
                  <Button variant="outline" className="flex-1">Small</Button>
                  <Button variant="outline" className="flex-1">Medium</Button>
                  <Button variant="outline" className="flex-1">Large</Button>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter new password" />
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />
        
        <section>
             <Card className="border-destructive">
                <CardHeader>
                    <CardTitle className="text-destructive">Delete Account</CardTitle>
                    <CardDescription>
                        Permanently delete your account and all of your content. This action is not reversible.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <Button variant="destructive">Delete Account</Button>
                </CardContent>
            </Card>
        </section>
      </div>
    </div>
  )
}
