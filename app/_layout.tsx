import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/store/mmkv";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({
    storage,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Galatic products",
            headerShadowVisible: false,
            headerRight: () => <CartButton />,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: "",
            headerBackTitle: "Products",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
