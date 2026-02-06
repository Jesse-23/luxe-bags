import { Layout } from "@/components/layout/Layout";
import { MapPin, Clock, Briefcase } from "lucide-react";

const openPositions = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Lead the design of our next collection, from concept sketches to final production samples.",
  },
  {
    title: "E-commerce Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Drive our online sales strategy, optimize conversion rates, and enhance the customer journey.",
  },
  {
    title: "Customer Experience Lead",
    department: "Operations",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Build and lead our customer service team to deliver exceptional experiences at every touchpoint.",
  },
  {
    title: "Social Media Coordinator",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Create engaging content and grow our community across Instagram, TikTok, and Pinterest.",
  },
  {
    title: "Production Assistant",
    department: "Operations",
    location: "New York, NY",
    type: "Part-time",
    description:
      "Support our production team with quality control, inventory management, and vendor communication.",
  },
];

const benefits = [
  {
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    title: "Flexible Work",
    description:
      "Remote-friendly policies and flexible hours to support work-life balance.",
  },
  {
    title: "Product Perks",
    description:
      "Generous employee discount and complimentary bags from each new collection.",
  },
  {
    title: "Growth & Learning",
    description:
      "Annual learning stipend and opportunities for professional development.",
  },
  {
    title: "Paid Time Off",
    description:
      "Generous PTO policy plus company holidays and summer Fridays.",
  },
  {
    title: "Team Events",
    description:
      "Regular team outings, retreats, and celebration of milestones together.",
  },
];

const Careers = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-display text-3xl md:text-5xl font-semibold mb-6">
              Join Our Team
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us craft the future of accessible luxury. We're looking for
              passionate people to join our growing team.
            </p>
          </div>

          {/* Why Join Us */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-8 text-center">
              Why Work at LUXE BAGS?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-6 border border-border rounded-lg">
                  <h3 className="font-display font-medium mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-8">
              Open Positions
            </h2>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-medium">
                      {position.title}
                    </h3>
                    <span className="text-sm text-primary font-medium">
                      {position.department}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {position.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {position.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {position.department}
                    </span>
                  </div>
                  <button className="inline-flex items-center justify-center h-9 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center p-8 bg-secondary/30 rounded-lg">
            <h2 className="font-display text-2xl font-medium mb-4">
              Don't See Your Role?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're always looking for talented people. Send us your resume and
              tell us how you'd contribute to our team.
            </p>
            <a
              href="mailto:careers@luxebags.com"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Send Your Resume
            </a>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
