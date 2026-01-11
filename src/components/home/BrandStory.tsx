import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BrandStory() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556306535-38febf6782e7?q=80&w=800&auto=format&fit=crop"
                alt="Artisan crafting leather bag"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-accent rounded-lg -z-10" />
          </div>

          <div className="lg:pl-8">
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
              Craftsmanship Meets{" "}
              <span className="italic">Modern Design</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
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

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <p className="font-display text-3xl font-medium text-accent">50+</p>
                <p className="text-sm text-muted-foreground">Artisan Partners</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium text-accent">5yr</p>
                <p className="text-sm text-muted-foreground">Warranty</p>
              </div>
              <div>
                <p className="font-display text-3xl font-medium text-accent">100%</p>
                <p className="text-sm text-muted-foreground">Genuine Leather</p>
              </div>
            </div>

            <Button asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}