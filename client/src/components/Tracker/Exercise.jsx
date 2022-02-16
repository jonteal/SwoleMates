import React, { useState, useEffect } from "react";


const Exercise = () => {

    const [exerciseData, setExerciseData] = useState({
        type: "",
        durationInMinutes: "",
        cardioDistanceInMiles: "",
        repetitions: "",
        sets: "",
        weight: "",
        caloriesBurnt: "",
      });

      const [showAlert, setShowAlert] = useState(false);


    //   write a mutation with exercise add
      const [createExercise, { data, error }] = useMutation(ADD_EXERCISE);

      useEffect(() => {
        error ? setShowAlert(true) : setShowAlert(false);
      }, [error]);

      const handleInputChange = (event) => {
        const { type, durationInMinutes, cardioDistanceInMiles, repetitions, sets, weight, caloriesBurtn, value } = event.target;
        setExerciseData({ ...exerciseData, [type]: value, [durationInMinutes]: value, [cardioDistanceInMiles]: value, [repetitions]: value, [sets]: value, [weight]: value, [caloriesBurnt]: value });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const { data } = await createExercise({
            variables: { ...exerciseData },
          });
    
        } catch (err) {
          console.error(err);
        }
    
        setExerciseFormData({
            type: "",
            durationInMinutes: "",
            cardioDistanceInMiles: "",
            repetitions: "",
            sets: "",
            weight: "",
            caloriesBurnt: "",
        });
      };

    return (
        <>
        <Form onSubmit={handleFormSubmit}>
          {/* show alert if server response is bad */}
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
          >
            Something is wrong with your exercise input "sadface"
          </Alert>
  
          {/* Exercise type */}
          <Form.Group>
            <Form.Label htmlFor="type">Exercise type</Form.Label>
            <Form.Control
              type="type"
              placeholder="Choose your exercise type"
              name="type"
              onChange={handleInputChange}
              value={exerciseData.type}
              required
            />
            <Form.Control.Feedback type="invalid">
              Type is required!
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* Exercise Duration */}
          <Form.Group>
            <Form.Label htmlFor="durationInMinutes">Duration of exercise</Form.Label>
            <Form.Control
              type="durationInMinutes"
              placeholder="Enter exercise in minutes"
              name="durationInMinutes"
              onChange={handleInputChange}
              value={exerciseData.durationInMinutes}
              required
            />
            <Form.Control.Feedback type="invalid">
            Duration of exercise is required!
            </Form.Control.Feedback>
          </Form.Group>
          
  
          {/* Submit Button */}
          <Button
            disabled={!(exerciseData.type && exerciseData.durationInMinutes)}
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </Form>
      </>
    );
  };
  
  export default Exercise;