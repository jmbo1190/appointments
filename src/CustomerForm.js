import React from "react";

export const CustomerForm = ( { original } ) => {
    return (
    <form>
        <input 
            type="text" 
            name="firstName"
            id="firstName"
            value={ original.firstName} 
            readOnly
        />
        <label htmlFor="firstName" >First name</label>
    </form>
    )
};