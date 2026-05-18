# Landing Page Components

Mountain hiking-themed landing page components for WildScape Europe.

## Components Overview

### MountainHero

Main hero section with large headline and destination navigation.

**Props:**

- `onExploreClick: () => void` - Callback for explore button

**Features:**

- Full-height hero section
- Destination sidebar navigation
- Header with logo and phone
- Organic shape image clipping
- Scroll indicator

### TourFilters

Filter selection section with icon-based categories.

**Props:**

- `onFilterSelect?: (filter: string) => void` - Filter selection callback

**Features:**

- 5 filter categories
- Icon-based buttons
- Hover effects
- Clean grid layout

### TourCard

Individual tour card with image, details, and pricing.

**Props:**

- `image: string` - Tour image URL
- `title: string` - Tour title
- `date: string` - Tour date
- `duration: string` - Tour duration
- `price: string` - Tour price
- `category?: string` - Tour category badge
- `index?: number` - Animation delay index

**Features:**

- Large image with overlay
- Category badge
- Date and duration info
- Price display
- Hover animations
- Arrow CTA button

### ToursSection

Grid of tour cards with decorative elements.

**Features:**

- 2-column grid layout
- 4 featured tours
- View all button
- Wave dividers

### InfoSections

Alternating content sections with images and text.

**Features:**

- 4 sections with different topics
- Alternating left/right layout
- Organic image shapes
- Icon badges
- Accent color system
- CTA buttons

### Footer

Site footer with links and contact information.

**Features:**

- 4-column layout
- Social media links
- Contact information
- Brand section
- Link sections
- Bottom copyright bar
- Wave divider top

### ScrollIndicator

Animated scroll indicator for hero section.

**Features:**

- "SCROLL TO EXPLORE" text
- Animated chevron
- Click to scroll
- Bounce animation

### LandingPage

Main container that assembles all sections.

**Props:**

- `onExploreClick: () => void` - Explore button callback

**Features:**

- Complete page assembly
- Smooth flow
- Consistent spacing

## Usage

```tsx
import { LandingPage } from "./components/Landing/LandingPage";

function App() {
  const handleExplore = () => {
    // Navigate to explore page
  };

  return <LandingPage onExploreClick={handleExplore} />;
}
```

## Styling

All components use:

- Tailwind CSS utilities
- Framer Motion animations
- Custom color palette (#E8E3DB, #3E2723, #C85A54)
- Organic shapes and wavy dividers
- Custom fonts (Bitter, Inter, Cormorant Garamond)

## Animations

- Entrance animations with Framer Motion
- Scroll-triggered animations (viewport)
- Hover effects on interactive elements
- Smooth scrolling with Lenis
- Staggered animations for lists

## Responsive Design

- Desktop-first approach
- Grid layouts that collapse on mobile
- Responsive typography
- Mobile-optimized spacing
- Touch-friendly interactions
