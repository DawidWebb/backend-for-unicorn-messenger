const express = require("express");
const messagesController = require("../controllers/message");

const router = express.Router();

router.get("/", messagesController.getMessages);
router.get("/:value", messagesController.getMessage);
router.post("/", messagesController.postMessage);
router.put("/", messagesController.putMessage);
router.delete("/:id", messagesController.deleteMessage);

router.use((request, response) => response.status(404).end());

module.exports = router;
