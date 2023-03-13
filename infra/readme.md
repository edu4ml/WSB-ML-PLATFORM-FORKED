
# Command Bus

> Command Pattern - decoupling what is done from who does it.

```python
command_bus = CommandBus()

command_bus.register(command=DummyCommand, to=DummyService)

command_bus.issue(DummyCommand(foo='Bar'))

assert DummyService.called
```