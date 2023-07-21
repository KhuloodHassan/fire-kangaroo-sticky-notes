const User = require("../models/User");
const StickyNote = require("../models/StickyNote");

module.exports = {
    notes: async(req, res) => {
        let notes = await StickyNote
            .find({ user: req.session.passport.user })
            .select(["title", "text"])
        console.log(notes)
        res.json(notes)
    },

    add: async(req, res) => {
        let user_id = req.body.user_id;

        try {
            let user = await User.findById(user_id);
            let note = await StickyNote.create({
                user: user,
                title: req.body?.title,
                text: req.body?.text,
            })
            res.json({ "success": true })
        } catch (err) {
            console.log(`User: ${user_id} does not exist`, err)
            res.json({ "success": false })
        }
    },

    edit: async(req, res) => {
        try {
            await StickyNote.findOneAndUpdate({ _id: req.body.note_id }, {
                title: req.body.title,
                text: req.body.text
            }, { new: true })
            res.json({ "success": true })
            
        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    },

    delete: async(req, res) => {
        try {
            await StickyNote.findOneAndDelete({ _id: req.body._id })
            res.json({ "success": true })
        } catch (err) {
            console.log(err)
            res.json({ "success": false })
        }
    }
}