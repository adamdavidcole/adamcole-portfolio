import * as React from "react";
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { device } from "./utility/style-constants";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Projects from "./components/Projects";
import fetchData from "./data/fetch-data";
import { useState, useEffect } from "react";
import {
  getSortedFeaturedProjects,
  getSortedProjects,
} from "./data/data-selectors";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 80%;

    @media ${device.tablet} {
      font-size: 100%;
    }
  }

  #root {
    overflow-x: hidden;
  }
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.limitHeightToScreen ? "100vh" : "auto")};
`;

export default function App() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setProjectData(data);
    });
  }, []);

  const featuredProjects = getSortedFeaturedProjects(projectData);
  const projects = getSortedProjects(projectData);

  return (
    <div>
      <GlobalStyle />
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home featuredProjects={featuredProjects} />} />
          <Route path="about" element={<About />} />
          <Route
            path="projects/:projectId"
            element={<Projects projects={projects} />}
          />
          <Route path="projects" element={<Projects projects={projects} />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  const location = useLocation();

  return (
    <LayoutContainer limitHeightToScreen={true}>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

      <Navigation />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </LayoutContainer>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
