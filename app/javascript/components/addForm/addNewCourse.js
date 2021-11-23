import React, { useState,useEffect } from "react";
import styled from "styled-components";
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
    padding: 20px;

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



const addNewCourse = () => {
    const [newCourse,setNewCourse] = useState({})   //stores the value of new course to be added
    const [courses, setCourses] = useState({})      //Used to store details of all available courses
    const [delCourse, setDelCourse] = useState('')  //used to store the slug value of course to be deleted permanently


    // Below method is fired when there is a change in input value and supplies the value to newCourse 
    //which is used in course creation in handle submit

    const handleChange = (e) => {
        e.preventDefault()
        setNewCourse(Object.assign({},newCourse,{name: e.target.value[0].toUpperCase()+e.target.value.slice(1)}))
        console.log(newCourse)
    }

    //Below function fires when the new course form is submitted
    const handleSubmit = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/courses',newCourse)         //new course is a json object which is to be passed with arugemnt name to add a new course
        .then(resp => {
            console.log(resp)
            alert(newCourse.name+' Added as a course') 
            debugger
        })
        .catch(resp => console.log(resp.data))
    }

   
    // Below method is fired when there is a change in input value of delete form and supplies the value to delCourse 
    //which is used in course deletion in handleSubmitDel
    const handleChangeDel = (e) => {
        e.preventDefault()
        setDelCourse(e.target.value)
        
    }

    const handleSubmitDel = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const url = '/api/v1/courses/'+delCourse  //Slug variable is required as parameter to delete the course 
       
        axios.delete(url)
        .then(resp =>{
            console.log(resp)
        })
        
    }
    
    //Below funtion is used to get Course data
    useEffect(()=> {
        

        axios.get('/api/v1/courses.json')
        .then(resp => setCourses(resp.data.data))
        .catch( resp => console.log(resp) )
    }, [courses.length])

    
    
    //Below part of code is used to store those courses with zero enrollments as [coursename, slug]
    const delCourseList = []
    for(let i=0;i<courses.length;i++){
        if(courses[i].relationships.enrollments.data.length==0){
            delCourseList.push([courses[i].attributes.name,courses[i].attributes.slug])
        }
    }
    
    //Used to create options for dropdown using del list
    const delCourseListOptions = delCourseList.map(item => {
        return (
            <option value={item[1]}>{item[0]}</option>
        )
    })

    return(
        <Wrapper>
           
            <Btn href={`/`}  >  <button>Home</button> </Btn>
            <Btn href={`/addStudentForm`}  >  <button>Add Students</button> </Btn>
            <br></br>
            <h4>Total Courses Available: {courses.length}</h4>
           <Grid> 
            <div>
            <h2>Enter a new Course Name to Add</h2>
            <h5>*There may be multiple courses with same name.</h5>
            <h5>(Duplication not considered.)</h5>
            
            <form action="">
                <Field>
                    
                    <input type="text" placeholder="Enter Course Name" onChange = {handleChange} required/>
                </Field>
            <Field>
            <AddBtn type="submit" onClick={handleSubmit} >Add Course</AddBtn>
            </Field>
            </form>
        </div>
        
        <div>
            <h2>Select a Course to delete it permanently</h2>
            <h5>*Only the courses with zero enrollments will be available to choose</h5>
            <h5>(Deletion not available for courses in which students are enrolled)</h5>
            
            <form action="" onSubmit={handleSubmitDel}>
                <Field>
                    
                <select onChange = {handleChangeDel} name="course_id" id="delCourse">
                        <option value="none" selected disabled hidden>Select a Course</option>
                        {delCourseListOptions}
                    </select>
                </Field>
            <Field>
            <AddBtn type="submit"  >Delete Course</AddBtn>
            </Field>
            
            </form>
        </div>
            </Grid>
            

        </Wrapper>
    )
}




export default addNewCourse