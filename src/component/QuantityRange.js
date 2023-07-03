import { NumericTextBox } from '@progress/kendo-react-inputs';
import React, { useState } from 'react'


const QuantityRange = (props) => {
    const { item, getValue } = props
    const [value, setValue] = useState(1)


    const valueChange = (e) => {
        setValue(e.value)
        getValue(item)

    }

    return (
        <>
            <NumericTextBox
                width={80}
                defaultValue={1}
                min={1}
                value={value}
                onChange={(e) => {
                    valueChange(e)
                }}
            />

        </>
    )
}

export default QuantityRange