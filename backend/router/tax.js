import express from 'express';
import {
  createTaxRecord,
  getAllTaxRecords,
  getTaxRecordById,
  updateTaxRecord,
  deleteTaxRecord,
} from '../controller/taxController.js';

const router = express.Router();

router.post('/', createTaxRecord);
router.get('/', getAllTaxRecords);
router.get('/:id', getTaxRecordById);
router.put('/:id', updateTaxRecord);
router.delete('/:id', deleteTaxRecord);

export default router;