import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/safescreen";

// SplashScreen.preventAutoHideAsync()
//   .then(result => console.log(`SplashScreen.preventAutoHideAsync successed: ${result}`))
//   .catch(console.warn);
// SplashScreen.setOptions({
//   duration: 4000,
//   fade: true,
// });

export default function RootLayout() {
  // const [appIsReady, setAppIsReady] = useState(false);
  
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 2000));
  //       console.log("SplashScreen hidden");
  //     } catch (e) {
  //       console.warn("Error hiding SplashScreen:", e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(() => {
  //   if (appIsReady) {
  //      SplashScreen.hideAsync();
  //     console.log("SplashScreen hidden");
  //   }
  // }, [appIsReady]);


  // if(!appIsReady) {
  //   return null;
  // }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(postdetail)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
