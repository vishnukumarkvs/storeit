# Storeit

A simple cloud storage app where users can upload any file and can search for it instantly.

URL - https://storeit.vishnukvs.xyz/

![Homepage](https://github.com/vishnukumarkvs/storeit/assets/116954249/aa1c6ba3-aa88-416c-aa3e-8c1c21f8ca26)


## Tech Stack

-  AWS Ampliy [Inbuitl - Cognito for Auth, S3 for storage, DynamoDB and AppSync for data model]
-  Nextjs
-  Tailwindcss

## About

- Built the app using Nextjs and AWS Amplify
- Used amplify auth which uses cognito in backend
- Used amplify storage for content which uses S3 in backend
- Created a data model inside Amplify Studio.
```
Data Model

Post
- id
- note
- files
- username
```
- Datamodel uses Dynamodb as database and AWS AppSync for graphql query capability
- Used DataStore and Storage to save and retrieve data from amplify backend
- Hosted application in Aws Amplify through Github source
