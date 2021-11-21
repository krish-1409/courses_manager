import React from "react";

const  Student = (props) =>{
    return (
        <div className="card">
            <div className="student-name">{props.attributes.name}</div>
            <div className="student_age">{props.attributes.age}</div>
            <div className="student_courses">{props.attributes.total_courses}</div>
            <div className="student_link">
                <a href={`/students/${props.attributes.slug}`} >  View </a>
            </div>
        </div>
    )
}

export default Student