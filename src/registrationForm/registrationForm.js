import React, { Component } from "react";

class registrationForm extends Component {
  //Event object way
  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const password = event.target.password.value;
    console.log("Name:", name);
    console.log("Password:", password);
  }

  //Using ref way
  /*
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }
  //inside input
  <input 
  ref={this.nameInput}
  />

  //handleSubmit()
  handleSubmit(event) {
    event.preventDefault();
    const name = this.nameInput.current.value;
    console.log('Name:', name);
  }
  */

  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Register</h2>
        <div className="registration__hint">* required field</div>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="registration__control"
            name="name"
            id="name"
            defaultValue="Frank"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            className="registration__control"
            name="password"
            id="password"
          />
          <div className="registration__hint">
            6 to 72 characters, must include a number
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password *</label>
          <input
            type="password"
            className="registration__control"
            name="repeatPassword"
            id="repeatPassword"
          />
        </div>

        <div className="registration__button__group">
          <button type="reset" className="registration__button">
            Cancel
          </button>
          <button type="submit" className="registration__button">
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default registrationForm;

/*Controlled vs Uncontrolled components ====== */
/*Uncontrolled registration form */

//Setting up:
//Rendered simple form with 3 inputs
//Added handle submit method
//Added event listener to invoke method on form submit

//How to get access to the values on form:
//Need a way to reference form inputs
//1/2 ways = using an event obkect or special attribute ref (React provides this & can be use for this purpose)

//How to use event object: (Lines: 6-9)
//1st access <form> elements (store in e.target)
//Then access individual inputs by name or id through form itself
//Update handlesubmit method to see value entered in name + password inputs

//How to acieve the same thins using a ref: (Lines: 13-30)
//1st a ref must be created with React.createRef() method
//Then attached to the input element using the ref attribute
//Add a constructor to registration form
//And create a ref for the same name input

/*Default values ======== */
//Sometimes its necessary to set a default value on an input
//This value will essentially pre-poulate the fiel with something useful
//And still allow user to change value if they wish

//Setting a value on the input element:
//You can set a value on the input
//But if you try to type into the field row = it doesn't accept any changes
//Because React tries to render the UI to reflect the state
//But it doesn't know about the typing of the user
//Solution: defaultValue attribute
//Now the form is populated with a value & changes are allowed

//Refs may be created for each of the input on the form
//Now possible to perfomr some validation on form values & submit
//In example: state of these inputs are managed in DOM rather than React
//Fairly simple way to implement a form (but is limited)
//If you need to integrate with some other library then this approach may be nescessary

//A few things we can't do with this approach:
/*
- instant field level validation (validate as you type)
- enforcing input formats (need a date or # written in specfic a way)
- combining inputs into 1pc of data such as double select, for instance, select your state then your city
- conditionally disabling the submit button until form is valid
*/
