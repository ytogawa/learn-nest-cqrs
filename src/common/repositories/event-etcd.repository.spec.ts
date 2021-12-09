import { Test, TestingModule } from '@nestjs/testing';
import { EtcdService } from '~/externals/etcd.service';
import { DomainEvent } from '../entities';
import { UuidValueObject, ValueObject } from '../value-objects';
import { EventEtcdRepository } from './event-etcd.repository';

class TestId extends UuidValueObject<'TestId'> {}
class TestValue extends ValueObject<string, 'Test'> {}
interface TestEventPayload {
  value: TestValue;
}
class TestEvent extends DomainEvent<TestId, TestEventPayload> {
  constructor(aggregateId: string, id: string, date: Date) {
    super(
      'Tested',
      new TestId(aggregateId),
      { value: new TestValue('test') },
      new UuidValueObject<'DomainEvent'>(id),
      date,
    );
  }
}

describe('a', () => {
  let service: EtcdService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [EtcdService],
    }).compile();

    service = app.get<EtcdService>(EtcdService);
  });

  afterEach(() => {
    service.unmock();
  });

  it('load', async () => {
    const repository = new EventEtcdRepository(service);
    const mock = service.mock({ exec: jest.fn() });
    const aggregateId = 'a156b3a9-1f64-44f9-83bb-3ef28e543fac';
    const testData = [
      {
        id: 'b46bbbe9-82ae-4fbf-8c75-304eaa5a13af',
        aggregateId,
        date: new Date('2021-03-01'),
      },
      {
        id: '932134f5-2b95-4a52-8302-d4a8c8c88045',
        aggregateId,
        date: new Date('2021-01-01'),
      },
      {
        id: '6d5f3355-3e7f-4060-b86b-008cb70123e2',
        aggregateId,
        date: new Date('2021-02-01'),
      },
    ];
    mock.exec.mockResolvedValue({
      kvs: testData.map((v) => {
        return {
          key: `test:${v.aggregateId}:${v.id}`,
          value: JSON.stringify(new TestEvent(aggregateId, v.id, v.date)),
        };
      }),
    });

    const events = await repository.load('test', new TestId(aggregateId));
    expect(events.length).toBe(3);
    expect(events[0].eventType).toBe('Tested');
    expect(events[0].id.value).toBe('932134f5-2b95-4a52-8302-d4a8c8c88045');
    expect(events[0].aggregateId.value).toBe(
      'a156b3a9-1f64-44f9-83bb-3ef28e543fac',
    );
    expect(events[0].occurredAt.getTime()).toBe(
      new Date('2021-01-01').getTime(),
    );
    expect(events[1].id.value).toBe('6d5f3355-3e7f-4060-b86b-008cb70123e2');
    expect(events[2].id.value).toBe('b46bbbe9-82ae-4fbf-8c75-304eaa5a13af');
  });
});
