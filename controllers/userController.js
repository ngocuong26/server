const Users = require("../modules/user");

class UserController {
    async deleteUser(req, res) {
        const id_user = req.query.Id;
        const user = await Users.findByIdAndDelete({_id: id_user});
        
    }
}

module.exports = new UserController();