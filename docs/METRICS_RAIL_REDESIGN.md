# Metrics Rail Redesign

## Overview
Redesigned the metrics sections for both User Dashboard and Admin Console with an institutional, analytical metrics rail design.

## Changes Made

### 1. Created MetricsRail Component
**File**: `components/metrics-rail.tsx`

A reusable component that displays metrics in a horizontal rail with:
- Full-width layout with thin top and bottom borders
- Vertical dividers between metrics
- Uppercase muted labels
- Large primary values with optional color coding
- Optional delta text
- Optional accent line for one highlighted metric

**Features**:
- Responsive with horizontal scroll on small screens
- Support for positive/negative/neutral delta types
- Automatic color coding for profit/loss metrics
- Clean, institutional design

### 2. User Dashboard Metrics
**File**: `app/dashboard/page.tsx`

**Metrics Displayed** (6 total):
1. **Active Signals**: Count with Free/Premium breakdown
2. **Win Rate (30D)**: Percentage with W/L breakdown
3. **Avg Risk:Reward**: Ratio with signal count
4. **Avg Hold Time**: Days with closed signal count (NEW)
5. **PnL (30D)**: Percentage with accent line (colored)
6. **Market Bias**: Bullish/Bearish/Neutral with L/S breakdown (colored)

**New Calculation**:
- Added average hold time calculation based on created_at and updated_at timestamps

### 3. Admin Dashboard Metrics
**File**: `app/admin/page.tsx`

**Metrics Displayed** (6 total):
1. **Total Users**: Count with "Registered" label
2. **Active Users (30D)**: Count with activity percentage
3. **Premium Users**: Count with conversion percentage
4. **Signals Published**: 30-day count
5. **Win Rate (30D)**: Percentage with W/L breakdown
6. **Platform PnL**: Estimated percentage with accent line (colored)

**New Calculations**:
- Active users based on updated_at within 30 days
- Premium user count and conversion rate
- Signals published in last 30 days
- Platform-wide win rate and PnL

### 4. Cleanup
- Removed unused `MetricCard` component from admin page
- Removed unused `Card` import from admin page
- Kept code clean and minimal

## Design Characteristics

✅ **Institutional Feel**:
- Horizontal rail layout (Bloomberg/Terminal style)
- Vertical dividers between metrics
- Uppercase tracking-widest labels
- Monospace font for values

✅ **Analytical**:
- Clear metric hierarchy
- Delta information for context
- Color coding only for directional data (profit/loss)
- One accent line per rail for emphasis

✅ **Calm & Consistent**:
- No cards, no shadows, no floating UI
- Thin borders (border/40 opacity)
- Consistent spacing and padding
- Same design across user and admin dashboards

✅ **Constraints Met**:
- Existing layout structure preserved
- Color palette unchanged
- Profit/loss colors maintained (emerald/rose)
- Shadcn UI components only
- No decorative elements

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│ LABEL 1    │ LABEL 2    │ LABEL 3    │ LABEL 4    │ LABEL 5 │
│ Value      │ Value      │ Value      │ │ Value    │ Value   │
│ delta      │ delta      │ delta      │ │ delta    │ delta   │
│            │            │            │ │          │         │
└─────────────────────────────────────────────────────────────┘
                                         ↑
                                    Accent line
                                  (colored for PnL)
```

## Responsive Behavior
- Full width on all screen sizes
- Horizontal scroll on small screens (overflow-x-auto)
- Metrics maintain minimum width (min-w-max)
- Dividers remain visible at all breakpoints

## Color Usage
- **Positive values**: `text-emerald-600 dark:text-emerald-400`
- **Negative values**: `text-rose-600 dark:text-rose-400`
- **Neutral values**: `text-foreground`
- **Accent lines**: Same colors at 40% opacity
- **Labels**: `text-muted-foreground`
- **Deltas**: `text-muted-foreground`

## Typography
- **Labels**: 10px, uppercase, tracking-widest, semibold
- **Values**: 20px (xl), monospace, semibold, tracking-tight
- **Deltas**: 11px, medium weight

## Spacing
- **Container**: py-4 (vertical padding)
- **Metrics**: px-6 (horizontal padding between dividers)
- **Gap between label and value**: gap-1 (flex-col)
- **Gap between value and delta**: gap-2 (items-baseline)

## Implementation Notes
1. Both dashboards now use the same MetricsRail component
2. Calculations are done inline using IIFE for cleaner code
3. Type casting used for admin page to handle Profile type limitations
4. All metrics are calculated from real data, not hardcoded
5. Graceful fallbacks for missing data (shows "—" or 0)

## Result
A professional, institutional metrics display that:
- Provides at-a-glance insights
- Maintains visual consistency
- Emphasizes data over decoration
- Scales across different screen sizes
- Matches the platform's editorial aesthetic
