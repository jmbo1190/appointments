import React from "react";
import { 
    element, 
    form,
    field,
    render,
    click,
    submit,
    submitButton,
    change,
    initializeReactContainer,
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";


describe("CustomerForm", () => {

    const blankCustomer = { firstName: "", lastName: "", phoneNumber: "" };

    beforeEach(() => {
        initializeReactContainer();
    });

    const itRendersAsATextBox = (fieldName) => {
        it("renders as a text box", () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(field(fieldName)).not.toBeNull();
            expect(field(fieldName).tagName).toEqual("INPUT");
            expect(field(fieldName).type).toEqual("text");
        });    
    };

    const itIncludesTheExistingValue = (fieldName, existingValue) => {
        it("includes the existing value", () => {
            const customer = { [fieldName]: existingValue };
            render(<CustomerForm original={ customer } />);
            expect(field(fieldName).value).toEqual(existingValue);
        });
    };

    const itRendersALabel = (fieldName, labelText) => {
        it("renders a label for the field", () => {
            render(<CustomerForm original={blankCustomer} />);
            const label = element(`label[for=${fieldName}]`);
            expect(label).not.toBeNull();
        });

        it("renders the label content", () => {
            render(<CustomerForm original={blankCustomer} />);
            const label = element(`label[for=${fieldName}]`);
            expect(label).toContainText(labelText);
        });
    };

    const itAssignsAnIdThatMatchesTheLabelId = ( fieldName ) => {
        it("assigns an id that matches the label id", () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(field(fieldName).id).toEqual(fieldName);
        });    
    };

    const itSubmitsExistingValue = (fieldName, value) => {
        it("saves existing value when submitted", () => {
            expect.hasAssertions();

            const customer = { [fieldName]: value };
            // The Arrange phase is the render call 
            render(
                <CustomerForm
                    original={customer}
                    // the Assert phase is the onSubmit handler
                    onSubmit={ (props) => expect(props[fieldName]).toEqual(value) }
                />
            );
            // The Act phase:
            const button = element("input[type=submit]");
            click(button);
            //  If we did not use hasAssertions, this test would pass just by never calling onSubmit.
        });    
    };

    const itSubmitsNewValue = (fieldName, value) => {
        it("saves new value when submitted", () => {
            expect.hasAssertions();
            render(
            <CustomerForm
                original={blankCustomer}
                onSubmit={ ( props ) => expect(props[fieldName]).toEqual(value) }
            />
            );
            change(field(fieldName), value);
            click(submitButton());
        });    
    };
    


    it("renders a form", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(form()).not.toBeNull();
    });

    describe("the firstName field", () => {

        itRendersAsATextBox("firstName");
        itIncludesTheExistingValue("firstName", "Ashley");
        itRendersALabel("firstName", "First name");
        itAssignsAnIdThatMatchesTheLabelId("firstName");
        itSubmitsExistingValue("firstName", "Ashley");
        itSubmitsNewValue("firstName", "Jamie");

    });

    describe("the lastName field", () => {

        itRendersAsATextBox("lastName");
        itIncludesTheExistingValue("lastName", "Jones");
        itRendersALabel("lastName", "Last name");
        itAssignsAnIdThatMatchesTheLabelId("lastName");
        itSubmitsExistingValue("lastName", "Jones");
        itSubmitsNewValue("lastName", "Smith");

    });

    it("prevents the default action when submitting the form", () => {
        render(
          <CustomerForm
            original={blankCustomer}
            onSubmit={() => {}}
          />
        );
        const event = submit(form());
        expect(event.defaultPrevented).toBe(true);
    });


    it("renders a submit button", () => {
        render(<CustomerForm original={blankCustomer} />);
        // const button = element("input[type=submit]");
        expect(submitButton()).not.toBeNull();
    });


});
