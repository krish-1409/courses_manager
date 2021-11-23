import React, { useEffect } from "react";
import styled from "styled-components";
import { useState, Link } from "react";
import axios from "axios";


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

`

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

    input,select{
        border-radius: 5px;
        width: 30%;
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

const addNewStudent = () => {
    const [newStudent, setNewStudent] = useState({})  //stores the value of new student to be added
    const [delStudent, setDelStudent] = useState('')  //used to store the slug value of student to be deleted permanently
    const [students, setStudents] = useState({})      //Used to store details of all available students


    // Below method is fired when there is a change in input value and supplies the value to newStudent 
    //which is used in student creation in handle submit
    const handleChange = (e) => {
        e.preventDefault()
        
        setNewStudent(Object.assign({},newStudent,{[e.target.name]: e.target.value[0].toUpperCase()+e.target.value.slice(1)}))
        console.log(newStudent)
    }

    //Below function fires when the new student form is submitted
    const handleSubmit = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/students',newStudent)  //new student is a json object which is to be passed with arugemnt name to add a new student
        .then(resp => {
            console.log(resp)
            alert(newStudent.name+' Added as a student') 
            
        })
        .catch(resp => console.log(resp.data))


    }

    // Below method is fired when there is a change in input value of delete form and supplies the value to delStudent
    //which is used in student deletion in handleSubmitDel
    const handleChangeDel = (e) => {
        e.preventDefault()
        setDelStudent(e.target.value)
        
    }

    const handleSubmitDel = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      
        const url = '/api/v1/students/' + delStudent  //Slug variable is required as parameter to delete the student 
        alert("Student Succefully Removed")
        axios.delete(url)
        .then(resp => console.log(resp))
        


    }

    //Below funtion is used to get Student data
    useEffect(()=> {

        axios.get('/api/v1/students.json')
        .then(resp => setStudents(resp.data.data))
        .catch(resp => console.log(resp))

    },[students.length])

    //Below part of code is used to store those students with zero enrollments as [studentname, slug]
    const delStudentsList = []
    for(let i=0;i<students.length;i++){
        if(students[i].relationships.enrollments.data.length==0){
            delStudentsList.push([students[i].attributes.name,students[i].attributes.slug])
        }
    }
    
    //Used to create options for dropdown using del list
    const delStudentsListOptions = delStudentsList.map(item => {
        return(
            <option value={item[1]} name={item[0]}>{item[0]}</option>
        )
    })
    return(
        <Wrapper>

            < Btn href={`/`}  >  <button>Home</button> </Btn>
            <Btn href={`/addCourseForm`}  >  <button>Add Courses</button> </Btn>
            <br></br>
            <h4>Total Students : {students.length}</h4>
            <Grid>
            <div>
            <h2>Enter a new Student Name to Add</h2>
            <h5>*There may be multiple Students with same name.</h5>
            <h5>(Duplication not considered.)</h5>
            <form action="">
                <Field>
                    
                    <input type="text" placeholder="Enter New Student Name" onChange = {handleChange} name = "name" required/>
                </Field>
                <Field>
                    
                    <input type="number" placeholder="Enter age of new Student" onChange = {handleChange} name="age" required/>
                </Field>
            <Field>
            <AddBtn type="submit" onClick={handleSubmit}>Add Student</AddBtn>
            </Field>
            </form>
            </div>
            
            {/* deletetion form starts here */}

            <div>
            <h2>Select a Student to delete it permanently.</h2>
            <h5>*Only the students with zero enrollments will be available to choose</h5>
            <h5>(Deletion not available if a student is enrolled in some course)</h5>
            <form action="">
                <Field>
                <select onChange = {handleChangeDel} name="student_id" id="delStudent">
                        <option value="none" selected disabled hidden>Select a Student</option>
                        {delStudentsListOptions}
                    </select>  
                    
                </Field>
                <Field></Field>
                <Field></Field>
                
            <Field>
            <AddBtn type="submit" onClick={handleSubmitDel}>Delete Student</AddBtn>
            </Field>
            </form>

            </div>
            
        </Grid>
                    
                    
        </Wrapper>
    )
}

export default addNewStudent