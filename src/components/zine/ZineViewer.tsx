import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ZineViewer() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardContent className="p-4 sm:p-8 md:p-12">
            <div className="bg-white text-black p-8 aspect-[8.5/11] w-full">
                <div className="grid grid-cols-2 gap-8 h-full">
                    {/* Page 1 */}
                    <div className="flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold font-headline text-zinc-900">Concrete Jungles</h1>
                        <Image src="https://placehold.co/400x300" data-ai-hint="city architecture" alt="Brutalist building" width={400} height={300} className="w-full" />
                        <p className="text-sm text-zinc-700">
                           An exploration of brutalist architecture in modern cities. The stark lines, the raw concrete, the imposing forms. This zine delves into the philosophy and aesthetics of a movement that is both reviled and revered.
                        </p>
                         <p className="text-sm text-zinc-700">
                           We travel from London's South Bank to the housing estates of Paris, finding beauty in the monolithic structures that define our urban landscapes.
                        </p>
                    </div>

                    {/* Page 2 */}
                    <div className="flex flex-col space-y-4">
                        <p className="text-sm text-zinc-700">
                            The term 'Brutalism' originates from the French 'béton brut', meaning 'raw concrete', a phrase used by Le Corbusier. It is characterized by its massive, unadorned, and often blocky appearance.
                        </p>
                        <Image src="https://placehold.co/400x500" data-ai-hint="building detail" alt="Architectural detail" width={400} height={500} className="w-full" />
                         <p className="text-sm text-zinc-700 font-bold text-right">- Alex Urban</p>
                    </div>
                </div>
                 <Separator className="my-4 bg-zinc-200" />
                 <div className="text-center text-xs text-zinc-500">
                    InkVault Digital Zine - Page 1
                 </div>
            </div>
        </CardContent>
    </Card>
  )
}
