# Checkout Form

The "Checkout form" project is a web application that consists of a multi-step form, enabling users to complete all the necessary details for order shipment.

- [**DEMO**](https://coding-vibe.github.io/checkout-form/)

## Project Description

### General

This project aims to simplify the order placement process for users. It features a user-friendly multi-step form with smooth navigation and includes custom validation for each field to enhance the user experience. The form dynamically adapts to different devices, offering between four to six steps based on the user's selections.

### Key Features

**Dynamic Adaptation**

- The form dynamically adapts based on the user's selections in previous steps. Steps are added or removed from the interface to tailor the form to the user's choices.

**Modal Window for Leaving Page**

- A modal window opens if the user attempts to leave the page before submission the form.

**Edit Capability**

- Users can make edits at any step before submitting the final step.

**Local Storage for Form Data**

- Data about filled form fields is stored in local storage. Even if the page is reloaded, the stored data is retrieved, preventing users from having to refill the form.

## Core Technologies

The project was developed using the following core technologies:

- Material-UI (MUI)
- MUI React Final Form (MUI RFF)
- React
- React Final Form
- React Router DOM
- TypeScript
- Node v20
- npm v9.6.7

## Scripts

The project includes the following scripts that can be executed:

- `dev`: Launches the development mode using Vite.
- `build`: Compiles TypeScript and builds the project using Vite.
- `serve`: Launches a server to deploy the built project.
- `lint`: Runs ESLint to check the code style.
- `preview`: Launches a preview using Vite.
- `prettier-format`: Applies formatting using Prettier.

## Getting Started

1. Clone the repo to your local computer.
2. Run `npm install` to install the required dependencies.
3. To start the development mode, use the command `npm run dev`.
4. To build the project, use the command `npm run build`.
5. To launch the server for the built project, use the command `npm run serve`.
