export type CreateTaskDTO = {
  id: number;
  type: string;
  priority: string;
  description: string;
  TagIds: Array<number>
};
