import express from 'express';
import contactController from '../controllers/contact.controller.js';

const router = express.Router();

// Route pour créer un nouveau contact
router.post('/add-contact', contactController.createContact);

// Route pour récupérer tous les contacts
router.get('/', contactController.getAllContacts);

// Route pour récupérer un contact par son ID
router.get('/:id', contactController.getContactById);

// Route pour mettre à jour un contact
router.put('/update-contact/:id', contactController.updateContact);

// Route pour supprimer un contact
router.delete('/delete-contact/:id', contactController.deleteContact);

export default router;