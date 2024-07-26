import * as contactService from '../services/contact.services.js';

class Contact {

    async createContact (req, res) {
        try {
            const { nom, theme, contenu, email } = req.body;
            const result = await contactService.createContact(nom, theme, contenu, email);
            if (result.success) {
                res.status(201).json({
                message: result.message,
                data: result.data,
            });
            } else {
                res.status(500).json({
                    message: 'Une erreur est survenue lors de la création du contact',
                    error: result.error,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la création du contact',
            });
        }
    };

    async getAllContacts (req, res) {
    try {
        const result = await contactService.getAllContacts();
        if (result.success) {
            res.status(200).json({
                success: true,
                message: `liste des contact effectués`,
                data: result
            });
        } else {
            res.status(500).json({
                message: 'Une erreur est survenue lors de la récupération des contacts',
                error: result.error,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
        message: 'Une erreur est survenue lors de la récupération des contacts',
        });
    }
    };

    async getContactById (req, res) {
        try {
            const result = await contactService.getContactById(req.params.id);
            if (result.success) {
                res.status(200).json(result.data);
            } else {
                res.status(404).json({
                message: result.error.general,
            });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la récupération du contact',
            });
        }
    };

    async updateContact (req, res) {
        try {
            const { id } = req.params;
            const { nom, theme, contenu, email } = req.body;
            const result = await contactService.updateContact(id, { nom, theme, contenu, email });
            if (result.success) {
                res.status(200).json({
                    message: result.message,
                    data: result.data,
                });
            } else {
                res.status(404).json({
                    message: result.error.general,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la mise à jour du contact',
            });
        }
    };
  
    async deleteContact (req, res) {
        try {
            const { id } = req.params;
            const result = await contactService.deleteContact(id);
            if (result.success) {
                res.status(200).json({
                    message: result.message,
                });
            } else {
                res.status(404).json({
                    message: result.error.general,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: 'Une erreur est survenue lors de la suppression du contact',
            });
        }
    };
}

const contactController = new Contact();
export default contactController;