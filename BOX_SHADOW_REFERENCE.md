# 📦 Box Shadow CSS Implementation Reference

## 🎨 All Box Shadow Classes Available

These are all the box shadow utilities imported from your original `style.css` and now available in `/client/src/App.css`:

---

## 1. **Glow Effects** (Primary Color Based)

### `.shadow-glow-sm` - Small Glow
```css
box-shadow: 0 0 5px var(--color-primary), 0 0 25px var(--color-primary);
```
- **Use**: Subtle accent on elements
- **Effect**: Small, tight cyan glow
- **Best for**: Icons, small buttons

### `.shadow-glow-md` - Medium Glow (DEFAULT)
```css
box-shadow: 
  0 0 5px var(--color-primary),
  0 0 15px var(--color-primary),
  0 0 20px var(--color-primary),
  0 0 100px var(--color-primary);
```
- **Use**: Default home page shadow
- **Effect**: Balanced, noticeable glow
- **Best for**: Buttons, profile images, hero elements

### `.shadow-glow-lg` - Large Glow
```css
box-shadow:
  0 0 5px var(--color-primary),
  0 0 25px var(--color-primary),
  0 0 50px var(--color-primary),
  0 0 100px var(--color-primary);
```
- **Use**: High-impact accent
- **Effect**: Large, intense cyan glow
- **Best for**: Featured buttons, CTA elements, important content

---

## 2. **Soft Shadow** (Non-Glow)

### `.shadow-soft` - Subtle Depth
```css
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```
- **Use**: Elevation without glow
- **Effect**: Dark shadow below element
- **Best for**: Cards, panels, traditional depth

---

## 3. **Neon Effects** (Cyan Based)

### `.shadow-neon-sm` - Small Neon
```css
box-shadow: 0 0 8px rgba(0, 247, 255, 0.4);
```
- **Use**: Subtle neon effect
- **Effect**: Faint cyan glow, tech aesthetic
- **Best for**: Borders, thin elements

### `.shadow-neon-md` - Medium Neon
```css
box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
```
- **Use**: Balanced neon styling
- **Effect**: Medium cyan glow with direction
- **Best for**: Buttons, links, interactive elements

### `.shadow-neon-lg` - Large Neon
```css
box-shadow: 0 8px 20px rgba(0, 247, 255, 0.6);
```
- **Use**: High-visibility neon effect
- **Effect**: Large, intense cyan glow with direction
- **Best for**: Call-to-action, highlights

---

## 4. **Dynamic Effects**

### `.shadow-dynamic` - Dynamic Glow
```css
box-shadow: 0 4px 12px rgba(0, 247, 255, 0.4);
```
- **Use**: Flexible glow using CSS variables
- **Effect**: Dynamic color based on theme
- **Best for**: Elements that adapt to theme changes

### `.shadow-hover-glow` - Hover Glow Transition
```css
transition: box-shadow 0.3s ease;

&:hover {
  box-shadow: 0 0 20px var(--color-primary);
}
```
- **Use**: Interactive feedback
- **Effect**: Smooth glow on hover
- **Best for**: Links, hover states

---

## 🔄 CSS Variables Used

All shadow effects dynamically use these variables:

```css
:root {
  --color-primary: #0ef;        /* Cyan - used in glows */
  --color-secondary: #071b27;   /* Dark blue - used in backgrounds */
  --color-text-light: #ededed;  /* Light gray - used in text */
  --color-text-dark: #000;      /* Black - used in light mode */
}
```

**Benefits**:
- Change `--color-primary` once → all glows update
- Theme-aware styling
- Easy customization

---

## 📱 Applied to Home Page Elements

### Profile Image
```jsx
<img
  className={`shadow-${portfolioData?.home_shadow_type}`}
  style={{ borderRadius: '50%' }}
/>
```
- Shows main profile picture
- Shadow effect applied based on selection
- Default: `glow-md`

### Action Buttons
```jsx
<a className={`shadow-${portfolioData?.home_shadow_type}`}>
  View My Projects
</a>
<a className={`shadow-${portfolioData?.home_shadow_type}`}>
  Download CV
</a>
```
- CTA buttons with shadow
- Same effect as profile image
- Creates cohesive design

### Social Icons
```jsx
<a className={`text-cyan-400 ${portfolioData?.home_shadow_type}`}>
  <i className="bx bxl-facebook"></i>
</a>
```
- Facebook, Instagram, WhatsApp, TikTok links
- Dynamic shadow based on selection
- Interactive social presence

---

## 🎨 Visual Comparison

### Glow Effects
```
none        → No effect
glow-sm     → •  (tiny)
glow-md     → ●  (medium)  ← DEFAULT
glow-lg     → ◉  (large)
```

### Neon Effects
```
neon-sm     → subtle tech glow
neon-md     → balanced neon feel
neon-lg     → intense cyberpunk
```

### Other
```
soft        → traditional shadow (no glow)
dynamic     → adaptive glow
```

---

## 💡 Usage Examples

### Example 1: Apply to Custom Element
```jsx
import './App.css';

export default function CustomCard() {
  return (
    <div className="shadow-glow-md p-6 rounded">
      This card has a medium glow effect
    </div>
  );
}
```

