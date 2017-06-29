import React from 'react'
import Input from './forms/Input'
import Select from './forms/Select'
import { reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000)
    .then(() => {
      if (values.foo === 'invalid') {
        throw new SubmissionError({
          _error: 'Bad value'
        })
      }
    })
}

const SimpleForm = props => {
  const { handleSubmit, pristine, error, title } = props;
  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1>{title}</h1>
      {error && <span>{error}</span>}
      <Input name="foo" />
      <Select name="bar" />
      <button type="submit" disabled={pristine}>Submit</button>
    </form>
  )
};

export default reduxForm({
  form: 'v6',
  // validate: (values, props) => {
  //   console.log(values, props)
  // }
})(
  connect(store => ({
    test: store.form.rf6
  }))
  (SimpleForm)
)