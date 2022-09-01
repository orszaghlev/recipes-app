# recipes-app
A single page app, which lets you read and upload recipes in Hungarian. The recipes that were created by users of this app will be stored in the backlog first. The admin can edit, delete or publish your recipes, the published recipes will become available for reading for all users.
The initial idea and database came from an exercise I found on [Kódbázis](https://kodbazis.hu).

## Deploy

Create a Firebase project, use the Firestore database to store recipes.  
You can use the JSON data from the src/data folder or you can add your own recipes as well.

Create your local .env file and include the following lines:

```
REACT_APP_FIREBASE_API_KEY="your-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"
REACT_APP_FIREBASE_ADMIN_UID="your-admin-uid"
```

After you have created the .env file, use the following commands to deploy the application:

```
npm install
npm run build
firebase deploy
```

## Preview

https://recipes-app-d2bcd.web.app