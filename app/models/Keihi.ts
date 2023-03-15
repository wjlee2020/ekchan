export interface  Item {
  id: string;
  title: string;
  cost: string,
  paid: boolean,
};

export interface ItemProps {
  item: Item;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  styles?: {
    title: string,
  };
}
