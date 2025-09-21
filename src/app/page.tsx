
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Star, Trophy, Users, BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  {
    icon: Users,
    title: 'Form Alliances',
    description: 'Team up with friends, create powerful alliances, and compete together in exclusive alliance-based events.',
  },
  {
    icon: Trophy,
    title: 'Climb the Leaderboards',
    description: 'Track your progress and compete for the top spot on global and alliance leaderboards.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Powered Recommendations',
    description: 'Get personalized problem recommendations from our AI Mentor to sharpen your skills.',
  },
  {
    icon: Star,
    title: 'Earn Achievements',
    description: 'Showcase your skills by earning badges and achievements for your accomplishments.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CodeClash Arena</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#features" className="transition-colors hover:text-primary">Features</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 lg:py-40 bg-gradient-to-b from-background to-primary/10">
          <div className="container mx-auto text-center px-4 md:px-6 animate-fade-in-up">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unleash Your Competitive Spirit
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Join a global community of coders. Form alliances, track your stats, climb the leaderboards, and become a coding champion.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center animate-fade-in-up [animation-delay:200ms]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Ultimate Arena for Coders</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Everything you need to level up your coding skills, all in one place.
                </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <div key={feature.title} className="flex flex-col items-center text-center animate-fade-in-up" style={{animationDelay: `${300 + i * 100}ms`}}>
                  <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

         {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/10">
          <div className="container mx-auto text-center px-4 md:px-6 animate-fade-in-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Join the Arena?
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-lg">
              Sign up today and start your journey to the top of the leaderboards. Your alliance is waiting.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
            <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-md font-semibold">CodeClash Arena</span>
            </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeClash Arena. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
