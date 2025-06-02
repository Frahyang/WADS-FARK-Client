import React from 'react'
import { PriorityType } from '../types/ticket'

interface Props {
    priority: PriorityType
}

const PriorityDisplay: React.FC<Props> = ({ priority }) => {
    const styles = {
        container: "px-2 py-1 rounded-full text-xs font-medium",
        "High": "bg-red-100 text-red-800",
        "Medium": "bg-yellow-100 text-yellow-800",
        "Low": "bg-green-100 text-green-800"
    }

    return (
        <span className={`${styles.container} ${styles[priority]}`}>
            {priority}
        </span>
    )
}

export default PriorityDisplay