import { createPortal } from "react-dom";
import { Dispatch, ReactNode, useEffect } from "react";
import styled from "styled-components";
import * as Styled from "./Modal.styled";
import { theme } from "../../styles/theme";
import { CloseButton } from "../buttons/Buttons.styled";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

interface IModal {
  isActive?: boolean;
  toggleIsActive?: Dispatch<boolean>;
  children?: ReactNode;
}

export const Modal = ({ isActive, toggleIsActive, children }: IModal) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { height } = useWindowDimensions();

  return isActive
    ? createPortal(
        <Styled.Backdrop innerHeight={height} onClick={() => toggleIsActive(false)}>
          <Styled.Content
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CloseButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleIsActive(false);
              }}
            >
              Sluiten
            </CloseButton>
            {children}
          </Styled.Content>
        </Styled.Backdrop>,
        document.body,
      )
    : null;
};
