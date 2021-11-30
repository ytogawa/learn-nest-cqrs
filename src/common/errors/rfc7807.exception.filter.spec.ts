import {
  BadRequestException,
  ArgumentsHost,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Rfc7807ExceptionFilter } from '~/common/errors/rfc7807.exception.filter';
import { DomainError } from './domain.error';

const mockResponse = {
  type: jest.fn((_contentType: string) => mockResponse),
  status: jest.fn((_statusCode: number) => mockResponse),
  send: jest.fn((_payload: unknown) => mockResponse),
};
const mockCtx: HttpArgumentsHost = {
  getRequest: jest.fn(),
  getResponse: jest.fn((): any => mockResponse),
  getNext: jest.fn(),
};
const mockHost: ArgumentsHost = {
  getArgs: jest.fn(),
  getArgByIndex: jest.fn(),
  switchToRpc: jest.fn(),
  switchToHttp: jest.fn(() => mockCtx),
  switchToWs: jest.fn(),
  getType: jest.fn(),
};

describe(Rfc7807ExceptionFilter.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe(Rfc7807ExceptionFilter.prototype.catch.name, () => {
    describe('HttpExceptionをRFC7807形式に変換できる', () => {
      it('パラメータなし', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new BadRequestException();
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          title: 'Bad Request',
          status: 400,
        });
      });

      it('文字列のメッセージ', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new ConflictException('message');
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          title: 'Conflict',
          status: 409,
          detail: 'message',
        });
      });

      it('文字列のメッセージと詳細', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new ForbiddenException('message', 'error');
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          title: 'error',
          status: 403,
          detail: 'message',
        });
      });

      it('オブジェクトのメッセージ', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new NotFoundException({
          type: '/url/to/type',
          detail: 'detail',
          instance: '/url/to/resource',
          value1: 'test',
          value2: 0,
          value3: false,
        });
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          type: '/url/to/type',
          title: 'Not Found Exception',
          status: 404,
          detail: 'detail',
          instance: '/url/to/resource',
          value1: 'test',
          value2: 0,
          value3: false,
        });
      });
    });

    describe('ErrorをRFC7807形式に変換できる', () => {
      it('Error', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new Error('test');
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          title: 'Error',
          status: 500,
          detail: 'test',
        });
      });

      it('DomainError', () => {
        const filter = new Rfc7807ExceptionFilter();
        const exception = new DomainError('test');
        filter.catch(exception, mockHost);
        expect(mockResponse.send.mock.calls[0][0]).toStrictEqual({
          title: 'DomainError',
          status: 500,
          detail: 'test',
        });
      });
    });
  });
});
