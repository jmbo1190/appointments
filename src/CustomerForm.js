import React from "react";

export const CustomerForm = ( { original } ) => {
    return (
    <form>
        <input 
            type="text" 
            name="firstName"
            value={ original.firstName} 
            readOnly
        />
        <label htmlFor="firstName" />
    </form>
    )
};