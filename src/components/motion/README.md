# Motion Components

This folder contains reusable motion components built with Framer Motion for consistent animations across the application.

## Components

- `MotionDiv` - A wrapper around motion.div with default animations
- `MotionH1` - A wrapper around motion.h1 with default animations
- `MotionH3` - A wrapper around motion.h3 with default animations
- `MotionP` - A wrapper around motion.p with default animations
- `MotionImg` - A wrapper around motion.img with default animations
- `StaggeredContainer` - A container for staggered animations
- `PageTransition` - Page-level transitions

## Usage

```tsx
import { MotionDiv, MotionH1, MotionP } from '../components/motion';

// Basic usage
<MotionDiv>
  <h1>Content with default fade-in animation</h1>
</MotionDiv>

// Custom animations
<MotionH1
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
  Custom animated heading
</MotionH1>

// With hover and tap effects
<MotionDiv
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</MotionDiv>
```

## Props

All components accept the standard Framer Motion props plus:
- `className` - CSS classes to apply
- `children` - Child elements to animate

## Customization

Each component has sensible defaults but can be fully customized through props.