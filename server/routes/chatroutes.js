const express = require("express");

const { protect } = require("../middlewares/authmiddleware");
const { accessChat, fetchChats,createGroupChat,removeFromGroup,renameGroup,addToGroup } = require("../controllers/chatcontrollers");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
// router.get('/bot',)
module.exports = router;