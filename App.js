import 'react-native-get-random-values'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateSample from "./Pages/CreateSample";
import SampleDetails from "./Pages/SampleDetails";
import DeleteSample from "./Pages/DeleteSample";
import SignInPage from './Pages/SignIn';
import StartPage from './Pages/Start';
import SignUpPage from './Pages/SignUp';
import { initAuth, onSignedInChanged } from './Services/Auth/notesAuth';
import UserPage from './Pages/UserDetails';
import { useState } from 'react';
import HomePage from './Pages/Home';
import SampleMapView from './Pages/SampleMapView';
import SamplesListView from "./Pages/SamplesListViev";
import SamplesMapView from './Pages/SamplesMapView';

const Stack = createNativeStackNavigator();

initAuth()

export default function App() {
    const [signedIn, setSignedIn] = useState(false)

    onSignedInChanged((status) => {
        setSignedIn(status)
    })

    function signedInBody() {
        return (
            <>
                <Stack.Screen name="Notes Menu" component={HomePage} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Samples List" component={SamplesListView} />
                <Stack.Screen name="Create sample" component={CreateSample} />
                <Stack.Screen name="Samples Map" component={SamplesMapView}/>
                <Stack.Screen name="Sample details" component={SampleDetails} />
                <Stack.Screen name="Delete note" component={DeleteSample} />
                <Stack.Screen name="UserPage" component={UserPage} />
                <Stack.Screen name='SampleCreateMap' component={SampleMapView}
                    options={{ title: "Select location" }} />
            </>
        )
    }

    function signedOutBody() {
        return (
            <>
                <Stack.Screen name='Start' component={StartPage} />
                <Stack.Screen name='SignIn' component={SignInPage} />
                <Stack.Screen name='SignUp' component={SignUpPage} />
            </>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {signedIn ? signedInBody() : signedOutBody()}
            </Stack.Navigator>
        </NavigationContainer >
    );
}


