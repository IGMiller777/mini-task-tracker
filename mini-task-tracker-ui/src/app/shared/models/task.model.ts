export interface TaskDTO {
  id: string;
  title: string;
  tasks: string;
  completed: boolean;
}

export interface TaskCreateDTO {
  title: string;
}

export interface TaskUpdateStatusDTO {
  id: string;
  completed: boolean;
}
