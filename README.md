# @can-it/react

`@can-it/react` is a React library designed to simplify the implementation of authorization in your application. The library provides a straightforward way to integrate complex authorization scenarios into your app within minutes using the `CanItProvider`.

## Features

- **Simplified Authorization Implementation:** `CanItProvider` makes it easy to add authorization functionality to your React app.

- **Support for Nested Authorization Scenarios:** The library accommodates nested authorization scenarios, making it ideal for applications with multiple authorization contexts.

## Installation

To install `@can-it/react`, you can use npm, yarn, or pnpm. Run one of the following commands in your project directory:

```shell
npm install @can-it/react
```

```shell
yarn add @can-it/react
```

```shell
pnpm add @can-it/react
```

## Usage

1. Import the `CanItProvider` into your React application's component:

    ```tsx
    import { CanItProvider } from '@can-it/react';

    export function HomeComponent() {
      return (
        <CanItProvider>
          <ProductComponent />
        </CanItProvider>
      );
    }
    ```

2. Use the `useCanIt` hook to check whether a specific action can be performed, `usePolicyState` to retrieve the current Policy, and `usePolicyStore` to update the Policy:

    ```tsx
    // some-component.tsx
    import { usePolicyStore, usePolicyState, useCanIt } from '@can-it/react';

    export function ProductComponent() {
      // using hook to check whether a specific action can perform
      const isAllowed = useCanIt('edit', 'products');

      const { policy } = usePolicyState();

      // using hook to update policy
      const { update, set } = usePolicyStore();
      // set({ allow: [['view', 'products']] })
      // update(prePolicy => ({ allow: [['view', 'products']] }))

      if (isAllowed) {
        return <>You can edit products</>;
      }

      // using component
      return <CanIt allowTo={['view', 'products']} else="You can NOT view component">You can view products</CanIt>;
    }
    ```
