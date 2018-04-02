<p align="center">
  <a href="https://qrator.net">
    <img alt="react-router" src="./logo.jpg" width="280">
  </a>
</p>

<h3 align="center">
  React Form from Qrator
</h3>

<p align="center">
  Easy way to validate forms in React
</p>

## Docs

[Read API docs](https://qratorlabs.github.io/react-form/)

## Get started

### Instalation

Install react-form directly from gitlab repo

```
npm i -S @qrator/react-form
```

### Create you first form

You may use webpack or some module bundler for writing code in ES6 syntax 
```es6
import * as React from 'react';
import Form, { InputControl } from '@qrator/react-form';

let notEmpty = val => val.trim();

class MyForm extends React.Component {
  handleSubmit(data) {
    // save it on a server
  }
  render() {
    return (
      <Form onSubmit={::this.handleSubmit}>
        <InputControl name='login' validators={[{
          name: 'empty', msg: 'Enter login', f: notEmpty
        }]}/>
        <InputControl
            name='password'
            type='password'
            validators={[name: 'empty', msg: 'Required field', f: notEmpty]}/>
        <button type='submit'>Submit</button>
      </Form>
    );
  }
}

export default MyForm;
```

You may start demo by command

```bash
npm run example -- --env.name signup
```
After you should open `http://localhost:8080` to see demo in your browser
