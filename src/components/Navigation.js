import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACING_PX } from "../utility/style-constants";
import { H1, H2, H3, H4 } from "../utility/typography";

const Nav = styled.nav`
  display: flex;
  flex-align: row;
  justify-content: space-between;
  margin: 0 ${SPACING_PX[200]};
`;

const List = styled.ul`
  display: flex;
  flex-align: row;
  margin: 0;
  font-size: inherit;
`;

const ListEl = styled.li`
  list-style-type: none;
  font-size: inherit;
  margin-left: ${SPACING_PX[300]};
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const Logo = styled.span`
  font-weight: 700;
`;

export default function Navigation() {
  return (
    <Nav>
      <Logo>
        <H2>
          <NavLink to="/">ADAM COLE</NavLink>
        </H2>
      </Logo>
      <List>
        <H2 fontWeight={400}>
          <ListEl>
            <NavLink to="/projects">Works</NavLink>
          </ListEl>
        </H2>
        <H2 fontWeight={400}>
          <ListEl>
            <NavLink to="/about">About</NavLink>
          </ListEl>
        </H2>
        <H2 fontWeight={400}>
          <ListEl>
            <NavLink to="/nothing-here">Contact</NavLink>
          </ListEl>
        </H2>
      </List>
    </Nav>
  );
}
