export default function MethodologyPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Methodology</h1>
      <p>
        This site computes a credibility score from three pillars (Resources, Institutional Depth, Norm-Setting) using
        transparent indicators and sources. Scores are normalized to 0–100, averaged within pillars, and aggregated with
        documented weights. Optional penalties capture well-sourced contradictions.
      </p>
      <h2>Indicators & Weights</h2>
      <p>
        See data files for full details: <code>data/indicators.fr.json</code>, <code>data/indicators.se.json</code>.
        Each indicator includes: type (percent/amount/binary/ordinal), normalization settings, and <code>sourceId</code>.
      </p>
      <h2>Normalization</h2>
      <ul>
        <li>Percent/amount: linear between min–max or towards a stated target.</li>
        <li>Binary: true=1, false=0. Ordinal: position on scale (0..1).</li>
      </ul>
      <h2>Aggregation</h2>
      <ul>
        <li>Pillar score: mean of indicator scores.</li>
        <li>Credibility: weighted mean of pillars × (1 − penalties).</li>
      </ul>
      <h2>Limitations</h2>
      <ul>
        <li>Placeholders are labeled and must be replaced with verified values.</li>
        <li>Country contexts differ; indicator comparability is approximated.</li>
        <li>Penalties only apply when evidence is linked to a source.</li>
      </ul>
    </article>
  );
}

