"use client";
import CountryComparePanel from "@/components/CountryComparePanel";
import SectionIntro from "@/components/SectionIntro";

export default function ComparePage() {
  return (
    <section className="grid gap-6">
      <SectionIntro
        title="What went wrong in Sweden?"
        subtitle="Sweden pioneered FFP (2014–2022) but discontinued the label in 2022. Compare France now vs Sweden’s legacy to see pillar differences and where gaps emerged."
      />
      <CountryComparePanel />
    </section>
  );
}
