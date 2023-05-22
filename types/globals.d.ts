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
    cost: string;
    description: string;
    keihi_type: {
      name: string;
      id: number;
    } | null;
    keihi_type_id?: number;
    paid: boolean;
    title: string;
    user: string;
    user_id: string;
  };
}
