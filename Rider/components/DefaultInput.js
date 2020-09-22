import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import old_constants from "../old_constants";

const Container = styled.View`margin-bottom: 10px;`;

const TextInput = styled.TextInput`
  width: ${old_constants.width / 1.2};
  padding: 15px;
  background-color: ${props => props.theme.greyColor};
  border: 0.5px solid ${props => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const DefaultInput = ({
  value,
  placeholder,
  keyboardType = "default",
  returnKeyType = "done",
  autoCapitalize = "none",
  secureTextEntry = false,
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true
}) =>
  <Container>
    <TextInput
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
    />
  </Container>;

DefaultInput.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  secureTextEntry: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool
};

export default DefaultInput;
