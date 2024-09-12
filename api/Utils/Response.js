// utils/Response.js
class Response {
    static successResponse(data) {
        return {
            success: true,
            code: 200,
            message: 'Request successful',
            data: data
        };
    }

    static errorResponse(error) {
        if(error.message.includes("E11000")){
            return {
                success: false,
                code: error.status || 500,
                message: "Bu kullanıcı rolü zaten kayıtlı.",
            };
        }else{
        return {
            success: false,
            code: error.status || 500,
            message: error.message || 'Internal Server Error',
        };
    }
    }
}

module.exports = Response;
