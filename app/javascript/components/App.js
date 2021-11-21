import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Students from './Students/Students'
import Student from './Student/Student'


const App =() => {
    // return (<div>Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World Hellow World</div>)

    return (
    <Switch>
            <Route exact path="/" component={Students} />
            <Route exact path="/students/:slug" component={Student} />
    </Switch>
    )
}

export default App 