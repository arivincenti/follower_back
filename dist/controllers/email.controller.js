"use strict";
const emailController = {};
const { mailjet } = require('../config/config');
// ==================================================
// Get response
// ==================================================
emailController.sendEmail = (email, name, subject, textPart, link) => {
    const request = mailjet
        .post("send", {
        'version': 'v3.1'
    })
        .request({
        "Messages": [{
                "From": {
                    "Email": "arivincenti@gmail.com",
                    "Name": "Ariel"
                },
                "To": [{
                        "Email": email,
                        "Name": name
                    }],
                "Subject": subject,
                "TextPart": textPart,
                "HTMLPart": "<h3>Bienvenido a Follower!</h3><br />Por favor hace click en el enlace para confirmar la invitación y ser parte de una organización.",
                "CustomID": "AppGettingStartedTest"
            }]
    });
    request.then((result) => {
        console.log(result.body);
    }).catch((err) => {
        console.log(err.statusCode);
    });
};
module.exports = emailController;
