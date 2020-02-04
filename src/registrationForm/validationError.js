import React from "react";

export default function ValidationError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }
  return <></>;
}

//Displaying validation message (2) (continuation):
//Accepts a property called message
//Which contains the validation message to be displayed
//If message is a string, display message - oterwise return empty fragment

//How to use new component:
//Import component into controlledRegistration.js
//Place it directly below the input element
//validationError ===> controlledRegistration.js
