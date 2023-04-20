const registerModel = require('../models/registeration')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { responseGenrator, resConst, logger } = require('../utility/utility-functions');

module.exports = {
    saveNewUser: saveNewUser,
    loginUser: loginUser,
}

function saveNewUser(req, res) {
    logger.info(`${resConst.ENTRY_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
    return new Promise(async (resolve, reject) => {
        const { user_name, email, password } = req.body
        await registerModel.findOne({ email })
            .then(user => {
                if (user) {
                    logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
                    reject(responseGenrator(resConst.INCORRECT_CONTENT, resConst.INALID_EMAIL, null, resConst.ERROR_MSG));
                }

                bcrypt.hash(password, 10, (err, pass) => {
                    if (err) {
                        logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
                        reject(responseGenrator(resConst.INCORRECT_CONTENT, resConst.SOMETHING_WENT_WRONG, null, resConst.ERROR_MSG));
                    }
                    else {
                        var userdata = new registerModel({
                            user_name: user_name,
                            email: email,
                            password: pass,
                        });

                        userdata
                            .save()
                            .then((data) => {
                                logger.info(`${resConst.SUCCESS_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
                                resolve(responseGenrator(resConst.OK, null, data, resConst.SUCCESS_MSG));
                            })
                            .catch((err) => {
                                logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
                                reject(responseGenrator(resConst.SERVER_ERROR, resConst.SERVER_ERROR_MSG, null, resConst.ERROR_MSG));
                            });
                    }
                })

            })
            .catch((err) => {
                logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.SERVICE} - saveNewUser`);
                reject(responseGenrator(resConst.SERVER_ERROR, resConst.SERVER_ERROR_MSG, null, resConst.ERROR_MSG));
            });
    })
}

function loginUser(req, res) {
    logger.info(`${resConst.ENTRY_LEVEL_LOG} - ${resConst.CONTROLLER} - loginUser`);
    return new Promise((resolve, reject) => {
        var email = req.body.email;
        var password = req.body.password;

        registerModel.find({ email })
            .then(data => {
                if (data.length == 0) {
                    logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.CONTROLLER} - loginUser`);  
                    reject(responseGenrator(resConst.INCORRECT_CONTENT, resConst.INVALID_CREDENTIALS, null, resConst.ERROR_MSG));
                } else {
                    bcrypt.compare(password, data[0].password, (err, result) => {
                        if (err || !result) {
                            logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.CONTROLLER} - loginUser`);  
                            reject(responseGenrator(resConst.INCORRECT_CONTENT, resConst.INVALID_CREDENTIALS, null, resConst.ERROR_MSG));
                        }

                        var token = jwt.sign({ id: data[0]._id }, "Keyur5123");
                        logger.info(`${resConst.SUCCESS_LEVEL_LOG} - ${resConst.CONTROLLER} - loginUser`);
                        resolve(responseGenrator(resConst.OK, null, token, resConst.SUCCESS_MSG));
                    });
                }
            })
            .catch((err) => {
                logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.CONTROLLER} - loginUser`);  
                reject(responseGenrator(resConst.SERVER_ERROR, resConst.SERVER_ERROR_MSG, null, resConst.ERROR_MSG));
            });
    })

};