import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from '@nestjs/platform-fastify/node_modules/fastify';

interface Rfc7807 {
  type?: string; // エラーのドキュメントへのURI
  title: string; // 人間が読めるタイトル
  status: number; // HTTP Status Code
  detail?: string; // 人間が読める詳細
  instance?: string; // 対象のリソースのURI
  [key: string]: unknown; // 追加情報
}

interface NestHttpExceptionBody {
  statusCode: number;
  message: string | object;
  error?: string;
}

function isBody(
  obj: Partial<NestHttpExceptionBody>,
): obj is NestHttpExceptionBody {
  return !!obj.message && !!obj.statusCode;
}

@Catch()
export class Rfc7807ExceptionFilter implements ExceptionFilter {
  private fromHttpException(exception: HttpException): Rfc7807 {
    const status = exception.getStatus();
    const resp = exception.getResponse();

    if (typeof resp === 'string') {
      return {
        title: resp,
        status,
      };
    }

    if (isBody(resp)) {
      if (resp.error) {
        const title = resp.error;
        if (typeof resp.message === 'string') {
          return {
            title,
            status,
            detail: resp.message,
          };
        }
        return {
          title,
          status,
          ...resp.message,
        };
      }

      return {
        title: resp.message as string, // errorがないときは必ずmessageがstringになる
        status,
      };
    }

    return {
      title: exception.message,
      status: exception.getStatus(),
      ...resp,
    };
  }

  private fromError(exception: Error): Rfc7807 {
    return {
      title: exception.name,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: exception.message,
    };
  }

  private toProblem(exception: unknown): Rfc7807 {
    if (exception instanceof HttpException) {
      return this.fromHttpException(exception);
    }
    if (exception instanceof Error) {
      return this.fromError(exception);
    }
    return {
      title: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      detail: 'Au unknown error occured.',
    };
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const problem = this.toProblem(exception);

    response
      .type('application/problem+json')
      .status(problem.status)
      .send(problem);
  }
}
