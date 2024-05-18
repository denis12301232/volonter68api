import { Elysia, type ElysiaConfig } from 'elysia';

export default class App extends Elysia {
  private readonly signals = ['SIGINT', 'SIGTERM'];

  constructor(config?: Partial<ElysiaConfig<'', false>>) {
    super(config);
    this.listeners();
  }

  private listeners() {
    this.signals.forEach((signal) => process.on(signal, this.shutdown.bind(this)));
  }

  private shutdown() {
    this.stop();
  }
}
