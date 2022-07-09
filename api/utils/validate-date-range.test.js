const validateDateRange = require("./validate-date-range");

describe('validateDateRange', () => {
    it("should return 'true' if range is less than 365 days", () => {
        expect(validateDateRange({ fromDate: "2022-01-01", toDate: "2022-12-31" })).toBe(true);
    });

    it("should return 'false' if range is more than 365 days", () => {
        expect(validateDateRange({ fromDate: "2021-01-01", toDate: "2022-12-31" })).toBe(false);
    });
});