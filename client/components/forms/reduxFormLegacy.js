import React from 'react'
import { reduxForm as originalReduxForm, Field, Fields, SubmissionError } from 'redux-form'
import _ from 'lodash'
import { connect } from 'react-redux'

export function reduxForm(config, ...reduxConnectProps) {
  return Component => {
    class LegacyFields extends React.Component {
      render() {
        const {
          names,
          parentProps: {
            destroy,
            initialize,
            handleSubmit,
            reset,
            ...parentProps
          },
          ...fields
        } = this.props;

        let legacyFields = {};
        let activeFieldName = {};
        let values = {};

        names.forEach(fieldKey => {
          const { input, meta, ...children } = _.get(fields, fieldKey);

          _.set(legacyFields, fieldKey, {
            ...input,
            ...meta,
            ...children,
            initialValue: _.get(parentProps.initialValues, input.name)
          });

          if (meta.active) {
            activeFieldName = input.name
          }

          _.set(values, fieldKey, input.value)

        });

        const handleSubmitPromise = (...params) => {

          const submitFunc = validateFunc =>
            handleSubmit(values => {
              return Promise.resolve(validateFunc(values))
                .then(val => val, err => {
                  throw new SubmissionError(err)
                })
            });

          // submit function passed as function parameter
          if (params.length === 1) {
            return submitFunc(params[0])
          }

          return submitFunc(parentProps.onSubmit)(...params)
        };

        return (
          <Component
            {...parentProps}
            active={activeFieldName}
            destroyForm={destroy}
            fields={legacyFields}
            handleSubmit={handleSubmitPromise}
            initializeForm={initialize}
            resetForm={reset}
            values={values}
            errors={parentProps.errors || {}}
          />
        )
      }
    }

    class LegacyForm extends React.Component {
      render() {
        return (
          <Fields names={config.fields} component={LegacyFields} parentProps={this.props} />
        )
      }
    }

    let FormComponent = LegacyForm;

    let defaultValues = {};

    config.fields.forEach(fieldKey => {
      _.set(defaultValues, fieldKey)
    });

    const reduxFormComponent = originalReduxForm({
      ...config,
      validate: config.validate && function (values, props) {
        return config.validate(
          _.defaultsDeep(values, defaultValues),
          props
        );
      },
      renderComponent: Component
    })(FormComponent);

    if (reduxConnectProps.length) {
      return connect(...reduxConnectProps)(reduxFormComponent)
    } else {
      return reduxFormComponent
    }
  }
}

// wrap form components if some parent forms may be using legacy (RF5) api
export function withLegacyForms(Component) {
  return class WithLegacyForms extends React.Component {
    render() {
      if (this.props.field) {
        const {
          field: {
            name
          },
          ...props
        } = this.props;

        return <Component name={name} {...props} />
      }
      return <Component {...this.props} />
    }
  }
}

// wrap form components created for legacy (RF5) api
export function withLegacyComponent(Component) {
  class LegacyField extends React.Component {
    render() {
      const { input, meta, parentProps, ...props } = this.props;

      const field = Object.assign({
        onUpdate: input.onChange
      }, input, meta);

      return <Component {...parentProps} field={field} />
    }
  }

  return class WithLegacyComponent extends React.Component {
    render() {
      return <Field {...this.props} parentProps={this.props} defaultValue={this.props.value} component={LegacyField} />
    }
  }
}
