import React, { useState } from "react";
import { PriorityType, StatusType, ITicket } from "../types/ticket";
import PriorityDisplay from "./PriorityDisplay";
import StatusDisplay from "./StatusDisplay";
import AdminTicketPopup from "./AdminTicketPopUp";
import { ticketService } from "../api/api";

interface Props extends ITicket {
  onTicketUpdate?: () => void;
}

const AdminTicket: React.FC<Props> = ({
  _id,
  title,
  description,
  status,
  priority,
  ownerId,
  assignedTo,
  createdAt,
  onTicketUpdate
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleStatusChange = async (newStatus: StatusType) => {
    try {
      await ticketService.updateTicketStatus(_id, newStatus);
      onTicketUpdate?.();
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const handlePriorityChange = async (newPriority: PriorityType) => {
    try {
      await ticketService.updateTicketPriority(_id, newPriority);
      onTicketUpdate?.();
    } catch (error) {
      console.error('Failed to update ticket priority:', error);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {ownerId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {assignedTo || 'Unassigned'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PriorityDisplay priority={priority} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusDisplay status={status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View Details
        </button>
      </td>
      {isPopupOpen && (
        <AdminTicketPopup
          ticket={{
            _id,
            title,
            description,
            status,
            priority,
            ownerId,
            assignedTo,
            createdAt,
            updatedAt: createdAt
          }}
          onClose={() => setIsPopupOpen(false)}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
        />
      )}
    </tr>
  );
};

export default AdminTicket;
