import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Students from './Students/Students'
import Student from './Student/Student'
import addCourse from './addForm/addCourse'


const App =() => {
    // return (<div>Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World</div>)

    return (
    <Switch>
            <Route exact path="/" component={Students} />
            <Route exact path="/students/:slug" component={Student} />
            <Route exact path="/addCourseForm" component = {addCourse} />
    </Switch>
    )
}

export default App 