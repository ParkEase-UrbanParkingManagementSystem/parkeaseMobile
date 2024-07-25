// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ActivitiesScreen from '@/app/(routes)/(tabs)/_layout';

const App = () => {
    return (
        <NavigationContainer>
            <ActivitiesScreen />
        </NavigationContainer>
    );
};

export default App;
