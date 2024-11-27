import express from 'express';
import { searchLawyers, getLawyerById } from '@/api/lawyers';
import type { SearchFilters } from '@/types';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filters: SearchFilters = {
      expertise: req.query.expertise as string,
      location: req.query.location as string,
      rating: req.query.rating ? Number(req.query.rating) : undefined
    };

    const lawyers = await searchLawyers(filters);
    res.json(lawyers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lawyer = await getLawyerById(Number(req.params.id));
    if (!lawyer) {
      return res.status(404).json({ message: 'Lawyer not found' });
    }
    res.json(lawyer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;