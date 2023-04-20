# Kyle's notes

This is a take home test I did for an interview in April 2023.
The goal was to build a simple SPA app and demonstrate proficiency with React and front end development.

## What you will see in this app:

- Use of hooks like `useState` and `useEffect`–These are the bread and butter for any React developer.
- Semantic HTML–Front end devs should strive to become great authors of semantic HTML. The web specs exist for a reason. There's only ~2 components here that have `div` elements, and 1 component that has `span` elements.
- CSS–No styled components or Tailwind CSS, and no pre-processing (e.g., no SASS or LESS). Didn't wanna overkill on a quick project like this.
- Basic error handling.
- Notifications.
- `.env` file–I added it and `dotenv` just to demonstrate that I am aware of system environment variables.
- `volta`–It's a great tool that I add to Node projects, so that I don't have to use `nvm` to manage Node versions.

## What you won't see in this app:

- JSON placeholder API–I swapped out `json-server` since it will persist changes. Run `npm run server` to start the `json-server`.
- Tests–The company provided a skeleton app with a 2.5 year old version of React. The skeleton was _not_ bootstrapped with `create-react-app` and there was no set up for running tests. I wanted to be faithful to the Node and React versions they provisioned, and it proved too much effort to set this old app up for testing–especially considering it's just a take home test.
- CRUD–the instructions did not ask for the D, so this app only supports the C, R, and U.
- Use of `useContext`–Global state management was not warranted since there were no context-aware UI elements.
- Use of `useMemo` or `useCallback`–Couldn't justify these optimizations.
- Authentication–There's no time to implement an authentication flow in a take home project like this.
- Routing–No time.
- Robust error handling–No retries or graceful degradation.
- No lazy loading or other performance optimizations–Just not needed here.
- No TypeScript–I wouldn't bother with TypeScript unless it was a project I'm spending ≥ 2 weeks on.

👇 Below are the original `README.md` notes from the original take home assignment. What you don't see are other instructions like "Do not use component libraries like Material UI", because those instructions were included in an email.

# react-assessment

A take-home coding assignment for React/front-end job candidates.

## Building and running in development mode

Install dependencies with `yarn` or `npm install`.

Run in development mode with `yarn start` or `npm run start`, view at `http://localhost:8080/`.

## Instructions

The sample app is just one page representing a users-management UI in a typical web app. Please complete the tasks below in any way you feel is effective and efficient — you can approach state management however you see fit, add dependencies if necessary, etc.

Localization is not required. Browser support is modern browsers only (i.e., no need to consider IE 11 if the question arises).

There are some small bugs/deliberate omissions in the codebase that you may need to find and address in order to complete the tasks, or simply improve the code.

### Features

1. Make a network request to [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) and use the response to populate the `UsersTable`, sorted by the `username` field, when the page loads.
2. Extend the `UserForm` to allow for adding a new user into the `UsersTable`. All three fields should be supplied to make an addition.
3. Refactor the the `UsersTable` so that entries contain an “Edit” button on the right. When clicked, populate the form with the user details and allow updating the user in the table with changes.
4. Style the `UsersTable` to better match the design comp provided in this project's `mockups` folder.

### Submission

Submit the link to your GitHub fork via the form provided on Coderbyte.
