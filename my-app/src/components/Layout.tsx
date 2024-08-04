import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  background: #004d99;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      <Header>EV Dashboard</Header>
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;
