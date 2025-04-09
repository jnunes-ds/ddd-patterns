import Notification from "@domain/@shared/notification/notification";

export default abstract class Entity {
  protected _id: string;
  protected readonly notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}