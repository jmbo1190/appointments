import React from "react";
import { 
    element, 
    form,
    render,
    initializeReactContainer,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";


describe("CustomerForm", () => {

    beforeEach(() => {
        initializeReactContainer();
    })

    it("renders a form", () => {
        render(<CustomerForm />);
        expect(form()).not.toBeNull();
    });

    it("renders the firstName field as a text box", () => {
        render(<CustomerForm />);
        const field = form().elements.firstName;  // among form elements, get the one named firstName
        expect(field).not.toBeNull();
        expect(field.tagName).toEqual("INPUT");
        expect(field.type).toEqual("text");
    });

});
