import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Truck, RotateCcw, Package, Clock } from "lucide-react";

const Shipping = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Shipping & Returns
          </h1>
          <p className="text-muted-foreground mb-12">
            Everything you need to know about getting your order and our return
            policy.
          </p>

          {/* Shipping Info Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 border border-border rounded-lg">
              <Truck className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-medium mb-2">
                Free Shipping
              </h3>
              <p className="text-muted-foreground text-sm">
                Complimentary shipping on all orders over $150 within the
                continental US.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-medium mb-2">
                Express Delivery
              </h3>
              <p className="text-muted-foreground text-sm">
                Need it fast? Express shipping available for 1-2 business day
                delivery.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <RotateCcw className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-medium mb-2">
                30-Day Returns
              </h3>
              <p className="text-muted-foreground text-sm">
                Not satisfied? Return within 30 days for a full refund, no
                questions asked.
              </p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <Package className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-medium mb-2">
                Secure Packaging
              </h3>
              <p className="text-muted-foreground text-sm">
                Every bag is carefully packaged in our signature dust bag and
                gift box.
              </p>
            </div>
          </div>

          {/* Shipping Details */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-medium mb-6">
              Shipping Information
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="domestic">
                <AccordionTrigger>Domestic Shipping (US)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong>Standard Shipping:</strong> 5-7 business days -
                      $9.95 (Free over $150)
                    </p>
                    <p>
                      <strong>Express Shipping:</strong> 2-3 business days -
                      $19.95
                    </p>
                    <p>
                      <strong>Overnight Shipping:</strong> 1 business day -
                      $29.95
                    </p>
                    <p className="text-sm">
                      Orders placed before 2 PM EST on business days ship same
                      day.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="international">
                <AccordionTrigger>International Shipping</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <strong>Canada:</strong> 7-10 business days - $24.95
                    </p>
                    <p>
                      <strong>Europe:</strong> 10-14 business days - $34.95
                    </p>
                    <p>
                      <strong>Rest of World:</strong> 14-21 business days -
                      $44.95
                    </p>
                    <p className="text-sm">
                      International orders may be subject to customs duties and
                      taxes.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tracking">
                <AccordionTrigger>Order Tracking</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive an email with tracking
                    information. You can also track your order by logging into
                    your account and visiting the Orders page.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Returns Policy */}
          <section>
            <h2 className="font-display text-2xl font-medium mb-6">
              Returns & Exchanges
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="policy">
                <AccordionTrigger>Return Policy</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      We offer a 30-day return policy on all unused items in
                      their original packaging.
                    </p>
                    <p>
                      Items must be unworn, undamaged, and include all original
                      tags and packaging.
                    </p>
                    <p>
                      Sale items and personalized products are final sale and
                      cannot be returned.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="process">
                <AccordionTrigger>How to Return</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Log into your account and go to your Orders page</li>
                    <li>Select the item you wish to return</li>
                    <li>Print the prepaid return label</li>
                    <li>Pack the item securely in its original packaging</li>
                    <li>Drop off at any authorized shipping location</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="refunds">
                <AccordionTrigger>Refunds</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Refunds are processed within 5-7 business days of receiving
                    your return. The refund will be credited to your original
                    payment method. Please allow an additional 3-5 business days
                    for the refund to appear on your statement.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exchanges">
                <AccordionTrigger>Exchanges</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    For exchanges, please return your original item and place a
                    new order for the desired item. This ensures the fastest
                    processing time and guarantees availability.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
