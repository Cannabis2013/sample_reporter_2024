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
import Auth from './Services/Auth/notesAuth';
import UserPage from './Pages/UserDetails';
import { useState } from 'react';
import HomePage from './Pages/Home';
import SamplesListView from "./Pages/SamplesListViev";
import LocationsMapView from './Pages/LocationsMapView';
import LocationsListView from "./Pages/LocationsListView"
import LocationDetails from "./Pages/LocationDetails"
import UpdateSample from "./Pages/UpdateSample"

const Stack = createNativeStackNavigator();

Auth.initAuth()

export default function App() {
    const [signedIn, setSignedIn] = useState(false)

    Auth.onSignedInChanged((status) => {
        setSignedIn(status)
    })

    const headerOptions = {
        headerTitle: ""
    }

    function signedInBody() {
        return (
            <>
                <Stack.Screen name="Home" component={HomePage} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Samples list" component={SamplesListView} options={headerOptions}/>
                <Stack.Screen name="Locations list" component={LocationsListView} options={headerOptions}/>
                <Stack.Screen name="Locations map" component={LocationsMapView} options={headerOptions}/>
                <Stack.Screen name="Location details" component={LocationDetails} options={headerOptions}/>
                <Stack.Screen name="Create sample" component={CreateSample} />
                <Stack.Screen name="Sample details" component={SampleDetails} />
                <Stack.Screen name="Delete sample" component={DeleteSample} />
                <Stack.Screen name="Update sample" component={UpdateSample} />
                <Stack.Screen name="UserPage" component={UserPage} />
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


