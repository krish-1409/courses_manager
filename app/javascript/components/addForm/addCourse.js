import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    h5{
        font-weight: 100;
        padding: 0;
    }
`
const Field = styled.div`
    padding: 10px;

    input{
        border-radius: 5px;
        width: 25%;
        Height: 25px;
        box-shadow: 0 8px 6px -6px black;
    }

`

const AddBtn = styled.button`
    font-size: 20px;
    box-shadow: 0 8px 6px -6px black;
`

const addCourse = () => {
    return(
        <Wrapper>
            <h2>Enter a new Course Name to Add</h2>
            <h5>*There may be multiple courses with same name.</h5>
            <h5>(Duplication not considered.)</h5>
            <form action="">
                <Field>
                    
                    <input type="text" placeholder="Enter Course Name" />
                </Field>
            <Field>
            <AddBtn type="submit">Add Course</AddBtn>
            </Field>
            </form>


        </Wrapper>
    )
}

export default addCourse