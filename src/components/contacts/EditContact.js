import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { getContact, updateContact } from "../../actions/contactActions";
import { connect } from "react-redux";

class EditContact extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getContact(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { id, name, email, phone } = nextProps.contact;
    this.setState({
      id,
      name,
      email,
      phone,
      error: {}
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const { id } = this.props.match.params;
    const updContact = {
      id,
      name,
      email,
      phone
    };

    //// UPDATE CONTACT ////
    this.props.updateContact(updContact);

    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Edit Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Update Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contact.contact
});

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(EditContact);