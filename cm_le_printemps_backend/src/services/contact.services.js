import * as contactModel from '../models/contact.model.js';

export async function createContact(nom, theme, contenu, email) {
  try {
    const newContact = new contactModel.Contact({
      nom,
      theme,
      contenu,
      email,
    });
    await newContact.save();
    return {
      success: true,
      message: 'Contact créé avec succès',
      data: newContact,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la création du contact',
      },
    };
  }
}

export async function getAllContacts() {
  try {
    const contacts = await contactModel.Contact.find();
    return {
      success: true,
      data: contacts,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la récupération des contacts',
      },
    };
  }
}

export async function getContactById(id) {
  try {
    const contact = await contactModel.Contact.findById(id);
    if (!contact) {
      return {
        success: false,
        error: {
          general: 'Contact non trouvé',
        },
      };
    }
    return {
      success: true,
      data: contact,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: {
        general: 'Une erreur est survenue lors de la récupération du contact',
      },
    };
  }
}

export const updateContact = async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, theme, contenu, email } = req.body;
      const result = await contactModel.Contact.updateContact(id, { nom, theme, contenu, email });
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
  
  export const deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await contactModel.Contact.deleteContact(id);
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