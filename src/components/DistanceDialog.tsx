import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

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
          <Text>Digite a distância maxima para o filtro em km</Text>
          <TextInput
            keyboardType="numeric"
            value={distance}
            onChangeText={handleOnTextChange}
            style={{ marginTop: 10 }}
          />
          <Dialog.Actions>
            <Button onPress={handleConfirm}>Confirmar</Button>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
