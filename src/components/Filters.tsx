import { useContext } from "react";
import styled, { useTheme } from "styled-components";
import { UsersListContext } from "../providers";
import type { Role } from "../types";
import { Button } from "../ui";
import { Search } from "lucide-react";

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  background: ${({ theme }) => theme.surface.default};
  margin-bottom: ${({ theme }) => theme.spacing.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  flex-grow: 1;
  justify-content: space-between;
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.medium};
`;

const SearchInput = styled.input`
  height: 36px;
  flex-grow: 1;
  padding-left: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
  border: 2px solid ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ theme }) => theme.background.default};
  transition: all 0.2s ease;
  padding-right: 32px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.fill.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.fill.accent}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const RoleFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const RoleCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  padding: 0 ${({ theme }) => theme.spacing.medium};
  height: 36px;
  user-select: none;
`;

const CheckboxInput = styled.input`
  margin: 0;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
`;

const ResultsCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const ResultsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
  align-items: flex-end;
  justify-content: flex-end;
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: ${({ theme }) => theme.spacing.medium};
  bottom: 11px;
`;

const availableRoles: Role[] = ["Admin", "Editor", "Viewer"];

export const Filters = () => {
  const { setFilters, filteredUsers, users, filters } =
    useContext(UsersListContext);
  const theme = useTheme();
  const roleFilter = filters.find((f) => f.type === "role")?.value || [];
  const nameFilterValue = filters.find((f) => f.type === "name")?.value || "";

  const handleNameFilterChange = (value: string) => {
    if (value.trim()) {
      setFilters((prev) => [
        ...prev.filter((f) => f.type !== "name"),
        { type: "name", value: value.trim() },
      ]);
    } else {
      setFilters((prev) => prev.filter((f) => f.type !== "name"));
    }
  };

  const handleRoleToggle = (role: Role) => {
    let filteredRoles = roleFilter;
    if (filteredRoles.includes(role)) {
      filteredRoles = filteredRoles.filter((r) => r !== role);
    } else {
      filteredRoles = [...filteredRoles, role];
    }

    if (filteredRoles.length > 0) {
      setFilters((prev) => [
        ...prev.filter((f) => f.type !== "role"),
        { type: "role", value: filteredRoles },
      ]);
    } else {
      setFilters((prev) => prev.filter((f) => f.type !== "role"));
    }
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  const hasActiveFilters = filters.length > 0;

  return (
    <FiltersContainer data-testid="filters-container">
      <FilterGroup>
        <FilterLabel htmlFor="name-filter">Search by Name</FilterLabel>
        <SearchContainer>
          <SearchInput
            id="name-filter"
            type="text"
            value={nameFilterValue}
            placeholder="Type a name to search..."
            onChange={(e) => handleNameFilterChange(e.target.value)}
          />
          <SearchIcon size={20} color={theme.fill.primary} />
        </SearchContainer>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel as="span">Filter by Role</FilterLabel>
        <RoleFilterContainer>
          {availableRoles.map((role) => (
            <RoleCheckbox key={role}>
              <CheckboxInput
                type="checkbox"
                checked={roleFilter.includes(role)}
                onChange={() => handleRoleToggle(role)}
                aria-label={`Filter by ${role} role`}
                id={`role-${role}`}
              />
              <CheckboxLabel htmlFor={`role-${role}`}>{role}</CheckboxLabel>
            </RoleCheckbox>
          ))}
        </RoleFilterContainer>
      </FilterGroup>
      <ResultsDiv>
        <Button
          onClick={clearAllFilters}
          label="Clear Filters"
          variant="secondary"
          disabled={!hasActiveFilters}
        />

        <ResultsCount>
          Showing {filteredUsers.length} of {users.length} users
        </ResultsCount>
      </ResultsDiv>
    </FiltersContainer>
  );
};
