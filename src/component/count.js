import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

const Count = () => {

    const dispatch = useDispatch()
    const display = useSelector((store) => store.count)

    console.log(display)

    return (
        <div>
            <h1>{display}</h1>
            <button type="button" onClick={() =>
                dispatch({ type: "INCREMENT" })
            }>Inc</button>
            <button type="button" onClick={() => dispatch({ type: "DECREMENT" })}>Desc</button>
        </div>
    )
}


export default Count