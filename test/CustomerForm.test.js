import React from "react";
import { 
    element, 
    form,
    render,
    initializeReactContainer,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";


describe("CustomerForm", () => {

    const blankCustomer = { firstName: "" };

    beforeEach(() => {
        initializeReactContainer();
    })

    it("renders a form", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(form()).not.toBeNull();
    });

    it("renders the firstName field as a text box", () => {
        render(<CustomerForm original={blankCustomer} />);
        const field = form().elements.firstName;  // among form elements, get the one named firstName
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual("INPUT");
        expect(field.type).toEqual("text");
    });

    it("includes the existing value for the firstName", () => {
        const customer = { firstName: "Ashley" };
        render(<CustomerForm original={ customer } />);
        const field = form().elements.firstName;  // among form elements, get the one named firstName
        expect(field.value).toEqual("Ashley");
    });

});
