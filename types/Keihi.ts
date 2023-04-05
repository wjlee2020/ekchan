export type ItemProps = {
  item: Item;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  styles?: {
    title: string,
  };
}
