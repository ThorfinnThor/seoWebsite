# Terrace material planner

The terrace vertical is a deterministic quantity planner, not a structural or installation calculator. It deliberately has no public product catalog yet.

## Inputs

- rectangular terrace length and width;
- board laying direction;
- effective board width and planned gap;
- available board length;
- 5, 10 or 15 percent selection/waste reserve;
- maximum support spacing taken from the selected decking system.

## Core calculation

The laying direction defines the board run length and the width that must be covered by board courses.

```text
module width = board width + gap
course count = ceil((span width + gap) / module width)
decking linear metres = course count × run length
purchase linear metres = decking linear metres × reserve factor
full boards = ceil(purchase linear metres / supplied board length)
support intervals = ceil(run length / maximum support spacing)
support rows = support intervals + 1
```

The full-board estimate assumes that usable offcuts can be assigned through a real cut plan. The UI therefore reports linear metres as the primary result and labels the board count as approximate.

## Explicit limits

The planner does not decide or verify:

- structural capacity, foundations or building connections;
- drainage, slope or waterproofing;
- material-specific expansion gaps;
- fastener type or screw count;
- joint-bearing details;
- stairs, curves, cut-outs or non-rectangular geometry.

Manufacturer system details and site-specific planning always override the estimator.
