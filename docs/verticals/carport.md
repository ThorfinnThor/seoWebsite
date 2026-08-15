# Carport vertical

The carport planner is a deterministic space pre-check without a product catalog. It converts vehicle dimensions and explicitly chosen movement reserves into clear target dimensions while keeping construction decisions outside the result.

## Inputs and outputs

- One or two equal vehicle envelopes are supported.
- Side clearance is added at both outer edges and once between two vehicles.
- Front, rear and optional storage depth form the clear target length.
- Vehicle height plus a selected reserve forms the clear target height.
- The clear planning rectangle supplies a transparent area and theoretical rainwater geometry for 10 mm rainfall.

## Deliberate limits

The tool does not determine exterior product dimensions, posts, foundations, structural members, wind or snow loads, drainage capacity, access curves, electrical design or regulatory requirements. Attached construction, sloped sites, charging equipment and photovoltaic plans add explicit warnings.

## Persistence and tests

Validated inputs persist only in the current browser tab under `passendplanen:carport:v1`. Rule tests cover single and double width, clear dimensions, movement/storage area, rainwater geometry, tight clearances, turning access, sloped sites, attached construction, drainage, charging and photovoltaic planning.
