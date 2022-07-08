class BadRequestError extends Error {
    constructor(message) {
        super(message || "Bad Request");
        this.name = "BadRequestError";
        this.status = 400;
    }
}

module.exports = BadRequestError;