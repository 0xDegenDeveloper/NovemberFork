import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const themeLookupTable = {
  "/": ["#0f2729", "#C4EDD8", "#C4EDD888", `/`], // , acedcb
  "/algorithms": ["#17143c", "#bcbad4", "#bcbad488", `/algorithms`],
  "/physicals": ["#4E082B", "#FFE8E6", "#FFE8E688", `/physicals`],
  "/more": ["#052C3B", "#cde8e6", "#cde8e688", `/more`],
  "/studio": ["#06324D", "#15B5E5", "#15B5E588", `/studio`],
};

export function useRouteChange() {
  const location = useLocation();
  // console.log(location);
  const initialTheme =
    themeLookupTable[location.pathname] || themeLookupTable["/"];
  const [theme, setTheme] = useState(initialTheme);

  useLayoutEffect(() => {
    setTheme(handleRouteChange(location.pathname));
  }, [location]);

  return theme;
}

const handleRouteChange = (route) => {
  const theme = themeLookupTable[route] || themeLookupTable["/"];

  document.documentElement.style.setProperty("--main-dark-color", theme[0]);
  document.documentElement.style.setProperty("--main-light-color", theme[1]);
  document.documentElement.style.setProperty("--main-lightest-color", theme[2]);

  return theme;
};
