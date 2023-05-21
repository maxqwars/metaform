export enum METAFORM_ERROR {
  TIMEOUT_ERR = "TIMEOUT_ERR", // Appears if the time given to receive a response from the server has expired
  WRONG_PARAM_SET = "WRONG_PARAM_SET", // Occurs if, for example, you call getTitle() with `id` and `code` of different content
  REQ_PARAM_IS_MISSING = "REQ_PARAM_IS_MISSING", // Occurs when you do not pass the required parameter, for example by calling getTitle() without `id` or `code`.
}
