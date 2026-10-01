// Catalog Data for Artisan Canvas Gallery
const PAINTINGS_CATALOG = [
  {
    id: "art-01",
    title: "Symphony of the Sunburst",
    artist: "Elena Vance",
    category: "Abstract",
    medium: "Textured Oil & Gold Leaf on Canvas",
    year: "2025",
    basePrice: 185,
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    description: "An explosion of warm ochre, cadmium amber, and deep ultramarine swirls intertwined with real gold leaf accents. Designed to bring commanding warmth and emotional resonance to open spaces.",
    story: "Created during the high Tuscan summer, reflecting the dance between noon sunlight and rolling shadows.",
    palette: ["#D97706", "#2563EB", "#F59E0B", "#1E293B"],
    aspectRatio: "portrait", // portrait (3:4 or 2:3) or landscape (4:3 or 16:9)
    orientation: "portrait",
    featured: true
  },
  {
    id: "art-02",
    title: "Emerald Coast Solitude",
    artist: "Julian Moreau",
    category: "Landscape",
    medium: "Impasto Acrylic on Linen",
    year: "2024",
    basePrice: 210,
    rating: 5.0,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    description: "Vivid turquoise tides crash against emerald headlands beneath a dramatic painterly sky. Heavy palette knife textures capture raw coastal energy.",
    story: "Painted plein-air on the jagged cliffs of Brittany during an autumn squall.",
    palette: ["#0D9488", "#0369A1", "#047857", "#F0FDF4"],
    aspectRatio: "landscape",
    orientation: "landscape",
    featured: true
  },
  {
    id: "art-03",
    title: "Botanical Reverie No. 4",
    artist: "Aria Lindqvist",
    category: "Botanical",
    medium: "Mixed Media & Organic Pigments",
    year: "2025",
    basePrice: 160,
    rating: 4.8,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80",
    description: "Lush botanical silhouettes emerge from misty sage and petal-rose washes, balancing organic wildness with refined Scandinavian poise.",
    story: "Inspired by the Nordic greenhouse gardens at twilight, celebrating resilience and quiet growth.",
    palette: ["#84CC16", "#F43F5E", "#10B981", "#FEF2F2"],
    aspectRatio: "portrait",
    orientation: "portrait",
    featured: true
  },
  {
    id: "art-04",
    title: "Aura of the Muse",
    artist: "Mateo Cruz",
    category: "Modern Surrealism",
    medium: "Glaze Oil & Cold Wax",
    year: "2024",
    basePrice: 245,
    rating: 4.9,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1576769267415-9642010aa962?auto=format&fit=crop&w=1200&q=80",
    description: "A striking figurative portrait rendered in vivid neon highlights, cubist planar shifts, and hypnotic expressive gaze.",
    story: "An ode to creative freedom and introspection in the hyper-digital age.",
    palette: ["#E11D48", "#8B5CF6", "#06B6D4", "#0F172A"],
    aspectRatio: "portrait",
    orientation: "portrait",
    featured: false
  },
  {
    id: "art-05",
    title: "Neon Nebula Horizon",
    artist: "Kiran Patel",
    category: "Abstract",
    medium: "Fluid Acrylic & Resin Gloss",
    year: "2025",
    basePrice: 195,
    rating: 4.7,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    description: "Dynamic celestial flows in electric magenta, cosmic violet, and starry gold dust suspended in deep lacquer clarity.",
    story: "Conceived while studying deep-space imagery under the Himalayan night skies.",
    palette: ["#A855F7", "#EC4899", "#3B82F6", "#030712"],
    aspectRatio: "landscape",
    orientation: "landscape",
    featured: true
  },
  {
    id: "art-06",
    title: "Alpenglow Crest",
    artist: "Frederik Holst",
    category: "Landscape",
    medium: "Heavy Impasto Oil on Canvas",
    year: "2024",
    basePrice: 225,
    rating: 4.9,
    reviewsCount: 67,
    image: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&w=1200&q=80",
    description: "Alpine peaks ignited by the last dying rays of sunset, crowned in rose-gold fire and shadowed in glacial cobalt.",
    story: "Documenting the eternal stillness and crisp air of high-altitude mountain passes.",
    palette: ["#F97316", "#C026D3", "#1E3A8A", "#FFF7ED"],
    aspectRatio: "portrait",
    orientation: "portrait",
    featured: false
  },
  {
    id: "art-07",
    title: "Kyoto Petal Drift",
    artist: "Chiyo Takahashi",
    category: "Impressionist",
    medium: "Mineral Pigments & Washi Silk Mount",
    year: "2025",
    basePrice: 205,
    rating: 5.0,
    reviewsCount: 41,
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80",
    description: "Delicate spring blossoms swirling over reflective temple waters, blending classical Nihonga harmony with vibrant impressionism.",
    story: "Honoring the transient beauty of cherry blossom season along the Kamogawa river.",
    palette: ["#FB7185", "#38BDF8", "#34D399", "#FFF1F2"],
    aspectRatio: "portrait",
    orientation: "portrait",
    featured: false
  },
  {
    id: "art-08",
    title: "Gilded Rain in Manhattan",
    artist: "Marcus Sterling",
    category: "Impressionist",
    medium: "Oil Palette Knife on Stretched Canvas",
    year: "2024",
    basePrice: 230,
    rating: 4.8,
    reviewsCount: 50,
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80",
    description: "Taxi lights and skyscraper neon refracting through rain-slicked asphalt, vibrant yet nostalgic in rich textural strokes.",
    story: "Painted from a corner loft in SoHo during a midnight thunderstorm.",
    palette: ["#EAB308", "#DC2626", "#0284C7", "#18181B"],
    aspectRatio: "landscape",
    orientation: "landscape",
    featured: true
  }
];

