// @flow
import { defaultServerIndex } from './config/servers';
import Store from 'electron-store';

const store: * = new Store();

const configuration = new class {
  get username(): string {
    return store.get('username');
  }
  set username(username: string): void {
    store.set('username', username);
  }

  get serverIndex(): number {
    const serverIndex = store.get('serverIndex');
    if (!serverIndex) {
      store.set('serverIndex', defaultServerIndex);
      return defaultServerIndex;
    }
    return serverIndex;
  }

  set serverIndex(serverIndex: number): void {
    store.set('serverIndex', serverIndex);
  }
}();

export default configuration;