# Drywall vertical

The drywall planner is a deterministic quantity pre-check without a product catalog. It converts one rectangular wall, openings, cladding sides and layers into transparent board and baseline-profile quantities.

## Inputs and outputs

- Gross wall area minus openings produces the net area of one face.
- Net area is multiplied by cladded sides and layers, then by 10% or 15% reserve.
- Full board count uses the entered board dimensions and always rounds upward.
- The stud count is explicitly an uninterrupted baseline grid before openings and reinforcements.
- Floor and ceiling track length receives 10% reserve and is rounded to full supplied bars.
- Optional insulation reports net cavity face area only.

## Deliberate limits

The tool does not select a stud or board system, determine screws, anchors, sealing and joint materials, design openings or loads, coordinate installations, or approve fire, acoustic or moisture performance. Those requirements remain warnings and require a complete compatible system.

## Persistence and tests

Validated inputs persist only in the current browser tab under `passendplanen:drywall:v1`. Rule tests cover opening validation, one- and two-sided multi-layer area, full-board rounding, baseline studs, track bars and context-specific system warnings.
