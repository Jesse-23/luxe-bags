import { Layout } from "@/components/layout/Layout";
import { Leaf, Recycle, Heart, Globe } from "lucide-react";

const initiatives = [
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "We source only the highest quality materials from certified sustainable suppliers. Our leathers come from tanneries that meet strict environmental standards, and we're expanding our line of vegan alternatives made from innovative plant-based materials.",
  },
  {
    icon: Recycle,
    title: "Circular Design",
    description:
      "Every bag is designed with longevity in mind. We offer free repairs for life, a take-back program for worn bags, and we're working towards fully recyclable materials by 2027.",
  },
  {
    icon: Heart,
    title: "Ethical Production",
    description:
      "Our artisans work in safe, fair-wage facilities. We visit our workshops regularly and maintain long-term partnerships built on mutual respect and shared values.",
  },
  {
    icon: Globe,
    title: "Carbon Commitment",
    description:
      "We've achieved carbon-neutral shipping and are working towards net-zero operations by 2030. Every order plants a tree through our partnership with reforestation organizations.",
  },
];

const stats = [
  { value: "100%", label: "Sustainable Packaging" },
  { value: "80%", label: "Recycled Materials in Packaging" },
  { value: "50K+", label: "Trees Planted" },
  { value: "Zero", label: "Single-Use Plastics" },
];

const Sustainability = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-3xl md:text-5xl font-semibold mb-6">
              Sustainability
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Luxury with a conscience. We believe beautiful products and
              sustainable practices can—and must—go hand in hand.
            </p>
          </div>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 border border-border rounded-lg"
              >
                <p className="font-display text-2xl md:text-3xl font-semibold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </section>

          {/* Our Commitment */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-4">
              Our Commitment
            </h2>
            <p className="text-muted-foreground mb-8">
              Sustainability isn't a marketing buzzword for us—it's woven into
              every decision we make. From the materials we choose to the
              partners we work with, we're committed to minimizing our impact
              while maximizing the quality and longevity of our products.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {initiatives.map((initiative) => (
                <div key={initiative.title} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <initiative.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-medium mb-2">
                      {initiative.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Goals */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-8">
              Our 2030 Goals
            </h2>
            <div className="space-y-4">
              {[
                {
                  goal: "Net-zero carbon emissions",
                  progress: 60,
                },
                {
                  goal: "100% sustainable materials",
                  progress: 75,
                },
                {
                  goal: "Fully circular product lifecycle",
                  progress: 40,
                },
                {
                  goal: "Zero waste in production",
                  progress: 55,
                },
              ].map((item) => (
                <div key={item.goal}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 bg-secondary/30 rounded-lg">
            <h2 className="font-display text-2xl font-medium mb-4">
              Shop Sustainably
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Every LUXE BAGS purchase supports our mission for a more
              sustainable fashion industry.
            </p>
            <a
              href="/products"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Explore Collection
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Sustainability;
