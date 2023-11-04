# Pomodoro Timer

This is a pomodoro timer.

## Demo

[**Deployed on GitHub Pages**](https://nickau309.github.io/pomodoro-timer/)

## Features

- Break the work into intervals and separate them by short breaks
- Encourage users to fully focus on their work, and take a break occasionally to restore the energy
- Boost productivity if users use this timer with good work planning

## Optimizations

- Refactor with TDD methodology to improve the design without breaking any functionality

## Tech Stack

### TypeScript

- Perform static type checking to find potential type errors at compile time

### React

- Build the UI of the app
- Handle the logic of the app with contexts and custom hooks
- [Headless UI](https://github.com/tailwindlabs/headlessui) is used to get some unstyled and fully accessible UI components
- Built-in hooks used:
  - `useCallback`
  - `useContext`
  - `useEffect`
  - `useId`
  - `useImperativeHandle`
  - `useMemo`
  - `useReducer`
  - `useRef`
  - `useState`

### Vitest + React Testing Library

- Conduct integration tests to ensure the robustness of the app

### Tailwind CSS

- Flexbox
- Grid
- Responsive design

### ESLint

- Analyze the code statically to identify and avoid errors

### Prettier

- Format the code in a consistent style
