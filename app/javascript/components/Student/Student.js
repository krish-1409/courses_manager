import React, {useState, useEffect, Fragment } from "react"
import axios from "axios"
import Header from "./Header"
import styled from "styled-components"
import AddCourseForm from "./addCourseForm"

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: black;
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;

    &:last-child{
        background: #000;
        color: white;
    }
`
const Main = styled.div`
    padding-left: 50px;
`

const Student = (props) => {
    const [student, setStudent] = useState({})
    const [enrollment, setEnrollment] = useState({})
    const [loaded,setLoaded] = useState(false)
    useEffect(() => {
        const slug = props.match.params.slug
        const url = `/api/v1/students/${slug}`

        axios.get(url)
        .then( resp => {
            setStudent(resp.data)
            setLoaded(true)
        } )
        .catch( resp => console.log(resp.data) )
    }, [])

    const handleChange = (e) => {
        e.preventDefault()

        setEnrollment(Object.assign({}, enrollment, {[e.target.name]: e.target.value}))
        console.log('enrollment:',enrollment)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const student_id = student.data.id
        console.log(student_id,enrollment)
        axios.post('/api/v1/enrollments',{student_id, enrollment})
        .then(resp =>{
            debugger
        })

    } 
    return (
        <Wrapper>
            {
                loaded &&
            <Fragment>
            <Column>
                <Main>
                    
                    <Header attributes={student.data.attributes} />
                    <div className="courses"></div>
                </Main>
                
            </Column>
            <Column>

            <AddCourseForm
                handleChange = {handleChange}
                handleSubmit = {handleSubmit}
                attributes = {student.data.attributes}
                enrollments = {enrollment}
            />

            </Column>
            </Fragment>
            }
        </Wrapper>
    )
}

export default Student
