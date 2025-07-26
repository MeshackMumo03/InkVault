import AILayoutClient from "@/components/create/AILayoutClient";

export default function CreateZinePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-primary">
                Create Your Zine
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80">
                Follow the steps below to bring your zine to life. Add your content, get AI-powered layout ideas, and then arrange your masterpiece.
            </p>
        </section>
        <AILayoutClient />
    </div>
  )
}
