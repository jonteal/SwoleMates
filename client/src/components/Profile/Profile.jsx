import React from "react";
import './profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>

            <select>
                <option value="1.2"> Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
                <option selected value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
                <option value="1.9">Extra active (very hard exercise/sports & physical job or 2x training)</option>
            </select>

            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Profile;

// User profile, add photo
// User Name
// User age, weight, sex, lifestyle (see five options to choose from)
//ask user goal??