import React, { useState } from "react";
import { Box, Heading, HStack, Pressable, Text } from "native-base";
import { RegisterOption } from "../../components/RegisterOption";
import { MaterialIcons } from "@expo/vector-icons";
export function Register() {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [situation, setSituation] = useState("");

  return (
    <Box px={4}>
      <Heading color="amber.400">Registrar Animal</Heading>

      <RegisterOption
        mt={4}
        getSelected={setSize}
        title="Porte:"
        options={["pequeno", "medio", "grande"]}
      />

      <RegisterOption
        mt={4}
        getSelected={setColor}
        title="Cor:"
        options={["1 cor", "2 cores", "3 cores"]}
      />

      <RegisterOption
        mt={4}
        getSelected={setSituation}
        title="Situação:"
        options={["Abandonado", "Perdido", "Machucado"]}
      />

      <Pressable
        borderWidth={1}
        alignSelf="center"
        rounded={4}
        mt={4}
        w="50%"
        p={1}
        bg="gray.200"
        borderColor="trueGray.400"
      >
        <HStack alignItems="center">
          <Text fontSize="md" bold>
            Enviar Foto:
          </Text>
          <MaterialIcons size={20} name="attach-file" />
        </HStack>
      </Pressable>

      <Pressable
        alignSelf="center"
        rounded={4}
        mt={20}
        w={40}
        h={30}
        p={1}
        bg="amber.500"
      >
        <HStack alignItems="center" justifyContent="center">
          <MaterialIcons color="#FFF" size={20} name="check" />
          <Text color="amber.100" ml={1} fontSize="md" bold>
            Confirmar
          </Text>
        </HStack>
      </Pressable>
    </Box>
  );
}
