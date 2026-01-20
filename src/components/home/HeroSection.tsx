import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1920&auto=format&fit=crop')`,
        }}
      />

      <div className="container relative z-20 px-4 sm:px-6">
        <div className="max-w-2xl animate-fade-in">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-accent uppercase mb-3 sm:mb-4">
            New Collection 2025
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-4 sm:mb-6">
            Timeless Elegance,{" "}
            <span className="italic">Crafted for You</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg">
            Discover our curated collection of handcrafted bags, where luxury
            meets functionality. Each piece tells a story of artisanal excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link to="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}