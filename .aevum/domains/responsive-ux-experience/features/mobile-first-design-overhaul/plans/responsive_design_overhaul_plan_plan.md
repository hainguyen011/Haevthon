# Responsive Design Overhaul Plan

Make the Haevthon 2026 application fully responsive, ensuring a premium experience on mobile, tablet, and desktop.

## User Review Required

> [!IMPORTANT]
> The current fixed sidebar (80px) will be moved to a **Bottom Navigation Bar** on mobile devices (screen width < 768px) to maximize screen real estate and improve thumb-reachability.

> [!TIP]
> I will use a combination of `clamp()` for fluid typography and CSS media queries for layout shifts.

## Proposed Changes

### Global Styles

#### [MODIFY] [index.css](file:///d:/I2FLabs/Projects/Haevthon/src/index.css)
- Remove `padding-left: 80px` from `body` on mobile.
- Define global responsive utilities.

### Components

#### [MODIFY] [Navbar.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/Navbar.jsx)
- Implement a breakpoint-based layout:
    - Desktop: Fixed Sidebar.
    - Mobile: Floating Glassmorphic Bottom Bar.

#### [MODIFY] [HeroSection.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/HeroSection.jsx)
- Adjust logo scaling and event details grid.

#### [MODIFY] [AboutHaevthon.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/AboutHaevthon.jsx)
- Single column layout for mobile.

#### [MODIFY] [RegistrationForm.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/RegistrationForm.jsx)
- Stacked layout for mobile.
- Grid column adjustments.

#### [MODIFY] [Footer.jsx](file:///d:/I2FLabs/Projects/Haevthon/src/components/Footer.jsx)
- Stacked layout.

## Verification Plan

### Automated Tests
- Browser verification at 375px, 768px, 1440px.

### Manual Verification
- Touch target check.
- Horizontal scroll check.
