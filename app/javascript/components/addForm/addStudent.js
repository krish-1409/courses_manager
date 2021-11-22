import React from "react";
import styled from "styled-components";
import { useState, Link } from "react";
import axios from "axios";

const Wrapper = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    h5{
        font-weight: 100;
        padding: 0;
    }
`
const Field = styled.div`
    padding: 10px;

    input{
        border-radius: 5px;
        width: 25%;
        Height: 25px;
        box-shadow: 0 8px 6px -6px black;
    }

`

const AddBtn = styled.button`
    font-size: 20px;
    box-shadow: 0 8px 6px -6px black;
`

const Btn = styled.a`
    text-decoration: none;
   Button{
    font-size: 20px;
    box-shadow: 0 8px 6px -6px black;
    margin: 30px;
    width: 150px;
    height: 35px;

   }
    
`

const addStudent = () => {
    const [newStudent, setStudent] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        
        setStudent(Object.assign({},newStudent,{[e.target.name]: e.target.value[0].toUpperCase()+e.target.value.slice(1)}))
        console.log(newStudent)
    }

    const handleSubmit = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/students',newStudent)
        .then(resp => {
            console.log(resp)
            alert(newStudent.name+' Added as a student') 
            
        })
        .catch(resp => console.log(resp.data))


    }



        
    return(
        <Wrapper>
            <h2>Enter a new Student Name to Add</h2>
            <h5>*There may be multiple Students with same name.</h5>
            <h5>(Duplication not considered.)</h5>
            <form action="">
                <Field>
                    
                    <input type="text" placeholder="Enter New Student Name" onChange = {handleChange} name = "name" />
                </Field>
                <Field>
                    
                    <input type="text" placeholder="Enter age of new Student" onChange = {handleChange} name="age"/>
                </Field>
            <Field>
            <AddBtn type="submit" onClick={handleSubmit}>Add Student</AddBtn>
            </Field>
            </form>
            
                <Btn href={`/`}  >  <button>Home</button> </Btn>
                    <Btn href={`/addCourseForm`}  >  <button>Add Courses</button> </Btn>
                    
                    
        </Wrapper>
    )
}

export default addStudent