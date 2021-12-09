import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ExampleCreateCommand,
  ExampleUpdateCommand,
  ExampleSearchQuery,
} from '~/domains/example/usecases';
import { Example, ExampleDetail, Examples } from '~/domains/example/entities';
import {
  ExampleDto,
  ExampleCreateDto,
  ExampleUpdateDto,
  ExampleDetailDto,
  ExampleIdDto,
  ExampleListQueryDto,
  ExampleListDto,
} from '~/domains/example/interfaces';
import { ExampleDetailQuery } from '~/domains/example/usecases/example.detail.query';

@Controller('examples')
export class ExampleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@Query() dto: ExampleListQueryDto): Promise<ExampleListDto> {
    const cond = ExampleListQueryDto.toDomain(dto);

    const query = new ExampleSearchQuery(cond);
    const examples = await this.queryBus.execute<ExampleSearchQuery, Examples>(
      query,
    );

    return ExampleListDto.fromDomain(examples);
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
  async post(@Body() dto: ExampleCreateDto): Promise<ExampleDto> {
    const state = ExampleCreateDto.toDomain(dto);

    const command = new ExampleCreateCommand(state);
    const example = await this.commandBus.execute<
      ExampleCreateCommand,
      Example
    >(command);

    return ExampleDto.fromDomain(example);
  }

  @Patch(':id')
  async patch(
    @Param() idDto: ExampleIdDto,
    @Body() bodyDto: ExampleUpdateDto,
  ): Promise<ExampleDto> {
    const id = ExampleIdDto.toDomain(idDto);
    const state = ExampleUpdateDto.toDomain(bodyDto);

    const command = new ExampleUpdateCommand(id, state);
    const example = await this.commandBus.execute<
      ExampleUpdateCommand,
      Example
    >(command);

    return ExampleDto.fromDomain(example);
  }
}
