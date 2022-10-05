import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACING_PX, FONT_SIZE } from "../utility/style-constants";

export default function Navigation() {
  const Nav = styled.nav`
    display: flex;
    flex-align: row;
    font-size: ${FONT_SIZE.header};
    justify-content: space-between;
    margin: ${SPACING_PX[100]};
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
    margin-left: ${SPACING_PX[200]};
  `;

  const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
  `;

  const Logo = styled.span`
    font-weight: 700;
  `;

  return (
    <Nav>
      <Logo>
        <NavLink to="/">ADAM COLE</NavLink>
      </Logo>
      <List>
        <ListEl>
          <NavLink to="/projects">Works</NavLink>
        </ListEl>
        <ListEl>
          <NavLink to="/about">About</NavLink>
        </ListEl>
        <ListEl>
          <NavLink to="/nothing-here">Contact</NavLink>
        </ListEl>
      </List>
    </Nav>
  );
}
