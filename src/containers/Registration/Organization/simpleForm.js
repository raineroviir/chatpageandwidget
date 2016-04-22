import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
//export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]

class SimpleForm extends Component {
  render() {
    const {
      fields: { firstName}      
    } = this.props

    // const {
    //   fields: { teamName },
    //   handleSubmit,
    //   resetForm,
    //   submitting
    //   } = this.props.registrationDetails.Organisation
    return (<form>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" />
          </div>
        </div>
        
      </form>
    )
  }
}

SimpleForm.propTypes = {
  fields: PropTypes.object.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  // resetForm: PropTypes.func.isRequired,
  // submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'simple',
  fields: ['firstName'],
})(SimpleForm)
