npm install -g @aws-amplify/cli -> one time to install amplify cli globally

npm add @aws-amplify/ui-react @aws-amplify/ui-react-storage aws-amplify

amplify init

amplify console -> to get aws console

amplify add storage

options

- content - images, videos, files etc
- add cognito auth
- default
- email only
- auth and guest users
- create, update and delete
- no lambda trigger needed

amplify push

https://youtu.be/mRUPnke5zNg

enable amplify studio

create data model

- Post
  - id
  - body
  - images - is array
    all are type string
    save and deploy
    - creates appsync with dynamodb
