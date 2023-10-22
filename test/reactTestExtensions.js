import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) =>
  act(() =>
    ReactDOM.createRoot(container).render(component)
  );

export const click = (element) =>
  act(() => element.click());

export const submit = (formElement) => {
    // We need to make sure the event bubbles; otherwise, it won’t make it to our event handler
    // React has its own event handling system that is triggered by events reaching the React root element.
    // The submit event must bubble up to our container element before React will process it.
    const event = new Event("submit", { bubbles: true, cancelable: true } );
    act(() => formElement.dispatchEvent(event));
    return event;
};

export const element = (selector) =>
  document.querySelector(selector);

export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const typesOf = (elements) =>
  elements.map((element) => element.type);

export const textOf = (elements) =>
  elements.map((element) => element.textContent);

export const form = (id) => element("form");

export const field = (fieldName) => form().elements[fieldName];
