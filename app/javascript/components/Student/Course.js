import React from "react";
import styled from "styled-components";
import { useState } from "react";

const Card = styled.div`
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 4px;
    padding: 20px;
    margin: 0 0 20px 0;
    width: 85%;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
`
const Coursename = styled.div`
    padding-top: 7px;
    padding-bottom: 10px;
    font-size: 18px;

`
const Enrolls = styled.div`
    padding-bottom: 14px;


` 


const Course = (props) => {
    let loaded = true

    console.log(props) 
    if(loaded){
        loaded = false
        console.log(props)
        if(typeof props === 'undefined'){
    const name = props.courseData[props.attributes.course_id][0]
    const enrolls =  props.courseData[props.attributes.course_id][1]
     
    
    return (
        <Card>
            <Coursename>{name}</Coursename>
            <Enrolls>Total Strength : <b>{enrolls}</b></Enrolls>
        </Card>
    )
        }
        location.reload()
    }
}

export default Course