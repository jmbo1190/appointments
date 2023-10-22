import React, { useState } from "react";

export const CustomerForm = ( { original, onSubmit } ) => {
    const [ customer, setCustomer ] = useState(original);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(customer);
    };

    // const handleChangeFirstName = ({ target }) =>
    //     setCustomer( (customer) => ({ ...customer, firstName: target.value }) );

    // const handleChangeLastName = ({ target }) =>
    //     setCustomer( (customer) => ({ ...customer, lastName: target.value }) );

    // const handleChangePhoneNumber = ({ target }) =>
    //     setCustomer( (customer) => ({ ...customer, phoneNumber: target.value }) );

    const handleChangeField = ({ target }) =>
        setCustomer( (customer) => ({ ...customer, [target.name]: target.value }) );

    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="firstName"
                id="firstName"
                value={customer.firstName} 
                onChange={handleChangeField}
            />
            <label htmlFor="firstName" >First name</label>
            <input 
                type="text" 
                name="lastName"
                id="lastName"
                value={customer.lastName} 
                onChange={handleChangeField}
            />
            <label htmlFor="lastName" >Last name</label>
            <input 
                type="text" 
                name="phoneNumber"
                id="phoneNumber"
                value={customer.phoneNumber} 
                onChange={handleChangeField}
            />
            <label htmlFor="phoneNumber" >Phone number</label>
            <input type="submit" value="Add" />
        </form>
        );
};