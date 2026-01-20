import { Link } from "react-router-dom";

const categories = [
  {
    name: "Totes",
    slug: "tote",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    description: "Spacious & Versatile",
  },
  {
    name: "Crossbody",
    slug: "crossbody",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
    description: "Hands-Free Elegance",
  },
  {
    name: "Clutches",
    slug: "clutch",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=800&auto=format&fit=crop",
    description: "Evening Essentials",
  },
  {
    name: "Backpacks",
    slug: "backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    description: "Modern Functionality",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-medium tracking-widest text-accent uppercase mb-2">
            Shop by Style
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium">
            Explore Our Categories
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 text-primary-foreground">
                <p className="text-xs sm:text-sm opacity-80 mb-0.5 sm:mb-1 hidden sm:block">{category.description}</p>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}