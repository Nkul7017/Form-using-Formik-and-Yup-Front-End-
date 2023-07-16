import React, { useState } from 'react'
import {Form,Field,ErrorMessage,Formik,FieldArray} from 'formik'
import * as Yup from 'yup'
function Login() {
 const [prev,setprev]=useState(null);


  const FormSchema = Yup.object().shape({
    name: Yup.string().required().min(5, "Minimum 5 characters").max(10, "Maximum 10 characters"),
    phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    email:Yup.string().email("Invalid email").required(),
    password:Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    cpswd:Yup.string().oneOf([Yup.ref('password'),null],"Password not match").required(),
    date:Yup.string().required(),
    gender:Yup.string().required(),
    stack:Yup.string().required(),
    about:Yup.string().required().min(20,"Minimum 20 characters ").max(100,"maximum 100 characters"),
    subscribe:Yup.boolean(),
    hobbies:Yup.array().min(1,"select at least one").required(),
    friends:Yup.array().min(1,"atleast one").required(),
    social: Yup.object().shape({
      facebook: Yup.string()
        .min(5, 'Facebook handle must be at least 5 characters')
        .max(20, 'Facebook handle must be at most 20 characters')
        .required('Facebook handle is required'),
      twitter: Yup.string()
        .min(5, 'Twitter handle must be at least 5 characters')
        .max(20, 'Twitter handle must be at most 20 characters')
        .required('Twitter handle is required'),
    }),
    file: Yup.mixed().required('File is required'),
  });
  
  return (
   <>  
      <Formik
    initialValues={{
        name:"",
        phone:"",
        email:"",
        password:"",
        cpswd:"",
        date:"",
        gender:"",
        stack:"",
        about:"",
        subscribe:false,
        hobbies:[],
        friends:[],
        social: {
          facebook: '',
          twitter: '',
        },
        file:null,
    }}
    validationSchema={FormSchema}
    onSubmit={(values, { setSubmitting }) => {
      console.log(values);
      // setTimeout(() => {
      //   setSubmitting(false);
      // }, 2000)}}
      setSubmitting(false);}}
    >
        {({isSubmitting,values,errors, touched,setFieldValue
        })=>
           <Form>
            <label htmlFor='name'>Name:</label>
            <Field type="text" name="name" id="name" /> <br />
            {errors.name && touched.name ? (
             <div>{errors.name}</div>
          ) : null}<br /> 
          <ErrorMessage name="name" /> <br />
         <label htmlFor="phone">Phone:</label>
            <Field type="text" name="phone" id="phone" /> <br />
          <ErrorMessage name="phone" /> <br />
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" id="email" /> <br />
          <ErrorMessage name="email"/> <br />
          <label htmlFor='password'>Password</label>
          <Field type="password" name='password' id="password"  /> <br />
          <ErrorMessage name="password"/> <br />
          
          <label htmlFor='cpswd'>Confirm Password</label>
          <Field type="password" name='cpswd' id="cpswd"  /> <br />
          <ErrorMessage name="cpswd"/> <br />
          <label htmlFor='date'>Date</label>
          <Field type="date" name='date' id="date"  /> <br />
          <ErrorMessage name="date"/> <br />
          <label htmlFor='gender'>Gender:</label> <br />

          <label htmlFor='male'>Male</label> 
          <Field type="radio" name='gender' value="male" id="male"  />

          <label htmlFor='female'>Female</label> 
          <Field type="radio" name='gender' value="female" id="female"   /> <br />
          <ErrorMessage name="gender"/> <br />
           
          <label htmlFor="stack">Role</label>
           
          <Field name="stack" as="select"  id="stack">
            <option>Select</option>
          <option value="Mern Stack">Mern Stack</option>
          <option value="Mean Stack">Mean Stack</option>
          <option value="Full Stack">Full Stack</option>
          </Field> <br />
          <ErrorMessage name="stack"/> <br />
          
          <label  htmlFor='about'>About</label>
          <Field name="about" as="textarea"/> <br />
          <ErrorMessage name="about"/> <br />

          <label htmlFor='subscribe'>Subscibe to my channel</label> 
          <Field type="checkbox" name='subscribe'  id="subscribe"   /> <br /> <br />
          
          <label>Hobbies:</label> 
          <br />
          <label htmlFor='hobbies1'>Gaming</label>  
          <Field type="checkbox" name='hobbies'  id="hobbies1" value="Gaming"   /> 
          <label htmlFor='hobbies2'>Cricket</label> 
          <Field type="checkbox" name='hobbies'  id="hobbies2" value="Cricket"  /> <br /> 
           <ErrorMessage name="hobbies"/> <br />
           <FieldArray
             name="friends"
             render={arrayHelpers => (
               <div>
                 {values.friends && values.friends.length > 0 ? (
                   values.friends.map((friend, index) => (
                     <div key={index}>
                       <Field name={`friends.${index}`} />
                       <button
                         type="button"
                         onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                       >
                         -
                       </button>
                       <button
                         type="button"
                         onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                       >
                         +
                       </button>
                     </div>
                   ))
                 ) : (
                   <button type="button" onClick={() => arrayHelpers.push('')}>
                      
                     Add a friend
                   </button>
                 )}
               </div>
             )}
           /> 
           <ErrorMessage name="friends"/> <br /> 

<label>Social:</label>
            <br />
            <label htmlFor="facebook">Facebook</label>
            <Field name="social.facebook" id="facebook" />
            <ErrorMessage name="social.facebook" />
            <br />
            <label htmlFor="instagram">Instagram</label>
            <Field name="social.twitter" id="instagram"/>
            <ErrorMessage name="social.twitter" />
            <br />

           social[0] and social.0 are same
          <label >Upload file</label>
          <input type="file" name="file" onChange={(e)=>{
            
            values.file=e.target.files[0];
            const reader=new FileReader();
            reader.readAsDataURL(values.file);
            reader.onload=()=>{
              setprev(reader.result);
            }
          }} />
             {values.file&&<img src={prev} alt="preview" width={200} height={200} />} 
             <ErrorMessage name="file"/>
             {isSubmitting ? (<div>Loading...</div>
          ) : (
            <button type="submit" disabled={isSubmitting}>Submit</button>
          )}
           
           </Form>
        }
      </Formik>
      </>
  )
}

export default Login
