export type StatusType = 'In Progress' | 'Completed' | 'Unseen';
export type PriorityType = 'High' | 'Medium' | 'Low';

export interface ITicket {
  _id: string;
  title: string;
  description: string;
  status: StatusType;
  priority: PriorityType;
  ownerId: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  comments?: IComment[];
}

export interface IComment {
  _id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
} 