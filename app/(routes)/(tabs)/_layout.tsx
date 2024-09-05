import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="history.screen" options={{ headerShown: false }} />
            <Stack.Screen name="onGoing.screen" options={{ headerShown: false }} />
            <Stack.Screen name="permits.screen" options={{ headerShown: false }} />
        </Stack>
    );
};

export default Layout;
