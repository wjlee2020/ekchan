export {};

declare global {
  type User = {
    readonly id: string;
    readonly token: string;
    readonly name: string;
    readonly email: string;
    readonly partnerId: string;
  };

  type Item = {
    readonly id: string;
    readonly created_at?: string;
    title: string;
    description: string;
    cost: string,
    paid: boolean,
    keihi_type_id?: number;
    keihi_type?: {
      name: string;
      id: number;
    }
  };
}
