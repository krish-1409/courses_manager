import React, {useState, useEffect, Fragment } from "react"
import axios from "axios"
import Header from "./Header"
import styled from "styled-components"
import AddCourseForm from "./addCourseForm"
import Course from './Course'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    width: 100%;
    padding: 20px;
    

`
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
    const [courses,setCourses] = useState([])


    useEffect(()=>{

        axios.get('/api/v1/courses.json')
        .then(resp => setCourses(resp.data.data))
        .catch(resp =>  console.log(resp))
    
        },[courses.length])

    const courseMap = {}
    // console.log(courses)
    for(let i=0;i<courses.length;i++){
        // courseMap.set(courses[i].id,courses[i].attributes.name)
        courseMap[courses[i].id] =  [courses[i].attributes.name,courses[i].relationships.enrollments.data.length]
    }
    // console.log(courseMap)

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
        // console.log('enrollment:',enrollment)

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

        const student_id = student.data.id
        // console.log(student_id,enrollment)
        axios.post('/api/v1/enrollments',{student_id, enrollment})
        .then(resp =>{
            const included = [...student.included, resp.data.data]
            setStudent({...student, included})
            setEnrollment({course_id: ''})
        })
        location.reload()
    }
    let enrollments
    if (loaded && student.included) { 
        enrollments = student.included.map( (item, index) => {
            return (
                <Course
                    key = {index}
                    attributes={item.attributes}
                    courseData = {courseMap}
                />
            )
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
             <Grid>
                    {enrollments}
            </Grid>
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
