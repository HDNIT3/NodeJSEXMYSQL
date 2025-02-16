class ErrorResponse extends Error {
    constructor(StatusCode,message){
        super(message);
        this.StatusCode = StatusCode;
    }
}

module.exports = ErrorResponse