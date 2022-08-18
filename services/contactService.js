const axios = require("axios");
const BASE_URL = process.env.CRM_URL;
const TOKEN = process.env.TOKEN;

async function createContactService(first_name, last_name, email, phone_number, data_store) {

    //#region data_validation
    if(typeof(first_name) != 'string' || first_name == null || first_name.length == 0) {
        throw new Error("Invalid first_name");
    }

    if(typeof(last_name) != 'string' || last_name == null || last_name.length == 0) {
        throw new Error("Invalid last_name");
    }

    if(typeof(email) != 'string' || email == null || email.length == 0) {
        throw new Error("Invalid email");
    }

    if(typeof(phone_number) != 'number' || phone_number == null || phone_number.toString().length != 10) {
        throw new Error("Invalid phone_number");
    }
    //#endregion end data_validation

    if(data_store == 1) {
        const response = await axios({
            method: 'post',
            url: BASE_URL,
            data: {
                'contact': {
                    'first_name': first_name,
                    'last_name': last_name,
                    'mobile_number': phone_number,
                    'email': email
                }
            },
            headers: {'Authorization': `Token token=${TOKEN}`}
          });
        return response["data"]["contact"];
    } else {
        return "data store type not supported"
    }
}

async function updateContactService(contact_id, email, phone_number, data_store) {

    //#region data_validation
    let updationObject = {};
    if(typeof(contact_id) != 'string' || contact_id == null || contact_id.length == 0) {
        throw new Error("Invalid contact_id");
    }

    if(typeof(email) == 'string' && email != null && email.length != 0) {
        updationObject = {
            'contact': {
                'email': email
            }
        };
    }

    if(typeof(phone_number) == 'number' || phone_number != null || phone_number.toString().length == 10) {
        updationObject = {
            'contact': {
                'mobile_number': phone_number
            }
        };
    }
    //#endregion data_validation

    if(data_store == 1) {
        const response = await axios({
            method: 'put',
            url: `${BASE_URL}/${contact_id}`,
            data: updationObject,
            headers: {'Authorization': `Token token=${TOKEN}`}
          });
        return response["data"]["contact"];
    } else {
        return "data store type not supported"
    }
}

async function deleteContactService(contact_id, data_store) {

    //#region data_validation
    if(typeof(contact_id) != 'string' || contact_id == null || contact_id.length == 0) {
        throw new Error("Invalid contact_id");
    }
    //#endregion data_validation

    if(data_store == 1) {
        const response = await axios({
            method: 'delete',
            url: `${BASE_URL}/${contact_id}`,
            headers: {'Authorization': `Token token=${TOKEN}`}
          });
        return response["data"];
    } else {
        return "data store type not supported"
    }
    
}

async function getContactService(contact_id, data_store) {

    //#region data_validation
    if(typeof(contact_id) != 'string' || contact_id == null || contact_id.length == 0) {
        throw new Error("Invalid contact_id");
    }
    //#endregion data_validation

    if(data_store == 1) {
        const response = await axios.get(`${BASE_URL}/${contact_id}`, {
            headers: {
                'Authorization': `Token token=${TOKEN}`
            }
        })
        return response["data"]["contact"];
    } else {
        return "data store type not supported"
    }
}

module.exports = { createContactService, updateContactService, deleteContactService, getContactService }