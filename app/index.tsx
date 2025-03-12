import { Text, View, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "@/utils/api";

export default function Index() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Text style={{ color: "black" }}>{item.title}</Text>
        )}
      />
    </View>
  );
}
