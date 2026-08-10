# Privacy-screen system planner

The privacy-screen vertical is a deterministic quantity and raster planner for one continuous straight run. It is not a structural, foundation or installation calculator and has no public product catalog.

## Inputs

- target run length and desired screen height;
- the actual standard-field installation or post-axis dimension from the manufacturer;
- zero to three gate modules and their complete installation dimension;
- optional spare panel;
- mounting context, level or sloped terrain and a coarse wind-exposure flag.

## Core calculation

```text
gate length = gate count × gate module width
remaining panel length = target length − gate length
standard panels = ceil(remaining panel length / system field width)
continuous modules = standard panels + gates
posts = continuous modules + 1
full system length = standard panels × system field width + gate length
end adjustment = full system length − target length
```

The optional spare increases only the order quantity, not the installed field or post count. If the raster does not end exactly, the UI reports the resulting final-field width and explicitly requires a system-approved cut or special field.

## Explicit limits

The planner does not decide or verify:

- post profile, structural capacity or wind-load approval;
- foundation diameter, depth or reinforcement;
- anchor, base plate or substrate suitability;
- boundary location, permits or neighbour-law requirements;
- corner, slope, step or gate-hardware details;
- whether a panel can be shortened.

Manufacturer system details, site conditions and applicable local requirements always override the estimator.
