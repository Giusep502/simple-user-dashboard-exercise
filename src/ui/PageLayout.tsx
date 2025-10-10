import { useContext, type PropsWithChildren } from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { Moon } from "lucide-react";
import { ThemeContext } from "../providers";

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
  display: flex;
  flex-direction: column;
  /** TODO: Refactor, it works because of the stretch property */
  height: 100px;
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.small};
  border-top: 1px solid ${({ theme }) => theme.border.default};
`;

const Title = styled.h1`
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.large};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin: 0;
`;

const LeftPadding = styled.div`
  width: 32px; // TODO: refactor
`;

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { setMode } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <StyledPageLayout>
      <Header>
        <LeftPadding />
        <Title>Users Dashboard</Title>
        <IconButton
          Icon={Moon}
          ariaLabel="Toggle Dark Mode"
          onClick={handleToggleTheme}
        />
      </Header>
      <Main>{children}</Main>
      <Footer>Made with ❤️ by Giuseppe Di Francesco</Footer>
    </StyledPageLayout>
  );
};
