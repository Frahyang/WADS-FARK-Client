import React from 'react'
import { StatusType } from '../types/ticket'

interface Props {
    status: StatusType
}

const StatusDisplay: React.FC<Props> = ({ status }) => {
    const styles = {
        container: "px-2 py-1 rounded-full text-xs font-medium",
        "In Progress": "bg-blue-100 text-blue-800",
        "Completed": "bg-green-100 text-green-800",
        "Unseen": "bg-gray-100 text-gray-800"
    }

    return (
        <span className={`${styles.container} ${styles[status]}`}>
            {status}
        </span>
    )
}

export default StatusDisplay