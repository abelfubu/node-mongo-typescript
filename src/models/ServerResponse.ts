export type CustomResponse = null | string | object | [];

export class ServerResponse {
  constructor(
    public success: boolean,
    public message: CustomResponse = 'Something went wrong in the server...',
    public result?: any
  ) { }
}
