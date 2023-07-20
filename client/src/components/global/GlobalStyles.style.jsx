import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    :root {
        --main-dark-color: #0f2729;
      --main-light-color: #C4EDD8;
      --main-lightest-color: #C4EDD888;
      --background-url: ${(props) =>
        `url(${import.meta.env.VITE_DOMAIN}/backgrounds/root_bg2.png)`};
      --test: 'test';
    }



  

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      ${"" /* background-color: black; */}
    }

    html {
      scroll-behavior: smooth;
    }

    body {
        background-image: var(--background-url);
        ${"" /* background-color: black; */}
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
     @font-face {
    font-family: 'Baloo Bhaijaan 2';
    src: ${(props) =>
      `url(${
        import.meta.env.VITE_DOMAIN
      }/fonts/Baloo_Bhaijaan_2/BalooBhaijaan2-VariableFont_wght.ttf)`};
    font-weight: 700;
  }

 
    @font-face {
      font-family: "Cairo";
      src: ${(props) =>
        `url(${
          import.meta.env.VITE_DOMAIN
        }/fonts/Cairo/static/Cairo-Bold.ttf)`};
      font-weight: 700;
    }

    @font-face {
      font-family: "Lato";
      src: ${(props) =>
        `url(${import.meta.env.VITE_DOMAIN}/fonts/Lato/Lato-BlackItalic.ttf)`};
      font-weight: 800;
    }

    // left here

    @font-face {
      font-family: "Museo Moderno";
      src: ${(props) =>
        `url(${
          import.meta.env.VITE_DOMAIN
        }/fonts/MuseoModerno/static/MuseoModerno-SemiBoldItalic.ttf)`};
      ${"" /* font-weight: 500; */}
    }


    a {
    text-decoration: none;
    }
  
    h1 {
      color: var(--main-light-color);
      font-size: 30px;
      ${"" /* font-family: "Cairo", sans-serif; */}
      cursor: default;
    }

    h2 {
      color: var(--main-dark-color);
      font-size: clamp(1.75rem, 3vw, 29px);
      font-family: "Cairo", sans-serif;
      padding-bottom: 1.5rem;
      cursor: default;

    }

    h3 {
      color: var(--main-light-color);
      font-size: clamp(1.2rem, 3vw, 26px);
      font-family: "Lato", sans-serif;
      cursor: default;

    }

    p {
      font-size: clamp(1.25rem, 2vw, 21px);
      text-align: center;
      font-family: "Cairo", sans-serif;
      color: var(--main-dark-color);
      cursor: default;

    }

    p2 {
      font-size: clamp(1.25rem, 2vw, 21px);
      text-align: center;
      font-family: "Cairo", sans-serif;
      color: var(--main-light-color);
    }
`;

export const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 20vh clamp(75px, 7.75vw, 150px) 7.5vh;
  scroll-snap-align: start;
  text-align: center;
  display: grid;
  overflow-y: scroll;
`;
