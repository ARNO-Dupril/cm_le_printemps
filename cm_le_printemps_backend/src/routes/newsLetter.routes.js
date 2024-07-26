import newsletterController from '../controllers/newsletter.controller.js';
import { Router } from 'express';
const router = Router();

// Routes pour la newsletter
router.post('/add-newsletter', newsletterController.createNewsletter);
router.get('/', newsletterController.getAllNewsletters);
router.get('/:id', newsletterController.getNewsletterById);
router.put('/update-newsletter/:id', newsletterController.updateNewsletter);
router.delete('/delete-newsletter/:id', newsletterController.deleteNewsletter);

// //  routes get
// router.get('all-newsLetters', newsLetterController.allEmail.bind(newsLetterController));

// //  routes post
// router.post('newsLetter', newsLetterController.email.bind(newsLetterController));
// router.post('add-newsLetter', newsLetterController.addEmail.bind(newsLetterController));

export default router;