import { Layout } from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "Orders & Shipping",
    questions: [
      {
        q: "How long will my order take to arrive?",
        a: "Standard shipping takes 5-7 business days within the US. Express shipping (2-3 days) and overnight options are also available at checkout.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! We offer complimentary standard shipping on all orders over $150 within the continental United States.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships, you'll receive an email with tracking information. You can also view your order status in your account.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to Canada, Europe, and select international destinations. Shipping rates and delivery times vary by location.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy on all unused items in their original packaging. Items must be unworn and include all original tags.",
      },
      {
        q: "How do I return an item?",
        a: "Log into your account, go to your Orders page, select the item to return, and print the prepaid return label. Full instructions are on our Shipping & Returns page.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5-7 business days of receiving your return, with an additional 3-5 days for the refund to appear on your statement.",
      },
      {
        q: "Can I exchange an item?",
        a: "For the fastest service, we recommend returning your original item and placing a new order. This ensures availability of your desired item.",
      },
    ],
  },
  {
    title: "Products & Care",
    questions: [
      {
        q: "What materials are your bags made from?",
        a: "Our bags are crafted from premium full-grain leather, sustainable vegan leather options, and high-quality hardware. Each product page lists specific materials used.",
      },
      {
        q: "How should I care for my leather bag?",
        a: "Store your bag in the included dust bag when not in use. Clean with a soft, dry cloth and use leather conditioner every few months to maintain suppleness.",
      },
      {
        q: "Do you offer repairs?",
        a: "Yes, we offer complimentary repairs for manufacturing defects within the first year. For wear-related repairs, please contact our customer service team.",
      },
      {
        q: "Are your products authentic?",
        a: "All LUXE BAGS products are designed and crafted by our artisan team. We guarantee authenticity on every purchase.",
      },
    ],
  },
  {
    title: "Account & Orders",
    questions: [
      {
        q: "Do I need an account to place an order?",
        a: "While you can checkout as a guest, creating an account allows you to track orders, save favorites, and enjoy a faster checkout experience.",
      },
      {
        q: "How do I update my account information?",
        a: "Log into your account and visit the Account page to update your personal information, shipping address, and password.",
      },
      {
        q: "Can I cancel or modify my order?",
        a: "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our customer service team as soon as possible.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mb-12">
            Find answers to common questions about orders, shipping, returns,
            and more.
          </p>

          <div className="space-y-10">
            {faqCategories.map((category) => (
              <section key={category.title}>
                <h2 className="font-display text-xl font-medium mb-4">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.title}-${index}`}
                    >
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">{item.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-8 bg-secondary/30 rounded-lg text-center">
            <h3 className="font-display text-xl font-medium mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our customer service team is here to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
