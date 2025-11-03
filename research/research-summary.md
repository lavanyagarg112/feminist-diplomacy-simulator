# Research Summary: France's Feminist Foreign Policy

This document summarises the key findings used to build the indicator scoring system in the Feminist Diplomacy Simulator.  
The analysis is structured around the three main pillars of France’s Feminist Foreign Policy:

1. **Resources**
2. **Institutional Depth**
3. **Norm-Setting and Influence**

Each table highlights both **strengths / official commitments** and **gaps / contradictions**, which are later converted into quantitative scores and penalties in the simulator logic.

---

## 1. Resources

| **Strengths / Commitments**                                                                          | **Gaps / Contradictions**                                                                           |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Pledged that **75%** of Official Development Assistance (ODA) will support gender equality by 2025   | As of 2023, only **46.4%** of French aid is gender-tagged, far below target and behind Sweden’s 82% |
| Created the **Support Fund for Feminist Organisations (FSOF)**, renewed with **€250M** for 2023–2027 | Projected **€21B in cuts** to development funding by 2030                                           |
| Co-led the **Generation Equality Forum**, mobilising **$40B** in commitments                         | No dedicated or transparent feminist budget, limiting monitoring and accountability                 |

---

## 2. Institutional Depth

| **Strengths / Commitments**                                                                                                     | **Gaps / Contradictions**                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Appointed an **FFP Ambassador**, a network of **170 gender focal points**, and oversight by the High Council for Equality (HCE) | HCE states the policy still “lacks a solid conceptual basis” and is not fully defined in doctrine |
| Gender equality is a **legal requirement** across all French development aid                                                    | Implementation uneven: strong on SRHR, but “absent” in trade, climate, and disarmament            |
| Female ambassador representation increased from **11% (2012)** to **28% (2021)**                                                | Still far behind Sweden, which has achieved **51%** parity                                        |

---

## 3. Norm-Setting and Influence

| **Strengths / Commitments**                                                                               | **Gaps / Contradictions**                                                                    |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Co-hosted the **Generation Equality Forum**, a major global platform                                      | France is the **3rd largest arms exporter**, with 25% of sales going to Saudi Arabia and UAE |
| Vocal advocate for **Sexual and Reproductive Health and Rights (SRHR)** at the UN                         | Arms trade undermines feminist leadership and credibility                                    |
| Active coalition builder, keeping the “feminist diplomacy club” alive and hosting the 2025 FFP conference | Feminist lens not applied to trade, migration, or climate policies                           |

---

## How this data is used in the project

- Each strength and contradiction feeds into numerical indicators stored in `/data/indicators.json`
- Scoring and normalisation logic is defined in:
  - [`/lib/normalise.ts`](../lib/normalise.ts)
  - [`/lib/credibility.ts`](../lib/credibility.ts)
- Contradictions are modelled as **penalties** applied to each pillar
- These scores drive the **real-time simulator** and credibility score on the website

---

## Source Notes

All data comes from verified sources including:

- France’s Feminist Foreign Policy Strategy 2025–2030
- OECD Development Co-operation Profiles
- Focus 2030 analysis
- WILPF and ECCHR arms trade reports
- Kiel Institute research
- Generation Equality Forum records

Full citations are listed in the `/data` folder, as well as `/details` page of the site.
