import { Layout } from "@/components/layout/Layout";
import { ExternalLink } from "lucide-react";

const pressFeatures = [
  {
    publication: "Vogue",
    title: "10 Emerging Accessory Brands to Watch",
    excerpt:
      "LUXE BAGS stands out for its commitment to sustainable luxury, crafting timeless pieces that rival heritage brands at a fraction of the price.",
    date: "December 2025",
  },
  {
    publication: "Elle",
    title: "The New Wave of Conscious Luxury",
    excerpt:
      "With ethically-sourced materials and artisanal craftsmanship, LUXE BAGS is redefining what it means to invest in quality accessories.",
    date: "November 2025",
  },
  {
    publication: "Forbes",
    title: "How LUXE BAGS Built a Cult Following",
    excerpt:
      "From direct-to-consumer startup to coveted brand, the story of how LUXE BAGS captured the hearts of style-conscious consumers.",
    date: "October 2025",
  },
  {
    publication: "Refinery29",
    title: "The Perfect Work Bag Actually Exists",
    excerpt:
      "We tested dozens of work bags and the LUXE BAGS Tote came out on top for style, functionality, and durability.",
    date: "September 2025",
  },
  {
    publication: "Harper's Bazaar",
    title: "Editors' Picks: Best Bags of the Year",
    excerpt:
      "The LUXE BAGS crossbody earned a spot on our list for its impeccable design and versatility.",
    date: "August 2025",
  },
];

const Press = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Press
          </h1>
          <p className="text-muted-foreground mb-12">
            LUXE BAGS in the news. Read what publications are saying about us.
          </p>

          {/* Press Features */}
          <div className="space-y-8 mb-16">
            {pressFeatures.map((feature, index) => (
              <article
                key={index}
                className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <span className="text-sm font-medium text-primary">
                    {feature.publication}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {feature.date}
                  </span>
                </div>
                <h2 className="font-display text-xl font-medium mb-2">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground mb-4">{feature.excerpt}</p>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  Read Article <ExternalLink className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          {/* Press Kit */}
          <section className="p-8 bg-secondary/30 rounded-lg">
            <h2 className="font-display text-2xl font-medium mb-4">
              Press Kit
            </h2>
            <p className="text-muted-foreground mb-6">
              For media inquiries, high-resolution images, and brand assets,
              please contact our press team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:press@luxebags.com"
                className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Press Team
              </a>
              <button className="inline-flex items-center justify-center h-10 px-6 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                Download Press Kit
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Press;
