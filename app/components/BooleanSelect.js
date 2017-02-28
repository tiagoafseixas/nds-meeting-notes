import React from 'react';
import { Select } from 'semantic-ui-react'

export default class BooleanSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value});
  }

  render()
  {
    return (
      <Select options={[
        {key : "", value : "", text: ""},
        {key : "false", value : "false", text: "No. "},
        {key : "true", value : "true", text: "Yes."}
      ]} {...this.props} compact onClick={(event) => this.handleChange(event)}/>
    );
  }
}