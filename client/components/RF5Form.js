import React from 'react'
import Input from './forms/Input'
import Select from './forms/Select'
import { reduxForm } from 'redux-form-legacy'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submit(values) {
  return sleep(1000)
    .then(() => {
      if (values.foo === 'invalid') {
        return Promise.reject({
          _error: 'Bad value'
        })
      }
    })
}

const SimpleForm = props => {
  const { handleSubmit, pristine, error, title, values } = props;

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>{title}</h1>
      {error && <span>{error}</span>}
      <Input field={props.fields.foo} />
      <Input field={props.fields.bar.baz} />
      {/*<Select field={props.fields.bar} />*/}
      <button type="submit" disabled={pristine}>Submit</button>
    </form>
  )
};

export default reduxForm({
  form: 'v5',
  fields: ['foo', 'bar.baz', 'abc']
}, store => ({
  test: store.form.rf5
}))(SimpleForm)