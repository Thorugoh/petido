import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  onDismiss?: () => void;
  onConfirm: (distance: string) => void;
}

export function DistanceDialog({ onDismiss, onConfirm }: Props) {
  const [distance, setDistance] = useState("");

  function handleOnTextChange(text: string) {
    setDistance(text.replace(/[^0-9]+/, ""));
  }

  function handleConfirm() {
    if (!distance) {
      onDismiss && onDismiss();

      return;
    }
    onConfirm(distance);
    onDismiss && onDismiss();
  }

  return (
    <Portal>
      <Dialog visible={true} onDismiss={onDismiss}>
        <Dialog.Content>
          <Text style={{ fontSize: RFValue(14) }}>
            Digite a distância maxima para o filtro em km
          </Text>
          <TextInput
            keyboardType="numeric"
            value={distance}
            onChangeText={handleOnTextChange}
            style={{ marginTop: RFValue(10), fontSize: RFValue(14) }}
          />
          <Dialog.Actions>
            <Button
              labelStyle={{ fontSize: RFValue(14) }}
              onPress={handleConfirm}
            >
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
