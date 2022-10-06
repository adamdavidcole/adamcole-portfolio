import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 4rem;
  line-height: 4.98rem;
  margin-bottom: 1.743rem;
  font-weight: ${(props) => props.fontWeight || "700"};
`;

export const H2 = styled.h2`
  font-size: 2.2974rem;
  line-height: 3.32rem;
  margin-bottom: 1.743rem;
  font-weight: ${(props) => props.fontWeight || "700"};
`;

export const H3 = styled.h3`
  font-size: 1.7411rem;
  line-height: 2.49rem;
  margin-bottom: 1.743rem;
  font-weight: ${(props) => props.fontWeight || "700"};
`;

export const H4 = styled.h3`
  font-size: 1.305rem;
  line-height: 1.8675rem;
  margin-bottom: 1.743rem;
  font-weight: ${(props) => props.fontWeight || "700"};
`;

export const Body = styled.div`
  font-size: 1rem;
  line-height: 1.66em;
  margin-bottom: 1.743rem;
`;
