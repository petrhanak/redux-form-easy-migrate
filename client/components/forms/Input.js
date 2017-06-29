import React, { Component } from 'react'
import { Field } from 'redux-form'
import { withLegacyForms } from 'redux-form-legacy'

class Input extends Component {
  render() {
    return (
      <input {...this.props.field} />
    )
  }
}

export default withLegacyForms(Input)
