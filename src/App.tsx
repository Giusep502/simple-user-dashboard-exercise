import { UsersList } from "./components";
import { UsersListProvider } from "./providers";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "./providers/ThemeProvider";
import { PageLayout } from "./ui";

const GlobalStyles = createGlobalStyle`
  :root {
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-synthesis: none;
    background: ${({ theme }) => theme.background.default};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${({ theme }) => theme.fontSize.medium};
    line-height: ${({ theme }) => theme.lineHeight.medium};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.text.primary};
  }
  body {
    margin: 0;
  }
`;

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <PageLayout>
        <UsersListProvider>
          <UsersList />
        </UsersListProvider>
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
