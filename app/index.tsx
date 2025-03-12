import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts, Product } from "@/utils/api";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { COLORS } from "@/utils/colors";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const headerHeight = useHeaderHeight();

  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const allCategories = ["all", ...categories];

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      if (selectedCategory !== "all") {
        return product.category === selectedCategory;
      }
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery, selectedCategory]);

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    return <ProductCard product={item} />;
  }, []);

  return (
    <View
      style={[
        styles.container,
        { marginTop: Platform.select({ ios: headerHeight, android: 0 }) },
      ]}
    >
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <View style={styles.categoryContainer}></View>
      <FlashList
        data={filteredProducts}
        renderItem={renderProduct}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    height: 60,
    zIndex: 1,
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
  },
  categoryScrollView: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    alignSelf: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  selectedCategoryText: {
    color: "#fff",
  },
});
