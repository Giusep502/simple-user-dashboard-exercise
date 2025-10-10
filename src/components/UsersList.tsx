import { ChevronRightIcon } from "lucide-react";
import styled from "styled-components";
import { IconButton } from "../ui";
import { useBreakpointIndex } from "../hooks/useBreakpoints";
import { UsersListContext } from "../providers";
import { useContext } from "react";

const Table = styled.table`
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.surface.default};
  text-align: left;
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.medium};
  overflow: hidden;
  margin: auto 0;
`;

const CenteredTd = styled(Td)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Th = styled.th`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Tr = styled.tr`
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  /** TODO: Use grid visualization INSTEAD of table */
  display: grid;
  grid-template-columns: 0.8fr 80px 1.2fr 50px;
  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    grid-template-columns: 1fr 80px 50px;
  }

  &:active {
    opacity: 0.6;
  }
`;

const HeadTr = styled(Tr)`
  cursor: default;
  &:active {
    opacity: 1;
  }
`;

const EllipsisDiv = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NameDiv = styled(EllipsisDiv)``;
const EmailDiv = styled(EllipsisDiv)``;

const MobileEmail = styled(EmailDiv)`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const UsersList = () => {
  const { filteredUsers, setSelectedUser } = useContext(UsersListContext);
  const breakpointIndex = useBreakpointIndex();

  return (
    <Table data-testid="users-list">
      <TableHead>
        <HeadTr>
          <Th>{breakpointIndex > 0 ? "Name" : "Credentials"}</Th>
          <Th>Role</Th>
          {breakpointIndex > 0 && <Th>Email</Th>}
          <Th></Th>
        </HeadTr>
      </TableHead>
      <tbody>
        {filteredUsers.map((user) => (
          <Tr key={user.id} onClick={() => setSelectedUser(user)}>
            <Td>
              <NameDiv>{user.name}</NameDiv>
              {breakpointIndex < 1 && <MobileEmail>{user.email}</MobileEmail>}
            </Td>
            <Td>{user.role}</Td>
            {breakpointIndex > 0 && (
              <Td>
                <EmailDiv>{user.email}</EmailDiv>
              </Td>
            )}
            <CenteredTd>
              <IconButton
                Icon={ChevronRightIcon}
                ariaLabel={`View details of user: ${user.name}`}
              />
            </CenteredTd>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};
