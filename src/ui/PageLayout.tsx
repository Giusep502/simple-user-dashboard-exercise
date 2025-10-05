import type { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  height: 100vh;
  margin: 0 auto;
`;

const Main = styled.main`
  flex-grow: 1;
`;

const Header = styled.header`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.small};
  border-top: 1px solid ${({ theme }) => theme.border.default};
`;

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledPageLayout>
      <Header>Simple Users Dashboard</Header>
      <Main>{children}</Main>
      <Footer>Made with ❤️ by Giuseppe Di Francesco</Footer>
    </StyledPageLayout>
  );
};
