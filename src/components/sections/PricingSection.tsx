import { RedactedPrice } from "@/components/ui";

const SERVICES = [
  { price: "$2,500", label: "Half Day Rate" },
  { price: "$5,000", label: "Full Day Rate" },
  { price: "$8,500", label: "Multi-Day Package" },
  { price: "$1,200", label: "Portrait Session" },
];

export function PricingSection() {
  return (
    <section className="border-t border-parchment-100/10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center font-heading text-3xl font-medium tracking-[0.15em] text-parchment-100 sm:text-4xl">
          RATES & CLEARANCE
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center font-body text-parchment-100/70">
          Decrypt to view. Hold each line to reveal.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <RedactedPrice
              key={service.label}
              price={service.price}
              label={service.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
