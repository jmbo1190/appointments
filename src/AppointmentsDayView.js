import React, { useState } from 'react';

export const Appointment = ( { customer, stylist, service, notes } ) => ( 
    // <div> 
        <table>
            <tbody>
            <tr>
                <td>Customer</td><td>{ `${customer.firstName} ${customer.lastName}` }</td>
            </tr>
            <tr>
                <td>Phone number</td><td>{ customer.phoneNumber }</td>
            </tr>
            <tr>
                <td>Stylist</td><td>{ stylist }</td>
            </tr>
            <tr>
                <td>Service</td><td>{ service }</td>
            </tr>
            <tr>
                <td>Notes</td><td>{ notes }</td>
            </tr>
            </tbody>
        </table>
    // </div> 
    ) ;

const appointmentTimeOfDay = ( startsAt ) => {
    const [h, m] = new Date(startsAt).toTimeString().split(":");
    return `${h}:${m}`;
}

export const AppointmentsDayView = ( { appointments } ) => {
    const [selectedAppointment, setSelectedAppointment] = useState(0);
    return (
        <div id="appointmentsDayView">
            <ol>
                { appointments.map((appointment, index) => (
                    <li key={appointment.startsAt}>
                        <button type="button" onClick={() => setSelectedAppointment(index) }>
                            {appointmentTimeOfDay(appointment.startsAt)}
                        </button>
                    </li>
                )) }
            </ol>
            { appointments.length ? (
                    <>
                    <h1>Today's appointment at {appointmentTimeOfDay(appointments[selectedAppointment].startsAt)}</h1>
                    <Appointment {...appointments[selectedAppointment]}/>
                    </>
                )
                :
                <p>There are no appointments scheduled for today.</p>
            }
        </div>
    );
};
