import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Students from './Students/Students'
import Student from './Student/Student'
import addNewCourse from './addForm/addNewCourse'
import addNewStudent from './addForm/addNewStudent'


const App =() => {
    // return (<div>Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World</div>)

    return (
    <Switch>
            <Route exact path="/" component={Students} />
            <Route exact path="/students/:slug" component={Student} />
            <Route exact path="/addCourseForm" component = {addNewCourse} />
            <Route exact path="/addStudentForm" component = {addNewStudent} />
    </Switch>
    )
}

export default App 