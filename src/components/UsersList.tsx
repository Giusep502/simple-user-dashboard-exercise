import { useContext, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import styled from "styled-components";
import { UsersListContext } from "../providers";
import type { User } from "../types";
import { UserDialog } from "./UserDialog";
import { IconButton, Spinner } from "../ui";
import { useBreakpointIndex } from "../hooks/useBreakpoints";

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
  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    /** TODO: Refactor whole table to use grid visualization */
    display: grid;
    grid-template-columns: 1fr 80px 50px;
  }
`;

const HeadTr = styled(Tr)`
  cursor: default;
`;

const EllipsisDiv = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NameDiv = styled(EllipsisDiv)``;

const MobileEmail = styled(EllipsisDiv)`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { users, status } = useContext(UsersListContext);
  const breakpointIndex = useBreakpointIndex();

  if (status === "idle") {
    return null;
  }
  if (status === "loading") {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <>
      <UserDialog
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <Table>
        <TableHead>
          <HeadTr>
            <Th>{breakpointIndex > 0 ? "Name" : "Credentials"}</Th>
            <Th>Role</Th>
            {breakpointIndex > 0 && <Th>Email</Th>}
            <Th></Th>
          </HeadTr>
        </TableHead>
        {users.map((user) => (
          <Tr key={user.id} onClick={() => setSelectedUser(user)}>
            <Td>
              <NameDiv>{user.name}</NameDiv>
              {breakpointIndex < 1 && <MobileEmail>{user.email}</MobileEmail>}
            </Td>
            <Td>{user.role}</Td>
            {breakpointIndex > 0 && <Td>{user.email}</Td>}
            <CenteredTd>
              <IconButton
                Icon={ChevronRightIcon}
                ariaLabel={"View details of user: " + user.name}
              />
            </CenteredTd>
          </Tr>
        ))}
      </Table>
    </>
  );
};
