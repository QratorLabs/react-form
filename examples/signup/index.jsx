import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { 
  Form, Error, Button, Collection, CheckboxControl,
  InputControl, RadioControl, SelectControl, TextareaControl
} from '../../src';

let minLen6 = val => val.length >= 6;
let notEmptyText = val => val.trim().length;
let isTrue = val => Boolean(val);
let confirmPassword = (val, data) => {
  return val == data['password'];
};

class Signup extends React.Component {
  handleSubmit(data) {
    if (data.login == 'test@test.com') {
      this._error.show();
    } else {
      console.log(data);
    }
  }
  render() {
    let minLenMsg = 'Should be 6 character at least',
        requiredMsg = 'Required filed';
    let loginValidators = [
      {msg: requiredMsg, f: notEmptyText, name: 'required'},
      {msg: minLenMsg, f: minLen6, name: 'min_len'},
    ],
    passwordValidators = [
      {msg: requiredMsg, f: notEmptyText, name: 'required'},
      {msg: minLenMsg, f: minLen6, name: 'min_len'},
    ],
    confirmPasswordValidators = [{
      msg: 'Passwords didn\'t match', f: confirmPassword, name: 'confirm',
    }],
    privacyPolicyValidators = [{
      name: 'checked', msg: 'You must accept privacy policy', f: isTrue
    }],
    aboutValidators = [{ name: 'about', msg: requiredMsg, f: notEmptyText }];
    return (
      <Form onSubmit={::this.handleSubmit}>
        <h4>Signup form</h4>

        <Error ref={el => this._error = el}>Error</Error>

        <InputControl
            name='login'
            placeholder='Login'
            validators={loginValidators}/>
        <br/>
        <InputControl
            name='password'
            placeholder='password'
            type='password'
            validators={passwordValidators}/>
        <br/>
        <InputControl
            name='repeat_password'
            placeholder='Repeat password'
            type='password'
            validators={confirmPasswordValidators}/>
        <br/>
        
        <CheckboxControl 
            name='privacy_policy'
            id='privacy_policy'
            validators={privacyPolicyValidators}>
          <label htmlFor='privacy_policy'>Accept privacy policy</label>
        </CheckboxControl>
        <br/>

        <TextareaControl
            name='about'
            placeholder='Tell us about yourself'
            validators={aboutValidators}/>
        <br/>

        <fieldset>
          <legend>Your age</legend>
          <SelectControl name='age'>
            <option value="0">Under 18</option>
            <option value="1">Over 18</option>
          </SelectControl>
          <br/>
        </fieldset><br/>

        <fieldset>
          <legend>Your hobbies</legend>
          <Collection
              ref={el => this._collection = el}
              name='hobby'
              initialValue={['']}
              component={props => <InputControl placeholder='Your hobby'/>}/>
          <br/>
          <button type="button" onClick={() => this._collection.addValue('')}>Add</button>
        </fieldset><br/>

        <fieldset>
          <legend>Gender</legend>
          <RadioControl id='gender-male' name='gender' value='male' >
            <label htmlFor='gender-male'>Male</label>
          </RadioControl>
          <RadioControl id='gender-female' name='gender' value='female'>
            <label htmlFor='gender-female'>Female</label>
          </RadioControl>
        </fieldset><br/>

        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

ReactDOM.render(<Signup/>, document.getElementById('root'));
