# Greenhouse vertical

The greenhouse planner is a deterministic pre-planning tool without a product catalog. It converts external footprint dimensions and an internal layout into transparent quantities while keeping construction decisions explicit.

## Inputs and outputs

- External length and width define the footprint.
- Two side beds, an optional rear bed and a central aisle form the fixed-layout variants.
- Container/table mode reserves only the central aisle and reports the remaining floor as flexible.
- The external perimeter receives a 5% profile-length reserve and is rounded up to full supplied bars.
- Rainwater is shown as the theoretical geometric yield for 10 mm rainfall before all real losses.

## Deliberate limits

The planner does not size foundations or anchors, assess wind or snow loads, select glazing thickness, design heating or electrical installations, or decide regulatory questions. Warnings keep those tasks visible. Product-specific internal dimensions and assembly instructions take precedence over this early layout frame.

## Persistence and tests

Validated inputs persist only in the current browser tab under `machplan:greenhouse:v1`. Rule tests cover standard layouts, container mode, bar rounding, water yield, validation conflicts and contextual warnings.
