import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ExampleCreateCommand, ExampleSearchQuery } from '~/example/usecases';
import { ExampleDetail, Examples } from './entities';
import {
  ExampleCreateDto,
  ExampleDetailDto,
  ExampleIdDto,
  ExampleListQueryDto,
  ExampleListDto,
} from '~/example/interfaces';
import { ExampleDetailQuery } from './usecases/example.detail.query';

@Controller('examples')
export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() dto: ExampleListQueryDto): Promise<ExampleListDto> {
    const cond = ExampleListQueryDto.toEntity(dto);

    const query = new ExampleSearchQuery(cond);
    const examples = await this.queryBus.execute<ExampleSearchQuery, Examples>(
      query,
    );

    return ExampleListDto.fromEntity(examples);
  }

  @Get(':id')
  async get(@Param() dto: ExampleIdDto): Promise<ExampleDetailDto> {
    const id = ExampleIdDto.toDomain(dto);

    const query = new ExampleDetailQuery(id);
    const exampleDetail = await this.queryBus.execute<
      ExampleDetailQuery,
      ExampleDetail
    >(query);

    return ExampleDetailDto.fromDomain(exampleDetail);
  }

  @Post()
  async post(@Body() dto: ExampleCreateDto): Promise<ExampleDetailDto> {
    const props = ExampleCreateDto.toDomain(dto);

    const command = new ExampleCreateCommand(props);
    const exampleDetail = await this.commandBus.execute<
      ExampleCreateCommand,
      ExampleDetail
    >(command);

    return ExampleDetailDto.fromDomain(exampleDetail);
  }
}
