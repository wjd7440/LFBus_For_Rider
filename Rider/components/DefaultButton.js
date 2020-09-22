import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import old_constants from "../old_constants";
import { ActivityIndicator } from "react-native";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${old_constants.width / 1.5};
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

const DefaultButton = ({ text, onPress, loading = false }) =>
  <Touchable disabled={loading} onPress={onPress}>
    <Container>
      {loading
        ? <ActivityIndicator color={"white"} />
        : <Text>
            {text}
          </Text>}
    </Container>
  </Touchable>;

DefaultButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default DefaultButton;
