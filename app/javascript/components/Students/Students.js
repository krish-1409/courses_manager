import React, { useState, useEffect, Fragment} from "react"
import axios from 'axios'

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


    const list = students.map( item => {
        return (<li key = {item.attributes.slug}>{item.attributes.name}</li>)
    })

    return (
        <Fragment>
    <div>This is Airlines#index view for our app.</div>
    <ul>
        {list}
    </ul>
    </Fragment>
    
    )
}

export default Students
