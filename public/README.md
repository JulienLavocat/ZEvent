# Vite-React-Typescript-Tailwind-Cypress

Template to have a preconfigured project using :

- Vite
- Yarn
- React
- Typescript
- Tailwind
- Cypress
- react-router-dom
- Redux / redux-toolkit
- Prettier
- ESLint

## Getting started

1. Clone the repository
2. Install dependencie: `yarn`
3. Start coding your application however you want and add your routes in `src/Router.tsx`

## Usage

### React-router-dom

This template uses `react-router-dom` configured with a BrowserRouter and a route config (see: https://v5.reactrouter.com/web/example/route-config)don't forget to add your routes and layouts there.

### Redux

Redux / Redux toolkit comes with an already added store in `src/store.ts` you just have to create your slices and add them to the store (see: https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice). You will also find typed `useDispatch` and `useSelector` in the store, respectively `useAppDispatch` and `useAppSelector` (see: https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks).

### About default values (code style rules, etc.)

Most components comes pre-configured using values derived from my personal preferences, feel free to change it.
