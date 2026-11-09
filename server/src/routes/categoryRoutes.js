import express from 'express';
import { Category } from '../models/Category.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/categories (Retrieve active categories)
router.get('/', async (req, res) => {
  try {
    const { homeOnly } = req.query;
    let filter = { isActive: true };
    if (homeOnly === 'true') {
      filter.showOnHome = true;
    }

    const categories = await Category.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    res.json({ success: true, count: categories.length, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route GET /api/categories/:slug (Retrieve category by URL slug)
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      isActive: true,
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST /api/categories (Create category - Admin protected)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, slug, description, image, isActive, showOnHome, sortOrder } = req.body;

    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const category = await Category.create({
      name,
      slug: categorySlug,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      showOnHome: showOnHome !== undefined ? showOnHome : true,
      sortOrder: sortOrder || 0,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route PATCH /api/categories/:id (Update/Deactivate category - Admin protected)
router.patch('/:id', protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route DELETE /api/categories/:id (Soft-deactivate/Remove category - Admin protected)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    // Soft deactivate to preserve historic records
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false, showOnHome: false },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, message: 'Category deactivated successfully', category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
