import * as FV from './formValidations';

describe("Form Validations", () => {
    it("Checks if a required field has a value", () => {
        expect(FV.required("a")).toBe(undefined);
        expect(FV.required( undefined )).toBe('Required');
    })

    it("Checks if an array field is empty", () => {
        expect(FV.arrayNotEmpty(["a"])).toBe(undefined);
        expect(FV.arrayNotEmpty(undefined)).toBe("Required");
    })

    it("Checks valid urls", () => {
        expect(FV.validUrl("https://abc.com/def")).toBe(undefined);
        expect(FV.validUrl("http://abc.com/def")).toBe(undefined);
        expect(FV.validUrl("abc.com")).toBe("Must be a valid url");
        expect(FV.validUrl("abc")).toBe("Must be a valid url");
        expect(FV.validUrl(undefined)).toBe("Must be a valid url");
    })
})
