import React, { Component } from 'react'
import { withLegacyForms, withLegacyComponent } from 'redux-form-legacy'

class Select extends Component {
  render() {
    return (
      <input type="radio" name={this.props.field.name} />
    )
  }
}


export default withLegacyForms(
  withLegacyComponent(Select)
)
