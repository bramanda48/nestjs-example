import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDto } from '@system/dto';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
		const response = ctx.getResponse();		
        
        //Handle status statusCode
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        switch(exception.status) {
            case HttpStatus.SERVICE_UNAVAILABLE:
                statusCode = HttpStatus.SERVICE_UNAVAILABLE;
            break;
            case HttpStatus.NOT_ACCEPTABLE:
                statusCode = HttpStatus.NOT_ACCEPTABLE;
            break;
            case HttpStatus.EXPECTATION_FAILED:
                statusCode = HttpStatus.EXPECTATION_FAILED;
            break;
            case HttpStatus.BAD_REQUEST:
                statusCode = HttpStatus.BAD_REQUEST;
            break;
            case HttpStatus.SERVICE_UNAVAILABLE:
                statusCode = HttpStatus.SERVICE_UNAVAILABLE;
            break;
            case HttpStatus.NOT_FOUND:
                statusCode = HttpStatus.NOT_FOUND;
            break;
            case HttpStatus.UNAUTHORIZED:
                statusCode = HttpStatus.UNAUTHORIZED;
            break;
        }

        //Set message
        let message: string = (exception instanceof Error) ? exception.message: exception.message.error;
            message = (message.endsWith(".")) ? message: message+'.';


		//Declare standard api instance
		let result: ResponseDto = new ResponseDto();
		result.success = false;
		result.message = message;
        result.statusCode = statusCode;
        result.paging = null;

		response
			.status(statusCode)
			.send(result);
    }
}