export {};

declare global {
  type User = {
    readonly id: string;
    readonly token: string;
    readonly name: string;
    readonly email: string;
    readonly partner_id: string;
  };

  type Item = {
    readonly id: string;
    readonly created_at?: string | Date;
    title: string;
    description: string;
    cost: string,
    paid: boolean,
  };
}
