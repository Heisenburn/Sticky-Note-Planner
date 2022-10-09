import React, { useState } from 'react'
import { Checkbox } from 'react-native-ui-lib'

export const CustomCheckbox = () => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <Checkbox
            style={{
                marginRight: 20,
            }}
            value={isChecked}
            onValueChange={(value) => setIsChecked(value)}
        />
    )
}
