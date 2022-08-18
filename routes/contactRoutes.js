const express = require("express");
const contactRouter = express.Router();
const { createContactController, 
    updateContactController, 
    deleteContactController, 
    getContactController } = require("../controllers/contactController");

contactRouter.get("/", (req, res, next) => {
    res.json("OK")
});

contactRouter.post("/create", (req, res, next) => createContactController(req, res, next));
contactRouter.post("/update", (req, res, next) => updateContactController(req, res, next));
contactRouter.get("/get", (req, res, next) => getContactController(req, res, next));
contactRouter.post("/delete", (req, res, next) => deleteContactController(req, res, next));

module.exports = contactRouter;