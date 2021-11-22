import React, { useState, useEffect, Fragment} from "react"
import axios from 'axios'
import Student from './Student'
import styled from 'styled-components'

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
            </Header>
        <Grid>
        {grid}
        </Grid>
    
    
    </Home>
    
    )
}

export default Students
