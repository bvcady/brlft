import styled from "styled-components";
import { ButtonHTMLAttributes, Dispatch, ReactNode, SetStateAction } from "react";
import { KeyboardArrowUp } from "@mui/icons-material";
import { theme } from "../../styles/theme";

const StyledSortButton = styled.button<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? theme.colors.accent.default : "transparent")};
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

type ISortButton = {
  children?: ReactNode;
  isDefault?: boolean;
  reversed?: boolean;
  setSortValue: Dispatch<SetStateAction<string>>;
  sortOrder?: number;
  setSortOrder?: Dispatch<SetStateAction<number>>;
  sortValue: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const SortButton = ({
  children,
  setSortOrder,
  setSortValue,
  sortOrder,
  sortValue,
  ...props
}: ISortButton) => {
  const { name } = props;
  const selected = sortValue === name;
  const reversed = sortOrder > 0;

  return (
    <StyledSortButton
      onClick={() => {
        if (sortValue === name) {
          return setSortOrder?.((prev) => -1 * prev);
        }
        return setSortValue?.(name);
      }}
      type={props.type || "button"}
      {...{ ...props, selected }}
    >
      {children}
      {selected ? (
        <KeyboardArrowUp
          fontSize="inherit"
          style={{
            transform: reversed ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.3s ease",
          }}
        />
      ) : null}
    </StyledSortButton>
  );
};
