const mongoose = require("mongoose");
const { resConst, logger } = require('../../utility/utility-functions');
require('dotenv').config();

logger.info(`${resConst.ENTRY_LEVEL_LOG} - ${resConst.DATABASE} - dbConnection`);
const conn = mongoose.connect(process.env.DB_URL)
    .then(() => {
        logger.info(`${resConst.SUCCESS_LEVEL_LOG} - ${resConst.DATABASE} - dbConnection`);
    })
    .catch((err) => {
        logger.error(`${resConst.ERROR_LEVEL_LOG} - ${resConst.DATABASE} - dbConnection`);
    })
