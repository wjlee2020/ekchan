export {};

declare global {
  type User = {
    readonly id: string;
    readonly token: string;
    readonly email: string;
  };
}
