import React from "react";
import { 
    element, 
    form,
    field,
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
        // const field = form().elements.firstName;  // among form elements, get the one named firstName
        expect(field("firstName")).not.toBeNull();
        expect(field("firstName").tagName).toEqual("INPUT");
        expect(field("firstName").type).toEqual("text");
    });

    it("includes the existing value for the firstName", () => {
        const customer = { firstName: "Ashley" };
        render(<CustomerForm original={ customer } />);
        expect(field("firstName").value).toEqual("Ashley");
    });

    it("renders a label for the firstName field", () => {
        render(<CustomerForm original={blankCustomer} />);
        const label = element("label[for=firstName]");
        expect(label).not.toBeNull();
    });

    it("renders 'First name' as the first name label content", () => {
        render(<CustomerForm original={blankCustomer} />);
        const label = element("label[for=firstName]");
        expect(label).toContainText("First name");
    });

});
