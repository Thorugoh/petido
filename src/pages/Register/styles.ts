import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-weight: 700;
  color: #f7bf29;
  font-size: ${RFValue(30)}px;
`;

export const Card = styled.View`
  border-width: 1px;
  width: "100%";
  height: ${RFValue(50)}px;
`;

export const CardTitle = styled.Text``;

export const CardOptions = styled.View``;

export const CardOption = styled.View``;
