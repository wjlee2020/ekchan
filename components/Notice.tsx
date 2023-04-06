import { Snackbar } from "react-native-paper";

type Notice = {
  snackbarText: string;
  isOpen: boolean;
  onDismiss: (close: boolean) => void;
  navigate?: (location: string) => void;
  navigateLocation?: string;
}

export default function Notice(props: Notice) {
  const { isOpen, snackbarText, onDismiss, ...rest } = props;

  return (
    <Snackbar
      visible={isOpen}
      onDismiss={() => onDismiss(false)}
      action={{
        label: "Close",
        onPress: () => {
          onDismiss(false);
          if (!rest.navigate || !rest.navigateLocation) return;
          rest.navigate(rest.navigateLocation);
        },
      }}
    >
      {snackbarText}
    </Snackbar>
  )
};
