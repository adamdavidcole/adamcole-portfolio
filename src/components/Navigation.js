import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACING_PX, margins, device } from "../utility/style-constants";
import { H1, H2, H3, H4 } from "../utility/typography";

const Nav = styled.nav`
  display: flex;
  flex-align: row;
  justify-content: space-between;
  margin: 0 ${margins.small};

  @media ${device.tablet} {
    margin: 0 ${margins.large};
  }
`;

const List = styled.ul`
  display: flex;
  flex-align: row;
  margin: 0;
  //   padding: 0;
  font-size: inherit;
`;

const ListEl = styled.li`
  list-style-type: none;
  font-size: inherit;

  margin-left: ${margins.small};

  @media ${device.tablet} {
    margin-left: ${margins.large};
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Logo = styled(H3)`
  letter-spacing: 4px;
  word-spacing: 2px;
  font-weight: 900;
  flex-shrink: 0;

  @media ${device.tablet} {
    letter-spacing: 8px;
    word-spacing: 4px;
    font-weight: 900;
  }
`;

export default function Navigation() {
  return (
    <Nav>
      <Logo>
        <NavLink to="/">ADAM COLE</NavLink>
      </Logo>
      <List>
        <H3 fontWeight={400}>
          <ListEl>
            <NavLink to="/projects">Works</NavLink>
          </ListEl>
        </H3>
        <H3 fontWeight={400}>
          <ListEl>
            <NavLink to="/about">About</NavLink>
          </ListEl>
        </H3>
        <H3 fontWeight={400}>
          <ListEl>
            <NavLink to="/nothing-here">Contact</NavLink>
          </ListEl>
        </H3>
      </List>
    </Nav>
  );
}
