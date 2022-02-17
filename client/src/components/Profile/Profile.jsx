import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import './profile.css';

//need to add mutation like add user

const Profile = (props) => {
        const [inputFirstName, setFirstName] = useState('');
        const [inputLastName, setLastName] = useState('');
        const [inputAge, setAge] = useState('');
        const [inputWeight, setWeight] = useState('');
        const [inputFeet, setFeet] = useState('');
        const [inputInches, setInches] = useState('');
        const [inputSex, setSex] = useState('');

        function handleFirstName(event){
          setFirstName(event.target.value);
        }
        function handleLastName(event){
          setLastName(event.target.value);
        }
        function handleAge(event){
          setAge(event.target.value);
        }
        function handleWeight(event){
          setWeight(event.target.value);
        }
        function handleFeet(event){
          setFeet(event.target.value);
        }
    
        function handleInch(event){
          setInches(event.target.value);
        }
        // function handleSex(event){
        //   setSex(event.target.value);
        // }
    
    
      function handleSubmit(event) {
        alert(`A name was submitted: ${inputFirstName} ${inputLastName} with the following information:
        ${inputAge}
        ${inputWeight}
        ${inputFeet}
        ${inputInches}
        `);

        // const firstName = this.state.firstName;
        // const lastName = this.state.lastName;
        // const age = this.state.age;
        // const weight = this.state.weight;
        // const height = ((this.state.feet * 12) + this.state.inches);

        // console.log(`this height in inches is ${height}`)

        event.preventDefault();
      }
    
        return (
        <>
        <div className ="bg-indigo-400 profile">
          <div className="profileContainer">
            Welcome, (future username here), please complete your profile to meet your future swole mate 💓

            <br />

            <input type="file" name="userPhoto" accept="image/png, image/gif, image/jpeg" />

            <br />

          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:
              <input type="text" name="firstName" value={this.state.firstName} onChange={handleFirstName} />
            </label>

            <br />

            <label>
              Last Name:
              <input type="text" name="lastName" value={this.state.lastName} onChange={handleLastName} />
            </label>

                <br />


            <label>
              Age:
              <input type="number" min="0" max="120" name="age" value={this.state.age} onChange={handleAge} />
            </label>

            <br />

            <label>
              Weight:
              <input type="number" min="0" name="weight" value={this.state.weight} onChange={handleWeight} /> lbs
            </label>

            <br />

            <label>
              Height:
              <input type="number" min="1" max="8" name="feet" value={this.state.height} onChange={handleFeet} /> feet
              <input type="number" min="0" max="11" name="inches" value={this.state.height} onChange={handleInch} /> inches

            </label>

            <br />
            Birth Sex:
            <select>
                <option name="sex" value="woman">Female</option>
                <option name ="sex" value="man">Male</option>
            </select>

            <br />
            Exercise:
            <select>
                <option value="1.2"> Sedentary (little to no exercise)</option>
                <option value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</option>
                <option selected value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                <option value="1.725">Very Active (hard exercise/sports 6-7 days a week)</option>
                <option value="1.9">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
            </select>
            Goal:
            <select>
                <option value="gain">Gain muscle</option>
                <option value="lose">Lose fat</option>
                <option selected value="maintain">Maintain</option>
            </select>
     <br />
            <button onClick={handleSubmit}>Submit</button>
          </form>
          </div>
          </div>
          </>
        );
        
      }

export default Profile;

// User profile, add photo
// User Name
// User age, weight, sex, lifestyle (see five options to choose from)
//ask user goal??