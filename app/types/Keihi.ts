export type Item = {
  readonly id: string;
  title: string;
  cost: string,
  paid: boolean,
};

export type ItemProps = {
  item: Item;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  styles?: {
    title: string,
  };
}
