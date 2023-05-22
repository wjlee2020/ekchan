const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#303F46',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#000',
    background: '#303F46',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export const initialKeihiState = {
  id: "",
  cost: "",
  description: "",
  keihi_type: null,
  keihi_type_id: undefined,
  paid: false,
  title: "",
  user: "",
  user_id: ""
};
