import React from "react";
import ReactDOM from "react-dom/client";

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import ErrorPage from "./error-page";
import Index from "./routes/index";
import EditContact, { action as editAction } from "./routes/edit";

import "./index.css";

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

import DestroyContact, { action as destroyAction } from "./routes/destroy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            element: <DestroyContact />,
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          { index: true, element: <Index /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
