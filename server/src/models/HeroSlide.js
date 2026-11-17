import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema(
  {
    slideId: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    wideImage: {
      type: String,
      default: '',
    },
    badgeText: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: 'Discover The Collection',
    },
    buttonLink: {
      type: String,
      default: '/shop',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HeroSlide = mongoose.model('HeroSlide', heroSlideSchema);
