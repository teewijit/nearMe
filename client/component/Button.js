import React from "react";
import styled from "styled-components";

const getBackgroundColor = (variant) => {
  switch (variant) {
    case "primary":
      return "#007bff";
    case "secondary":
      return "#6c757d";
    case "success":
      return "#28a745";
    case "danger":
      return "#dc3545";
    case "warning":
      return "#ffc107";
    case "info":
      return "#17a2b8";
    case "light":
      return "#f8f9fa";
    case "dark":
      return "#343a40";
    default:
      return "#007bff";
  }
};

const StyledButton = styled.button`
  background-color: ${(props) => getBackgroundColor(props.variant)};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
`;

const Button = ({ label, variant, onClick, type }) => {
  return (
    <StyledButton variant={variant} onClick={onClick} type={type}>
      {label}
    </StyledButton>
  );
};

export default Button;
