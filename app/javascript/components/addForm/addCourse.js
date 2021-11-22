import React, { useState } from "react";
import styled from "styled-components";
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




const addCourse = () => {
    const [newCourse,setNewCourse] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        setNewCourse(Object.assign({},newCourse,{name: e.target.value}))
        console.log(newCourse)
    }

    const handleSubmit = (e) => {
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        axios.post('/api/v1/courses',newCourse)
        .then(resp => {
            console.log(resp)
            alert(newCourse.name+' Added as a course') 
            debugger
        })
        .catch(resp => console.log(resp.data))


    }


    return(
        <Wrapper>
            <h2>Enter a new Course Name to Add</h2>
            <h5>*There may be multiple courses with same name.</h5>
            <h5>(Duplication not considered.)</h5>
            <form action="">
                <Field>
                    
                    <input type="text" placeholder="Enter Course Name" onChange = {handleChange}/>
                </Field>
            <Field>
            <AddBtn type="submit" onClick={handleSubmit} >Add Course</AddBtn>
            </Field>
            </form>


        </Wrapper>
    )
}




export default addCourse