import React from "react";
import './profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            weight: '150',
            feet: '',
            inches: '',
            sex: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.firstName + ' ' + this.state.lastName);
        event.preventDefault();
      }
    
      render() {
        return (
        <>
            Welcome, (future username here), please complete your profile to meet your future swole mate 💓

            <br />

            <input type="file" />

            <br />

          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
            </label>

            <br />

            <label>
              Last Name:
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
            </label>

                 <br />


            <label>
              Age:
              <input type="number" min="0" max="120" name="age" value={this.state.age} onChange={this.handleInputChange} />
            </label>

            <br />

            <label>
              Weight:
              <input type="number" min="0" name="weight" value={this.state.weight} onChange={this.handleInputChange} /> lbs
            </label>

            <br />

            <label>
              Height:
              <input type="number" min="0" max="8" name="feet" value={this.state.height} onChange={this.handleInputChange} /> feet
              <input type="number" min="0" max="11" name="inches" value={this.state.height} onChange={this.handleInputChange} /> inches

            </label>

            <br />

            <select>
                <option value="woman">Woman</option>
                <option value="man">Man</option>
            </select>

            <br />

            <select>
                <option value="1.2"> Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
                <option selected value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise/sports 6-7 days a week)</option>
                <option value="1.9">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
            </select>
     <br />
            <input type="submit" value="Submit" />
          </form>
          </>
        );
        
      }
}

export default Profile;

// User profile, add photo
// User Name
// User age, weight, sex, lifestyle (see five options to choose from)
//ask user goal??