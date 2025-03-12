import useCartStore from "@/store/cartStore";
import { COLORS } from "@/utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const CartButton = () => {
  const { count } = useCartStore();
  return <Text>{count}</Text>;
};

export default CartButton;

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    right: -10,
    bottom: -5,
    width: 20,
    height: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
