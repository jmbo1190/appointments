import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";



describe("Appointment", () => {

    let container;

    beforeEach(() => {
        container = document.createElement("div");
        // document.body.appendChild(container);
        document.body.replaceChildren(container);
    })

    const render = (component) => {
        // using act to wait for asynchronous render() to complete before testing
        act( () => ReactDOM.createRoot(container).render(component) )
    }

    it("renders the customer's first name", () => {
        const customer = { firstName: "Ashley" };
        render( <Appointment customer={ customer } /> );
        expect(document.body.textContent).toContain("Ashley");
    })

    it("renders another customer's first name", () => {
        const customer = { firstName: "Jordan" };
        render( <Appointment customer={ customer } /> );
        expect(document.body.textContent).toContain("Jordan");
    })

    it("renders the customer's last name", () => {
        const customer = { firstName: "Ashley", lastName: "Hamilton" };
        render( <Appointment customer={ customer } /> );
        expect(document.body.textContent).toContain("Hamilton");
    })

    it("renders the customer's phone number", () => {
        const customer = { firstName: "Ashley", lastName: "Hamilton", phoneNumber: "(997) 721-4394" };
        render( <Appointment customer={ customer } /> );
        expect(document.body.textContent).toContain("(997) 721-4394");
    })

    it("renders the stylidt's name", () => {
        const customer = { firstName: "Ashley", lastName: "Hamilton", phoneNumber: "(997) 721-4394" };
        const stylist = "Graham";
        render( <Appointment customer={ customer } stylist={ stylist }/> );
        expect(document.body.textContent).toContain("Graham");
    })

});


describe("AppointmentsDayView", () => {

    let container;

    const today = new Date();
    const twoAppointments = [
            { 
                startsAt: today.setHours(12, 0),
                customer: { 
                    firstName: "Ashley",
                    lastName: "Hamilton",
                    phoneNumber: "(997) 721-4394"
                }
            },
            { 
                startsAt: today.setHours(13, 0),
                customer: { 
                    firstName: "Jordan",
                    lastName: "Figaredo",
                    phoneNumber: "(728) 657-4986"
                }
            }
        ];
        

    beforeEach(() => {
        container = document.createElement("div");
        // document.body.appendChild(container);
        document.body.replaceChildren(container);
    });

    const render = (component) => {
        // using act to wait for asynchronous render() to complete before testing
        act( () => ReactDOM.createRoot(container).render(component) )
    };

    it("renders a <div> with the right ID", () => {
        render(<AppointmentsDayView appointments={ [] }/>);
        expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
    });

    it("renders an <ol> element to display apointments", () => {
        render(<AppointmentsDayView appointments={ [] }/>);
        const listElement = document.querySelector("ol");
        expect(listElement).not.toBeNull();
    });

    it("renders an <li> element for each apointment", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        const listChildren = document.querySelectorAll("ol > li");
        expect(listChildren).toHaveLength(2);
    });

    it("renders the time of each appointment", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        const listChildren = document.querySelectorAll("li");
        expect(listChildren[0].textContent).toEqual("12:00")
        expect(listChildren[1].textContent).toEqual("13:00")
    });

    it("initially displays a message saying there are no appointments today", () => {
        render(<AppointmentsDayView appointments={ [] }/>);
        expect(document.body.textContent).toContain("There are no appointments scheduled for today.");
    });

    it("selects the first appointment by default", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        expect(document.body.textContent).toContain("Ashley");
    });

    it("does not say there are no appointments today when there are appointments", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        expect(document.body.textContent).not.toContain("There are no appointments scheduled for today.");
    });

    it("has a <button> element in each <li>", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        const buttons = document.querySelectorAll("li > button");
        expect(buttons).toHaveLength(2);
        expect(buttons[0].type).toEqual("button");
    });

    it("renders another appointment when selected", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        const button2 = document.querySelectorAll("button")[1];
        act( () => button2.click() );
        expect(document.body.textContent).toContain("Jordan");
    });

    it("renders the selected appointment time in a header component", () => {
        render(<AppointmentsDayView appointments={ twoAppointments }/>);
        const button2 = document.querySelectorAll("button")[1];
        act( () => button2.click() );
        expect(Array.from(document.querySelectorAll(
                    'h1, h2, h3, h4, h5, h6'
                    )).map((element) => element.textContent).join(" ")
            ).toContain("Today's appointment at 13:00");
    });

});

