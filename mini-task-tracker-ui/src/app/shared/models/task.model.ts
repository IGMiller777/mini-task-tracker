export interface TaskDTO {
  id: string;
  title: string;
  tasks: string;
  completed: boolean;
}

export interface TaskCreateDTO {
  title: string;
  completed: boolean;
}

export interface TaskUpdateStatusDTO {
  id: string;
  completed: boolean;
}
