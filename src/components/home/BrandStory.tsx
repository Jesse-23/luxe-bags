import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556306535-38febf6782e7?q=80&w=800&auto=format&fit=crop"
                alt="Artisan crafting leather bag"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative element - hidden on mobile */}
            <div className="absolute -bottom-6 -right-6 w-32 sm:w-48 h-32 sm:h-48 border-2 border-accent rounded-lg -z-10 hidden sm:block" />
          </div>

          <div className="lg:pl-8 order-1 lg:order-2">
            <p className="text-xs sm:text-sm font-medium tracking-widest text-accent uppercase mb-3 sm:mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6">
              Craftsmanship Meets{" "}
              <span className="italic">Modern Design</span>
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              <p>
                At LUXE BAGS, every stitch tells a story. Our master artisans
                combine centuries-old leather crafting techniques with
                contemporary aesthetics to create bags that transcend trends.
              </p>
              <p>
                We source only the finest materials—premium leather, quality
                hardware, and sustainable fabrics—ensuring each piece is as
                durable as it is beautiful.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-accent">50+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Artisan Partners</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-accent">5yr</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Warranty</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-accent">100%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Genuine Leather</p>
              </div>
            </div>

            <Button asChild className="w-full sm:w-auto">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}