import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Field = styled.div`
    border-radius: 4px;
    padding-left: 20px;
   

    Select {
        width: 100%;
        min-height: 30px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        margin: 12px 0;
        paddinf: 12px;
        width: 96%;
    }
`
const Wrapper = styled.div`
    background: #000;
    height: 100vh;
    padding-top: 10px;
    div{
        padding-left: 20px;
        padding-bottom: 10px;
        font-size: 18px;
    }
    


`
const SubmitBtn = styled.button`
    color: #fff;
    background: #333;
    border-radius: 4px;
    padding: 12px;
    font-size: 18px;
    cursor: pointer;
    transition: ease-in-out 0.1s;
    background: 1px solid #fff;
    width: 96%;
    margin-right: 20px;

    &:hover {
        background: #fff;
        color: #000;
        border: 1px solid #fff;

    }
`
const Headline = styled.div`
    padding: 20px;
    font-size: 20px;
    font-weight: bold;

`

const SubForms = styled.div`
    margin-top: 50px;
    padding-bottom: 100px;
`

const AddDelCourseForm = (props) => {
    const [courses, setCourses] = useState([])
    const [addedCourses, getCourse] = useState([])

    useEffect(()=>{

    axios.get('/api/v1/courses.json')
    .then(resp => setCourses(resp.data.data))
    .catch(resp =>  console.log(resp))

    },[courses.length])

    
    

    useEffect(()=>{
        const slug = props.attributes.slug
        const url = `/api/v1/students/${slug}`
        axios.get(url)
        .then(resp => getCourse(resp.data.included))
        .catch(resp =>  console.log(resp))
    
        },[courses.length])


 
    const Coursedata = (courses,addedCourses) => {
            let n1 = courses.length
            let n2 = addedCourses.length
            const toAdd = []
            const Added = []
            for(let i=0;i < n1 ; i++){
                    let count = 0
                for(let j=0; j< n2; j++){
                    if(courses[i].id == addedCourses[j].attributes.course_id){
                        Added.push([courses[i].attributes.name,courses[i].id])
                        break;
                    }
                    count+=1
                }

                if(count==n2){
                    toAdd.push([courses[i].attributes.name,courses[i].id])
                }
            }

            return [toAdd,Added]
    }

    
    const courseData = Coursedata(courses,addedCourses) 

    const Addlist = courseData[0].map( item=> {
        return (
            <option value={item[1]}>{item[0]}</option>
        )
    })

    const Dellist = courseData[1].map( item=> {
        return (
            <option value={item[1]}>{item[0]}</option>
        )
    })

    return (
        <Wrapper>
            <SubForms>
            <form action="" onSubmit={props.handleSubmit}>
                <Headline>Wish to add a new Course for {props.attributes.name} ? </Headline>
                <div>Choose From Below Available Courses</div>
                <Field>
                    <div className="add-cource-text"></div>
                    
                    <select onChange = {props.handleChange} name="course_id" id="newCourse">
                        <option value="none" selected disabled hidden>Select a Course</option>
                        {Addlist}
                    </select>
                </Field>
                <div>
                <SubmitBtn type="submit">Add Course</SubmitBtn>
                </div>
            </form>
            </SubForms>

            <SubForms>
            <form action="" onSubmit={props.handleSubmitDel}>
                <Headline>Wish to Delete a Course in {props.attributes.name}'s Enrollments ? </Headline>
                <div>Choose From Below Available Courses</div>
                <Field>
                    <div className="add-cource-text"></div>
                    
                    <select onChange = {props.handleChangeDel} name="course_id" id="newCourse">
                        <option value="none" selected disabled hidden>Select a Course</option>
                        {Dellist}
                    </select>
                </Field>
                <div>
                <SubmitBtn type="submit">Delete Course</SubmitBtn>
                </div>
            </form>
            </SubForms>
        </Wrapper>
    )
}

export default AddDelCourseForm