// Customization Options Specification
const CUSTOMIZER_CONFIG = {
  sizes: [
    {
      id: "size-s",
      name: "Studio Petite",
      dimensions: '16" × 20" (40 × 50 cm)',
      widthInches: 16,
      heightInches: 20,
      scaleFactor: 0.65, // for room mockup scaling
      priceDelta: 0,
      popular: false,
      badge: "Compact Accent"
    },
    {
      id: "size-m",
      name: "Gallery Classic",
      dimensions: '24" × 36" (60 × 90 cm)',
      widthInches: 24,
      heightInches: 36,
      scaleFactor: 0.85,
      priceDelta: 55,
      popular: true,
      badge: "Most Popular"
    },
    {
      id: "size-l",
      name: "Statement Grand",
      dimensions: '32" × 48" (80 × 120 cm)',
      widthInches: 32,
      heightInches: 48,
      scaleFactor: 1.05,
      priceDelta: 120,
      popular: false,
      badge: "Dramatic Impact"
    },
    {
      id: "size-xl",
      name: "Architectural Oversized",
      dimensions: '40" × 60" (100 × 150 cm)',
      widthInches: 40,
      heightInches: 60,
      scaleFactor: 1.25,
      priceDelta: 210,
      popular: false,
      badge: "Centerpiece"
    }
  ],
  materials: [
    {
      id: "mat-canvas",
      name: "Stretched Cotton Canvas",
      description: "380gsm archival cotton with hand-textured matte varnish finish. Depth 1.5 inches.",
      priceMultiplier: 1.0,
      textureClass: "texture-canvas",
      badge: "Artisan Standard"
    },
    {
      id: "mat-impasto",
      name: "Textured Heavy Impasto",
      description: "Embellished by master studio artists with genuine raised acrylic brushstrokes.",
      priceMultiplier: 1.45,
      textureClass: "texture-impasto",
      badge: "Hand-Textured Touch"
    },
    {
      id: "mat-paper",
      name: "Museum Rag Fine Art Paper",
      description: "100% cotton German Etching 310gsm with velvety fine art watercolor feel.",
      priceMultiplier: 0.9,
      textureClass: "texture-paper",
      badge: "Crisp Detail"
    },
    {
      id: "mat-acrylic",
      name: "Vibrant Luminescent Glass/Metal",
      description: "Direct dye-sublimation on brushed aluminum with high-gloss depth and glow.",
      priceMultiplier: 1.3,
      textureClass: "texture-metal",
      badge: "Modern Gloss"
    }
  ],
  frames: [
    {
      id: "frame-none",
      name: "Frameless Gallery Wrap",
      description: "Edges mirrored & stretched around 1.5\" solid pine bars. Ready to hang.",
      price: 0,
      cssBorder: "border-0 shadow-2xl",
      innerShadow: "shadow-inner",
      matAllowed: false,
      swatchColor: "#f3f4f6"
    },
    {
      id: "frame-gold",
      name: "Florentine Brushed Gold",
      description: "Hand-leafed warm champagne gold floating frame with rich antique sheen.",
      price: 75,
      cssBorder: "border-[16px] border-[#D4AF37] ring-2 ring-[#B8860B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]",
      innerShadow: "shadow-inner ring-1 ring-amber-900/30",
      matAllowed: true,
      swatchColor: "#D4AF37"
    },
    {
      id: "frame-oak",
      name: "Natural Scandinavian Oak",
      description: "Solid sustainably sourced white oak with subtle organic woodgrain.",
      price: 65,
      cssBorder: "border-[16px] border-[#C8AD8D] ring-1 ring-[#A88C6D] shadow-2xl",
      innerShadow: "shadow-inner",
      matAllowed: true,
      swatchColor: "#C8AD8D"
    },
    {
      id: "frame-black",
      name: "Minimalist Matte Obsidian",
      description: "Sleek architectural black satin hardwood frame for crisp modern focus.",
      price: 55,
      cssBorder: "border-[16px] border-[#18181B] ring-1 ring-neutral-800 shadow-2xl",
      innerShadow: "shadow-inner",
      matAllowed: true,
      swatchColor: "#18181B"
    },
    {
      id: "frame-white",
      name: "Nordic Gallery White",
      description: "Ultra-clean pure matte white finish, perfect for bright modern spaces.",
      price: 55,
      cssBorder: "border-[16px] border-[#F4F4F5] ring-1 ring-neutral-300 shadow-2xl",
      innerShadow: "shadow-inner",
      matAllowed: true,
      swatchColor: "#FFFFFF"
    },
    {
      id: "frame-walnut",
      name: "Heritage Ornate Walnut",
      description: "Rich dark walnut with traditional beveled inner contouring.",
      price: 85,
      cssBorder: "border-[18px] border-[#4A2E18] ring-2 ring-[#2F1D0F] shadow-2xl",
      innerShadow: "shadow-inner",
      matAllowed: true,
      swatchColor: "#4A2E18"
    }
  ],
  mats: [
    {
      id: "matting-none",
      name: "Full Bleed (No Mat)",
      price: 0,
      paddingClass: "p-0"
    },
    {
      id: "matting-ivory",
      name: "2-Inch Museum Ivory Linen Mat",
      price: 35,
      paddingClass: "p-6 sm:p-8 bg-[#FDFBF7] shadow-inner"
    },
    {
      id: "matting-charcoal",
      name: "2-Inch Contrast Charcoal Mat",
      price: 35,
      paddingClass: "p-6 sm:p-8 bg-[#27272A] shadow-inner text-white"
    }
  ],
  rooms: [
    {
      id: "room-living",
      name: "Designer Living Room",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80",
      wallPositionClass: "top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      ambienceFilter: "filter-none"
    },
    {
      id: "room-bedroom",
      name: "Minimalist Master Suite",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
      wallPositionClass: "top-[32%] left-[48%] -translate-x-1/2 -translate-y-1/2",
      ambienceFilter: "filter-none"
    },
    {
      id: "room-office",
      name: "Executive Creative Studio",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
      wallPositionClass: "top-[35%] left-[52%] -translate-x-1/2 -translate-y-1/2",
      ambienceFilter: "filter-none"
    },
    {
      id: "room-gallery",
      name: "White Cube Gallery Wall",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      wallPositionClass: "top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2",
      ambienceFilter: "filter-none"
    }
  ]
};
