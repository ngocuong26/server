const Contact = require("../modules/contact");

class ContactController {
    async contactCreate(req, res) {
        const id_user = req.session.user.id;

        console.log('id user: ',id_user);

        const {name, email, title, contact} = req.body;

        const newContact = await Contact.create({
            id_user: id_user,
            name_user: name,
            email: email,
            title: title,
            contact: contact,
            status: 'pending',
            refly: ''
        })

        console.log(newContact);
        

        res.json('Đã gửi yêu cầu')
        
    }

    async contactPending(req, res) {
        const contact = await Contact.find({status: 'pending'});

        res.json(contact);
    }

    async contactreflied(req, res) {
        const contact = await Contact.find({status: 'reflied'});

        res.json(contact);
    }

    async contactRefly(req, res) {
        const refly = req.body.refly;
        const id = req.query.id;

        const contact = await Contact.findById({_id: id});
        contact.refly = refly;
        contact.status = 'reflied';
        await contact.save();

        res.json('Đã phản hồi');
    }
}

module.exports = new ContactController();