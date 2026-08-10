# Flooring quantity planner

The flooring vertical is a deterministic material estimator for laminate, click vinyl and floating engineered parquet. It has no public product catalog and does not approve a substrate or installation system.

## Inputs

- one to eight rectangular room sections;
- fixed areas that definitely receive no flooring;
- flooring type and straight or diagonal layout;
- plank dimensions and actual coverage per package;
- 5, 10 or 15 percent waste/selection reserve;
- optional separate underlay and coverage per roll;
- optional skirting, total door openings and supplied bar length;
- floor-heating and wet-room context flags.

## Core calculation

```text
gross area = sum(room length × room width)
net area = gross area − fixed excluded area
purchase area = net area × waste factor
packages = ceil(purchase area / package coverage)
ordered area = packages × package coverage

perimeter = sum(2 × (room length + room width)) − door openings
skirting length = perimeter × 1.10
skirting bars = ceil(skirting length / supplied bar length)

underlay area = net area × 1.05
underlay rolls = ceil(underlay area / roll coverage)
```

The package count is the primary flooring result. The estimated plank count is explanatory because packages, not individual planks, are normally the purchase unit.

## Explicit limits

The planner does not decide or verify:

- substrate strength, flatness or residual moisture;
- vapour barrier or impact-sound underlay suitability;
- expansion joints, transitions or movement profiles;
- wet-room or floor-heating approval;
- adhesive or fixed-installation systems;
- whether offcuts can be reused in a real row plan;
- shared internal edges when several rectangles form one open room.

The product installation instructions and the actual room survey always override the estimator.
