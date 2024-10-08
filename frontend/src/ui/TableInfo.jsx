import React from 'react'
import { ReactComponent as CalendarIcon } from "../assets/icons/CalendarIcon.svg";
import { ReactComponent as SquareIcon } from "../assets/icons/SquareIcon.svg";
import { ReactComponent as ClockIcon} from "../assets/icons/ClockIcon.svg";
import { ReactComponent as DepartmentIcon} from "../assets/icons/DepartmentIcon.svg";
const TableInfo = ({ reference,createdAt, priority, category,projectName, last_reply_on }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="mt-1 flex space-x-2 divide-x text-xs">
      <div className="tooltip" data-tooltip="Reference">
        #{reference}
      </div>

      <div className="flex items-center gap-1 pl-2 tooltip" data-tooltip="Date">
        <CalendarIcon className="h-4 w-4 text-gray-400" />
        <span>  {formatDate(createdAt)}</span>
      </div>

      <div className={`flex items-center gap-1 pl-2 tooltip ${priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-orange-500' : ''}`} data-tooltip="Priority">
        <div className={`h-3 w-3 rounded-full ${priority === 'high' ? 'bg-red-500' : priority === 'medium' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
        <span>{priority}</span>
      </div>

      <div className="flex items-center gap-1 pl-2 tooltip" data-tooltip="Category">
        <SquareIcon className="h-4 w-4 text-gray-400" />
        <span>{category}</span>
      </div>

      <div className="flex items-center gap-1 pl-2 tooltip" data-tooltip="Last reply">
        <ClockIcon className="h-4 w-4 text-gray-400" />
        <span>{last_reply_on ? formatDate(last_reply_on) : '--'}</span>

      </div>
      <div className="flex items-center gap-1 pl-2 tooltip" data-tooltip="Project Name">
        <DepartmentIcon className="h-4 w-4 text-gray-400" />
        <span>{projectName}</span>

      </div>
    </div>
  )
}

export default TableInfo
