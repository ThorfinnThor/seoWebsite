# Robot-mower vertical

The robot-mower tool is a deterministic site and capacity pre-check without a product catalog. It translates rectangular lawn sections, fixed exclusions, terrain and installation context into an explicit selection frame.

## Inputs and outputs

- Up to eight rectangular sections contribute gross area; fixed non-lawn exclusions produce net mowing area.
- A base capacity factor of 1.2 is increased for geometry complexity, strong growth, multiple zones and disconnected areas.
- The resulting rated-area class is rounded up to full 50 m² steps.
- Passage width is classified only for planning attention, never as confirmed product compatibility.
- Rectangle perimeters plus 10% form a rough upper cable frame. Shared edges, obstacle islands and extra guide or supply lines are deliberately not inferred.

## Deliberate limits

The tool does not predict runtime or cutting quality, confirm a device's slope/passages, assess radio or satellite reception, design electrical work, or make safety decisions. Every result keeps manufacturer conditions and an on-site check visible.

## Persistence and tests

Validated inputs persist only in the current browser tab under `passendplanen:robot-mower:v1`. Rule tests cover area exclusions, capacity factors and rounding, passage classes, cable framing, steep terrain, disconnected lawns, reception and station tasks.
