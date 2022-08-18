const { createContactService, updateContactService, deleteContactService, getContactService } = require("../services/contactService");

async function createContactController(req, res, next) {
    try {
        const { first_name, last_name, email, phone_number, data_store } = req.body;
        let response = await createContactService(first_name, last_name, email, phone_number, data_store);
        return res.json({
            message: "success",
            response: response
        })
    } catch(err) {
        return res.json({
            message: "error",
            detail: err.message
        })
    }
}

async function updateContactController(req, res, next) {
    try {
        const { contact_id, email, phone_number, data_store } = req.body;
        let response = await updateContactService(contact_id, email, phone_number, data_store);
        return res.json({
            message: "success",
            response: response
        })
    } catch(err) {
        return res.json({
            message: "error",
            detail: err.message
        })
    }
}

async function deleteContactController(req, res, next) {
    try {
        const { contact_id, data_store } = req.body;
        let response = await deleteContactService(contact_id, data_store);
        return res.json({
            message: "success",
            response: response
        })
    } catch(err) {
        return res.json({
            message: "error",
            detail: err.message
        })
    }
}

async function getContactController(req, res, next) {
    try {
        const { contact_id, data_store } = req.query;
        let response = await getContactService(contact_id, data_store);
        return res.json({
            message: "success",
            response: response
        })
    } catch(err) {
        return res.json({
            message: "error",
            detail: err.message
        })
    }
}

module.exports = { createContactController, updateContactController, deleteContactController, getContactController }