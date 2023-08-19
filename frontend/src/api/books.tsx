import axios from "axios";
import { APIResponse } from "utils/interfaces";
import { QueryFunctionContext } from "react-query";

export const getBooks = async (
  context: QueryFunctionContext<[string, number]>,
): Promise<APIResponse> => {
  const [queryKey, count] = context.queryKey;
  return axios.get("http://localhost:8000/api/books/?count=" + count);
};
