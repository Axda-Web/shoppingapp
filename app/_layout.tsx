import { Stack, useNavigationContainerRef } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import CartButton from "@/components/CartButton";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { storage } from "@/store/mmkv";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";
import { useEffect } from "react";
// import * as Spotlight from "@spotlightjs/spotlight";

// if (process.env.NODE_ENV === "development") {
//   Spotlight.init();
// }

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true, // Only in native builds, not in Expo Go.
});

Sentry.init({
  dsn: "https://7544ac39bf7e17a1afe25b1e87f1972b@o4508969201369088.ingest.de.sentry.io/4508969218146384",
  attachScreenshot: true,
  debug: false,
  tracesSampleRate: 1.0, // Adjust this value in production
  _experiments: {
    profilesSampleRate: 1.0, // Only during debugging, change to lower value in production
    replaysSessionSampleRate: 1.0, // Only during debugging, change to lower value in production
    replaysOnErrorSampleRate: 1,
  },
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: true,
      maskAllVectors: false,
    }),
    Sentry.spotlightIntegration(),
    navigationIntegration,
  ],
});

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

  const ref = useNavigationContainerRef();

  useEffect(() => {
    navigationIntegration.registerNavigationContainer(ref);
  }, [ref]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              presentation: "modal",
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.dismiss()}>
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
