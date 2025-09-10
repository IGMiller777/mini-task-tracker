export interface TaskDTO {
  id: string;
  name: string;
  tasks: string;
  status: boolean;
}

export interface TaskCreateDTO {
  name: string;
}

export interface TaskUpdateStatusDTO {
  status: boolean;
}
