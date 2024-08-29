import {Tag} from "./Tag";

export type Task = {
  id: number;
  type: string;
  priority: string;
  endDate: Date;
  createAt: Date;
  state: string;
  description: string;
  done: boolean;
  tags: Array<Tag>
};
