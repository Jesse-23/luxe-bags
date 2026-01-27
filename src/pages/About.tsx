import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-3xl md:text-5xl font-semibold mb-6">
              About LUXE BAGS
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Crafting timeless elegance since 2020. Every bag tells a story of
              artisanal excellence and sophisticated design.
            </p>
          </div>

          {/* Story Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-2xl font-medium mb-4">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    LUXE BAGS was born from a simple belief: that exceptional
                    accessories should be accessible to everyone who appreciates
                    quality and design.
                  </p>
                  <p>
                    Founded by a team of passionate designers and artisans, we
                    set out to create bags that combine timeless elegance with
                    modern functionality—pieces that become more beautiful with
                    each use.
                  </p>
                  <p>
                    Today, we continue to honor traditional craftsmanship while
                    embracing sustainable practices, ensuring every bag we
                    create is built to last.
                  </p>
                </div>
              </div>
              <div className="aspect-square bg-secondary/50 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Brand Image</span>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-8 text-center">
              Our Values
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-display text-lg font-medium mb-2">
                  Quality First
                </h3>
                <p className="text-sm text-muted-foreground">
                  We source only the finest materials and work with skilled
                  artisans who take pride in their craft.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-display text-lg font-medium mb-2">
                  Sustainability
                </h3>
                <p className="text-sm text-muted-foreground">
                  From ethical sourcing to eco-friendly packaging, we're
                  committed to protecting our planet.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💫</span>
                </div>
                <h3 className="font-display text-lg font-medium mb-2">
                  Timeless Design
                </h3>
                <p className="text-sm text-muted-foreground">
                  We create pieces that transcend trends—bags you'll love today
                  and for years to come.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Founder & Creative Director",
                },
                {
                  name: "Michael Torres",
                  role: "Head of Design",
                },
                {
                  name: "Emma Williams",
                  role: "Head of Sustainability",
                },
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Photo</span>
                  </div>
                  <h3 className="font-display font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 bg-secondary/30 rounded-lg">
            <h2 className="font-display text-2xl font-medium mb-4">
              Join Our Journey
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Discover our collection and find your perfect companion.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
