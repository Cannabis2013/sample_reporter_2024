# MyNotebook
## Developed by: Martin Hansen
## Short description
A small student project developed with React Native using Google Firebase.
## Target platform
Android

# Features and libraries

* Functionality fully supported
  * Signin/signup user
  * User authentication
  * Add new note
  * See all notes
  * See a single note
  * Delete a single note
  * Image capturing for storing images
* Technologies/packages
  * Expo-File-System
    * For saving to local storage
  * Expo-image-picker
    * For capturing images
  * Expo navigation
    * Provides the navigation header
    * Provides page navigation
  * Google Firebase
    * Used to store notes in Firestore database
  * Google Firebase authentication
    * For user signup and signin
# Running requirements
To avoid repetetive credentials entering i'm using hardcoded credentials provided by a file *authCredentials.js*. When implemented correctly, all you have to do on
the signin page, is clicking ok. This is done for obviosly security reasons in the case using a password used elsewhere. 

In order to run successfully you must create a file *authCredentials.js* and put it in a folder *Credentials* in the root folder.  

*authCredentials.js*  
```javascript
// Important! This files should not be tracked by any VCS for security reasons
export const authUsername = "{Username}"
export const authPassword = "{Password}"
```



# Report

A written report in PDF can be found in the *Docs* folder located in root.
