import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class GlobalRpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if (rpcError.toString().includes("Empty response")) {
            return response.status(500).json({
                status: 500,
                message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
                error: "Internal Server Error",
            });
        }

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            const typedError = rpcError as { status: number | string; message: string };
            const status = isNaN(+typedError.status) ? 400 : +typedError.status;
            return response.status(status).json(rpcError);
        }

        response.status(400).json({
            status: 400,
            message: rpcError
        })
    }

}