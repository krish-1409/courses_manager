import React, { useState, useEffect, Fragment} from "react"
import axios from 'axios'
import Student from './Student'

const Students = () => {
    const [students, setStudents] = useState([])

    useEffect(()=> {
        //obtain data of students from api
        //use sate is used to update as we add new students

        axios.get('/api/v1/students.json')
        .then(resp => {
            setStudents(resp.data.data)
        } )
        .catch( resp => console.log(resp) )
    }, [students.length])


    const grid = students.map( item => {
        return (
        <Student key = {item.attributes.slug}
                 attributes={item.attributes}
        />
        )
    })

    return (
        <div className="home">
            <div className="header">
                <h1>Course Manager</h1>
                <div className="subheader">An Application to manage your courses </div>
            </div>
        <div className="grid">
    
        </div>
    
    <ul>
    {grid}
    </ul>
    </div>
    
    )
}

export default Students
