import styled from "styled-components";

const MaintenanceContainer = styled.div`
  margin: 20px;
  font-family: monospace;
  max-width: 350px;
`;

const H3Title = styled.h3`
  margin-bottom: 5px;
`;

const H4Subtitle = styled.h4`
  margin-top: 5px;
`;

export default function Maintenance() {
  return (
    <MaintenanceContainer class="">
      <H3Title>Adam Cole</H3Title>
      <H4Subtitle>(And His Soon To Be Portfolio Site)</H4Subtitle>
      <p>
        Sorry for the mess, I've been busy working on some really cool stuff
        that I'm excited to share here!
      </p>
      <p>
        In the meantime, check out my latest project{" "}
        <a href="http://www.kiss-crash.com">
          <strong>Kiss/Crash</strong>
        </a>
        , an immersive work using AI imagery to investigate the growing gap
        between real experience and artificial representations.
      </p>

      <p>You can also follow my latest work on:</p>
      <ul>
        <li>
          <a href="https://www.instagram.com/adamcole.studio/">Instagram</a>
        </li>
        <li>
          <a href="https://twitter.com/adamcole_studio">Twitter</a>
        </li>
      </ul>

      <p>Hope to catch up with you all real soon!</p>
      <p>
        Sincerely,
        <br></br>
        Adam Cole
      </p>
    </MaintenanceContainer>
  );
}
