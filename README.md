# wupzy

### Requirements

  - [Node.js](https://nodejs.org/en/)
  - [Yarn](https://yarnpkg.com/)

### Install dependencies

    yarn install

### Create table

    yarn prisma db push

### To see the database

    yarn prisma studio

### Generate Prisma Client

    yarn prisma generate

### Run the app

    yarn start

### Run the app in development mode
  
    yarn dev


## Stripe

### To start the stripe cli
    If first terminal:
    stripe listen --forward-to localhost:3000/api/stripe-webhook

### Trigger a test event
    If second terminal:
    stripe trigger payment_intent.succeeded

