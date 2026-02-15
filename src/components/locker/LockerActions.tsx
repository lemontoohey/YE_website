"use client";

import Link from "next/link";

type LockerActionsProps = {
  item: { id: number; title: string; stripe_price_id?: string | null };
  canCheckout: boolean;
};

export function LockerActions({ item, canCheckout }: LockerActionsProps) {
  const handleInquire = () => {
    const msg = `I am interested in acquiring the following asset: ${item.title}`;
    sessionStorage.setItem("inquiryMessage", msg);
  };

  if (canCheckout) {
    return (
      <form action="/api/checkout" method="POST">
        <input type="hidden" name="priceId" value={item.stripe_price_id!} />
        <button
          type="submit"
          className="w-full rounded-none bg-white px-8 py-4 font-mono text-lg font-medium text-black transition-all hover:bg-accent-500 hover:text-white hover:drop-shadow-[0_0_20px_rgba(255,90,95,0.6)]"
        >
          SECURE THIS ASSET
        </button>
      </form>
    );
  }

  return (
    <Link
      href="/#contact"
      onClick={handleInquire}
      className="block w-full rounded-none bg-white px-8 py-4 text-center font-mono text-lg font-medium text-black transition-all hover:bg-accent-500 hover:text-white hover:drop-shadow-[0_0_20px_rgba(255,90,95,0.6)]"
    >
      INQUIRE
    </Link>
  );
}
