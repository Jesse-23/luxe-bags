import { Layout } from "@/components/layout/Layout";
import { Ruler, Smartphone, CreditCard, Book } from "lucide-react";

const bagSizes = [
  {
    name: "Mini",
    dimensions: '6" W × 4" H × 2" D',
    fits: ["Phone", "Cards", "Keys", "Lipstick"],
    ideal: "Evening events, quick errands",
    strap: '20-22" drop',
  },
  {
    name: "Small",
    dimensions: '9" W × 6" H × 3" D',
    fits: ["Phone", "Wallet", "Sunglasses", "Small essentials"],
    ideal: "Date nights, casual outings",
    strap: '20-24" drop',
  },
  {
    name: "Medium",
    dimensions: '12" W × 8" H × 4" D',
    fits: ["Tablet", "Wallet", "Cosmetics pouch", "Book", "Umbrella"],
    ideal: "Daily use, work meetings",
    strap: '10-22" adjustable',
  },
  {
    name: "Large",
    dimensions: '15" W × 11" H × 5" D',
    fits: ["13\" Laptop", "Documents", "Water bottle", "All daily essentials"],
    ideal: "Work, travel, busy days",
    strap: '10-12" handle drop',
  },
  {
    name: "Tote",
    dimensions: '18" W × 13" H × 6" D',
    fits: ["15\" Laptop", "Gym clothes", "Everything you need"],
    ideal: "Work, weekend trips, everyday carry-all",
    strap: '9-11" handle drop',
  },
];

const comparisonItems = [
  { icon: Smartphone, name: "Smartphone", size: '6" × 3"' },
  { icon: CreditCard, name: "Wallet", size: '4" × 3"' },
  { icon: Book, name: "Paperback Book", size: '8" × 5"' },
];

const strapGuide = [
  { style: "Short Handle", drop: '4-6"', description: "Hand-carry only, elegant look" },
  { style: "Medium Handle", drop: '8-12"', description: "Hand or elbow carry" },
  { style: "Shoulder Strap", drop: '18-22"', description: "Over the shoulder, hands-free" },
  { style: "Crossbody Strap", drop: '20-26"', description: "Across the body, most secure" },
  { style: "Adjustable", drop: '10-24"', description: "Versatile, multiple carry options" },
];

const SizeGuide = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Size Guide
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find your perfect bag size. Use our comprehensive guide to choose
              the right dimensions for your lifestyle.
            </p>
          </div>

          {/* How to Measure */}
          <section className="mb-16">
            <div className="p-6 md:p-8 bg-secondary/30 rounded-lg">
              <div className="flex items-start gap-4">
                <Ruler className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="font-display text-xl font-medium mb-3">
                    How We Measure
                  </h2>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      <strong>Width (W):</strong> Measured across the base of the
                      bag at its widest point
                    </li>
                    <li>
                      <strong>Height (H):</strong> Measured from the base to the
                      top of the bag (excluding handles)
                    </li>
                    <li>
                      <strong>Depth (D):</strong> Measured from front to back at
                      the base
                    </li>
                    <li>
                      <strong>Strap Drop:</strong> Distance from the top of the
                      strap to where it meets the bag
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Size Chart */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-6">
              Bag Sizes at a Glance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-display font-medium">
                      Size
                    </th>
                    <th className="text-left py-4 px-4 font-display font-medium">
                      Dimensions
                    </th>
                    <th className="text-left py-4 px-4 font-display font-medium hidden md:table-cell">
                      Strap Drop
                    </th>
                    <th className="text-left py-4 px-4 font-display font-medium hidden sm:table-cell">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bagSizes.map((size) => (
                    <tr
                      key={size.name}
                      className="border-b border-border hover:bg-secondary/20 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">{size.name}</td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        {size.dimensions}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm hidden md:table-cell">
                        {size.strap}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm hidden sm:table-cell">
                        {size.ideal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Size Cards */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-6">
              What Fits in Each Size
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bagSizes.map((size) => (
                <div
                  key={size.name}
                  className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-display text-lg font-medium mb-2">
                    {size.name}
                  </h3>
                  <p className="text-sm text-primary mb-3">{size.dimensions}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {size.ideal}
                  </p>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide mb-2">
                      Fits
                    </p>
                    <ul className="space-y-1">
                      {size.fits.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1 h-1 bg-primary rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Item Sizes */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-6">
              Common Item Sizes for Reference
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {comparisonItems.map((item) => (
                <div
                  key={item.name}
                  className="p-4 md:p-6 border border-border rounded-lg text-center"
                >
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.size}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Strap Guide */}
          <section className="mb-16">
            <h2 className="font-display text-2xl font-medium mb-6">
              Strap & Handle Guide
            </h2>
            <div className="space-y-4">
              {strapGuide.map((strap) => (
                <div
                  key={strap.style}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 border border-border rounded-lg"
                >
                  <div className="sm:w-40">
                    <p className="font-medium">{strap.style}</p>
                  </div>
                  <div className="sm:w-24">
                    <p className="text-sm text-primary">{strap.drop}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {strap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="p-6 md:p-8 bg-secondary/30 rounded-lg">
            <h2 className="font-display text-xl font-medium mb-4">
              Sizing Tips
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-semibold">1.</span>
                Consider your daily essentials—list what you carry and match to
                the "What Fits" guide above.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-semibold">2.</span>
                For work, ensure your bag fits your laptop with 1-2" to spare on
                each side.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-semibold">3.</span>
                Crossbody straps work best at 22-24" for most people; adjust for
                your height.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-semibold">4.</span>
                When in doubt, size up—a slightly larger bag is more versatile
                than one that's too small.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SizeGuide;
