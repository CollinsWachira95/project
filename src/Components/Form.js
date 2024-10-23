import React, { useState, useEffect } from "react";
import "../App.css";
import * as yup from 'yup';
import { useFormik } from 'formik';

function RecipeForm() {
  const [submittedData, setSubmittedData] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  // For tracking submission state

  // Form validation schema
  const formSchema = yup.object().shape({
    recipeName: yup.string().required("Recipe name is required").max(50),
    chefName: yup.string().required("Chef name is required").max(30),
    ingredients: yup.string().required("Ingredients are required").min(10),
    instructions: yup.string().required("Instructions are required").min(20),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: { recipeName: "", chefName: "", ingredients: "", instructions: "" },
    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      setSubmittedData([...submittedData, values]);
      setIsSubmitting(true);  // Trigger useEffect
      resetForm();
    },
  });

  // useEffect to send data to the backend when form is submitted
  useEffect(() => {
    const postRecipeData = async () => {
      try {
        const response = await fetch('https://server-v95o.onrender.com/recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submittedData[submittedData.length - 1]),  // Send the last submitted recipe data
        });
        const data = await response.json();
        console.log('Recipe submission successful:', data);
      } catch (error) {
        console.error('Error submitting recipe:', error);
        setError('Error submitting the recipe.');
      } finally {
        setIsSubmitting(false);  // Reset submission state
      }
    };

    if (isSubmitting) {
      postRecipeData();  // Call postRecipeData function when form is submitted
    }
  }, [submittedData, isSubmitting]);  // Depend on submittedData and isSubmitting

  return (
    <div className='form-container'>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={formik.handleSubmit} className='feedback-form'>
        
        <input 
          type='text' 
          onChange={formik.handleChange} 
          value={formik.values.recipeName} 
          name="recipeName" 
          placeholder='Recipe Name' 
          className="form-input"
        />
        <p style={{ color: "red" }}>{formik.errors.recipeName}</p>

        <input 
          type='text' 
          onChange={formik.handleChange} 
          value={formik.values.chefName} 
          name="chefName" 
          placeholder='Chef Name' 
          className="form-input"
        />
        <p style={{ color: "red" }}>{formik.errors.chefName}</p>

        <textarea 
          onChange={formik.handleChange} 
          value={formik.values.ingredients} 
          name="ingredients" 
          placeholder='Ingredients' 
          className="form-textarea"
        />
        <p style={{ color: "red" }}>{formik.errors.ingredients}</p>

        <textarea 
          onChange={formik.handleChange} 
          value={formik.values.instructions} 
          name="instructions" 
          placeholder='Instructions' 
          className="form-textarea"
        />
        <p style={{ color: "red" }}>{formik.errors.instructions}</p>

        <button type='submit' className='form-submit-button'>Submit Recipe</button>
      </form>
      
      <h3>Submitted Recipes</h3>
      <div>
        {submittedData.map((data, index) => (
          <div key={index}>
            <strong>{data.recipeName}</strong> by {data.chefName}
            <p><strong>Ingredients:</strong> {data.ingredients}</p>
            <p><strong>Instructions:</strong> {data.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeForm;
