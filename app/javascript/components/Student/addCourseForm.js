import React, { useEffect, useState } from "react";
import axios from "axios";

const AddCourseForm = (props) => {
    const [courses, setCourses] = useState([])
    const [addedCourses, getCourse] = useState([])

    useEffect(()=>{

    axios.get('/api/v1/courses.json')
    .then(resp => setCourses(resp.data.data))
    .catch(resp =>  console.log(resp))

    },[courses.length])


    const list = courses.map( item=> {
        return (
            <option value={item.id}>{item.attributes.name}</option>
        )
    })

    return (
        <div className="wrapper">
            <form action="" onSubmit={props.handleSubmit}>
                <div>Wish to add a new Course for {props.attributes.name} ? Add below</div>
                <div className="field">
                    <div className="add-cource-text"></div>
                    
                    <select onChange = {props.handleChange} name="course_id" id="newCourse">
                        <option value="none" selected disabled hidden>Select a Course</option>
                        {list}
                    </select>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddCourseForm