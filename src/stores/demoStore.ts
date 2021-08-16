import { makeAutoObservable } from "mobx";

class DemoStore {
  constructor() {
    makeAutoObservable(this);
  }
}

export default DemoStore;
