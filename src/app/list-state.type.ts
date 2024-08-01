import { Task } from "./Task";

export type ListFetchingError = { status: number; message: string };

// idle - initial
type IdleState = {
  state: "idle";
};
// loading
type LodaingState = {
  state: "loading";
};
// success
type SuccessState<T> = {
  state: "success";
  results: T[];
};
// error
type ErrorState = {
  state: "error";
  error: ListFetchingError;
};

export type ComponentListState<T> = IdleState | LodaingState | SuccessState<T> | ErrorState;
