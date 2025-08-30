export default function About() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>About & Methodology</h1>
      <p>
        This interactive tool illustrates trade-offs in feminist diplomacy using a transparent, simplified scoring model.
        It compares a current France baseline against Sweden’s legacy approach.
      </p>
      <h2>Levers</h2>
      <ul>
        <li>Budget Allocation</li>
        <li>Intersectionality Weight</li>
        <li>Diplomacy Stance</li>
        <li>Multilateralism</li>
        <li>Domestic Coherence</li>
      </ul>
      <h2>Outcomes</h2>
      <ul>
        <li>Rights</li>
        <li>Safety</li>
        <li>Economic</li>
        <li>Diplomatic Capital</li>
        <li>Backlash Risk</li>
      </ul>
      <p className="text-sm">
        Assumptions are illustrative; see code and weights in the repository.
      </p>
    </article>
  );
}

