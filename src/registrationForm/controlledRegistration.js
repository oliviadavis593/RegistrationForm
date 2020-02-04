import React, { Component } from "react";
import ValidationError from "./validationError";

class controlledRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      },
      repeatPassword: {
        value: "",
        touched: false
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, password, repeatPassword } = this.state;
    console.log("Name:", name.value);
    console.log("Password:", password.value);
    console.log("Repeat Password:", repeatPassword.value);
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword: { value: repeatPassword, touched: true } });
  }

  validateName(fieldValue) {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    } else if (password.legnth < 6 || password.length > 72) {
      return "Password must be between 6 and 72 characters long";
    } else if (!password.match(/[0-9]/)) {
      return "Password must contain at least one number";
    }
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();

    if (repeatPassword !== password) {
      return "Passwords do not match";
    }
  }

  render() {
    const nameError = this.validateName();
    const passwordError = this.validatePassword();
    const repeatPasswordError = this.validateRepeatPassword();
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
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.name.touch && <ValidationError message={nameError} />}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            className="registration__control"
            name="password"
            id="password"
            onChange={e => this.updatePassword(e.target.value)}
          />
          {this.state.password.touch && (
            <ValidationError message={passwordError} />
          )}
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
            onChange={e => this.updateRepeatPassword(e.target.value)}
          />
          {this.state.repeatPassword.touch && (
            <ValidationError message={repeatPasswordError} />
          )}
        </div>

        <div className="registration__button__group">
          <button type="reset" className="registration__button">
            Cancel
          </button>
          <button
            type="submit"
            className="registration__button"
            disabled={
              this.validateName() ||
              this.validatePassword() ||
              this.validateRepeatPassword()
            }
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

export default controlledRegistration;

/*Controlled vs. Uncontrolled components */
/*Controlled registration form */

//In CC state is handled in React rather than in the DOM
//Means values on the form must be stored in the state
//As they change - state must be updated to reflect the change
//Since values are in state - we can use those values to perform validation

//The process:
/*
- User types in the input
- onChange event triggered
- onChange listener takes the value (event.target.value) 
- .. And updates state (this.setState({value: event.target.value}))
- Re-render is triggered by state update
- Component is rendered with value from state
 */

//Steps:
//Initializing state to store form values (Lines: 4-17 )
//Create handlers to update these state properties (Lines: 19-29)
//Add event listeners to inputs themselves (Lines: 44, 54, 67)
//In ReactDevTools - should be able to see changes in state while typing
//create hanleSubmit() method to grab th values from state instead (Lines: 19-25)
//Aren't doing anything new that wasn't donw previously
//Difference: we are managing state of the form in React

/*Validate the form ===== */

//What we'll need
/*
- some validation functions (logic that determines if a vlaue meets criteria or not)
- some way to display validation messages
*/

//Validation functions
//Many ways to write a method to perform validation of user input (can get fairly complex)

//Step #1: (Name validation) (Lines: 39-46)
//1st method - validated name (is required field)
//We start by checking that the value entered is not just blank or made up of white space
//Ensure that the name is at least 3 characters long
//Method will return a string if field doesn't meet criteria or defined otherwise

//Step #2: (Password & repeatPassword validation)
// password validation (Lines: 49-57):
//Use of regEx to check if password contains at least 1 #
//Tons of debates about regex approach even on this simple problem
// repeatPassword validation (Lines: 59-56):

//Displaying validation messages (1):
//It requires a conditional statement
//We could move that lofic into its own component
//controlledRegistartion.js ===> ValidationError.js

//Displaying validation message (3):
//Added components directly under respective inputs (Lines: 84, 95, 109)
//Problem: When running code - validation messages auto populate even before user has typed anything
//Solution:
//Add booleans to state (Lines: 10,14,18)
//Which show whether the user has typed anything into each field
//Then update state setting methods to switch the touched boolean from false to true (Lines:32, 36, 40)
//Then conditionally render ValidationError comp - depending on whether field has been changed by the user (Lines: 90, 101-103, 117-119)
//Also make sure to add variable for each of the validate methods (Lines: 73-75)

//Enable or disable Save button (Lines: 129-133)

//Note:
//Validation itself can be very involved at times
//There are several good validation libraries available
//This was an excercise to create out own validation
// & how React facilitates this interaction

//OVERVIEW:
//Uncontrolled components:
//are fine for simple, quick solutions without too much interactivity
//Controlled componentes:
// are better when the interaction becomes more complex
//CC has its state managed within React
//Since managing state is difficult
//..having a single source of truth such as the React state = benefit to this approach
