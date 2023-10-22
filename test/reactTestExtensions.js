/**
 * Helper methods for React component tests
 */ 

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
}


