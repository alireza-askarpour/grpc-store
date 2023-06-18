import grpc from "@grpc/grpc-js"

export const grpcErrorHandler = (
  error: grpc.ServiceError | Error,
  callback: (err?: Error) => void
) => {
  if (error instanceof grpc.ServiceError) {
    const err: any = error
    const statusCode: grpc.status = err.code
    const message: string = err.message
    const details: string = err.details

    const grpcError: grpc.ServiceError = new Error(message) as grpc.ServiceError
    grpcError.code = statusCode
    grpcError.details = details

    callback(grpcError)
  } else {
    callback(error)
  }
}
