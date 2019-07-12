module.exports = {
    dragonTreasure: async (req, res) => {
        let db = req.app.get('db')
        let treasure = await db.get_dragon_treasure(1)
        return res.status(200).send(treasure)
    },
    getUserTreasure: async (req, res) => {
        let db = req.app.get('db')
        let userTreasure = await db.get_user_treasure(req.session.user.id)
        return res.status(200).send(userTreasure)
    }
}