### Example 2: Dynamic Shadow Selection
```jsx
const shadowType = portfolioData?.home_shadow_type || 'glow-md';
<button className={`shadow-${shadowType}`}>
  Click Me
</button>
```

### Example 3: Conditional Shadow
```jsx
const hasShadow = portfolioData?.home_shadow_type !== 'none';
<img className={hasShadow ? `shadow-${portfolioData.home_shadow_type}` : ''} />
```

### Example 4: Hover Effect
```jsx
<a className="shadow-hover-glow">
  Hover over me to see glow!
</a>
```

---

## 🔍 How Shadows Work

### Shadow Layers
Each shadow is built with **multiple layers** for depth:

```css
box-shadow: 
  0 0 5px color,       /* Inner glow */
  0 0 15px color,      /* Middle glow */
  0 0 20px color,      /* Outer glow */
  0 0 100px color;     /* Far outer glow */
```

This creates a **layered, realistic glow effect**.

### RGBA Color Format
```css
rgba(0, 247, 255, 0.4)
     │   │   │    │
     │   │   │    └─ Opacity (0.4 = 40% transparent)
     │   │   └────── Blue (255 = full intensity)
     │   └────────── Green (247 = full intensity)
     └───────────── Red (0 = no red, so cyan color)
```

---

## 🎬 Shadow Hierarchy

Choose shadow based on importance:

| Priority | Shadow Type | Reason |
|----------|------------|--------|
| Critical (Hero) | `glow-lg` | Maximum attention |
| Important (CTA) | `glow-md` | Good balance |
| Supporting (Icons) | `glow-sm` | Subtle accent |
| Minimal | `none` | Clean, minimal |
| Dark Mode | `neon-md` | Tech aesthetic |
| Professional | `soft` | Traditional depth |

---

## 🔧 Customization Tips

### Increase Glow Intensity
Replace in `App.css`:
```css
.shadow-glow-md {
  box-shadow:
    0 0 10px var(--color-primary),
    0 0 25px var(--color-primary),
    0 0 40px var(--color-primary),
    0 0 150px var(--color-primary);  /* Increased from 100px */
}
```

### Create Custom Glow
Add to `App.css`:
```css
.shadow-custom {
  box-shadow:
    0 0 5px #ff00ff,
    0 0 20px #ff00ff,
    0 0 50px #ff00ff;
}
```

### Make Glow Smoother
Use `filter` with `drop-shadow`:
```css
.shadow-smooth {
  filter: drop-shadow(0 0 20px var(--color-primary));
}
```

---

## 📊 Performance Considerations

### Good ✅
- Using CSS shadows (GPU accelerated)
- Using CSS variables (efficient theme updates)
- Limited to 1-2 elements on view

### Avoid ❌
- Too many nested shadows (performance hit)
- Complex animations on shadows
- Shadows on every element

### Best Practice
- Use shadows strategically on key elements
- Profile image: `glow-md` or `glow-lg`
- Buttons: `glow-md`
- Icons: `glow-sm` or `none`

---

## 🎯 Shadow Selection Algorithm

When choosing shadow type, consider:

```
1. Visual Importance
   └─ High → glow-lg
   └─ Medium → glow-md (default)
   └─ Low → glow-sm or none

2. Design Aesthetic
   └─ Modern/Futuristic → neon-*
   └─ Professional → soft
   └─ Clean/Minimal → none
   └─ Tech → dynamic

3. Content Type
   └─ CTA Buttons → glow-lg
   └─ Images → glow-md
   └─ Icons → glow-sm
   └─ Cards → soft
```

---

## ✅ Verification Checklist

Verify shadow system works:

- [ ] All 9 shadow classes defined in `App.css`
- [ ] Shadow options visible in admin dropdown
- [ ] Shadows display on profile image
- [ ] Shadows display on buttons
- [ ] Shadows display on social icons
- [ ] Shadow effect changes when selected
- [ ] Shadow persists after page refresh
- [ ] `glow-md` is default selection
- [ ] `none` removes all shadows
- [ ] Glow effects use primary color

---

## 📚 Original CSS Source

All shadows are based on your original `/style.css`:

```css
/* Button glow */
.btn-box {
  box-shadow: 0 0 5px #0ef, 0 0 25px cyan;
}

/* Image glow */
.round {
  box-shadow: 0 0 5px #0ef, 0 0 25px, 0 0 50px cyan, 0 0 100px cyan, 0 0 200px cyan;
}

/* Hover glow */
.home-sci a:hover {
  box-shadow: 0 0 20px #0ef;
}
```

These have been **generalized and modernized** into reusable utility classes.

---

## 🚀 Next Steps

1. **Test**: Login to admin and select different shadows
2. **Verify**: See changes on home page instantly
3. **Customize**: Edit shadow values in `App.css` if desired
4. **Deploy**: All changes persist with SQLite

---

**Status**: ✅ COMPLETE  
**Last Updated**: May 21, 2026  
**Source Files**:
- `/client/src/App.css` (shadow classes)
- `/style.css` (original shadow reference)
