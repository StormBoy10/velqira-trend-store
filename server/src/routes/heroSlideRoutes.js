import express from 'express';
import { HeroSlide } from '../models/HeroSlide.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { broadcastEvent } from '../events.js';

const router = express.Router();

// @route GET /api/hero-slides (Public retrieve active hero slides)
router.get('/', async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: slides.length, slides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/hero-slides (Admin Update/Replace Hero Slides)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { slides } = req.body;
    if (Array.isArray(slides)) {
      await HeroSlide.deleteMany({});
      const formatted = slides.map((s, idx) => ({
        slideId: s.id || `slide-${idx}`,
        image: s.image,
        wideImage: s.wideImage || '',
        badgeText: s.badgeText || '',
        title: s.title || '',
        subtitle: s.subtitle || '',
        buttonText: s.buttonText || 'Discover The Collection',
        buttonLink: s.buttonLink || '/shop',
        isActive: s.isActive !== false,
      }));
      const created = await HeroSlide.insertMany(formatted);
      broadcastEvent('HERO_SLIDES_UPDATED', created);
      return res.status(201).json({ success: true, slides: created });
    }
    res.status(400).json({ success: false, message: 'Invalid slides payload' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
