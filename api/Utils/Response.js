// utils/Response.js
const config = require("../config")

const i18n = new (require("../lib/i18n"))(config.DEFAULT_LANG)


class Response {
    static successResponse(data) {
        return {
            success: true,
            code: 200,
            message: 'Request successful',
            data: data
        };
    }

    static errorResponse(error,lang) {
        if(error.message.includes("E11000")){
            return {
                success: false,
                code: error.status || 500,
                message: i18n.translate("COMMON.ALREADY_EXIST",lang),
            };
        }else{
        return {
            success: false,
            code: error.status || 500,
            message: i18n.translate("COMMON.INTERNAL_SERVER_ERROR",lang),
        };
    }
    }
}



module.exports = Response;
