import React, { useState, useEffect, Fragment} from "react"
import axios from 'axios'
import Student from './Student'
import styled from 'styled-components'
import { Link } from "react-router-dom"

const Home = styled.div`
    text-align: center;
    max-width: 1200px;
    margin-left: auto;
    margin-righ: auto;
`
const Header = styled.div`
    padding: 100px 100px 10x 100px;

    h1{
        font-size: 42px;
    }

`
const Subheader = styled.div`
    font-weight: 300;
    font-size: 26px


`
const Grid = styled.div`
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 grid-gap: 20px;
 width: 100%;
 padding: 20px; 
`
const AddLink = styled.div`


    margin: 30px 0 0px 0;
    height: 30px;

    a{
        color: #fff;
        background: #000;
        border-radius: 4px;
        padding: 10px;
        border: 1px solid #000;
        width: 100%;
        text-decoration: none;
        margin: 20px;

    }
  

`

const Students = () => {
    const [students, setStudents] = useState([])

    useEffect(()=> {
        //obtain data of students from api
        //use sate is used to update as we add new students

        axios.get('/api/v1/students.json')
        .then(resp => setStudents(resp.data.data))
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
        <Home>
            <Header>
                <h1>Course Manager</h1>
                <Subheader>An Application to manage your courses.</Subheader>
                <div className="Buttons">
                <AddLink>
                    <Link to={`/addCourseForm`}  >  Add Courses </Link>
                    <Link to={`/addStudentForm`}  >  Add Students</Link>
                </AddLink>
                </div>
            </Header>
        <Grid>
        {grid}
        </Grid>
    
    
    </Home>
    
    )
}

export default Students
