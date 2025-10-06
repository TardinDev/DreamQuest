import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">DreamQuest</h1>
        <p className="text-xl text-muted-foreground">
          Transform your dreams into playable 3D worlds
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/dreamquest">
            <Button size="lg">Start Dreaming</Button>
          </Link>
          <Link href="/dreamquest/gallery">
            <Button size="lg" variant="outline">
              Explore Gallery
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
