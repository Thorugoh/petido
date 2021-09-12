import { Box, HStack, IBoxProps, Radio, Text, VStack } from "native-base";
import React from "react";
import { useState } from "react";

// type Props = {
//   title: string;
//   options: string[];
//   extraInfo?: string;
//   getSelected: (option: string) => void;
// };

interface Props extends Omit<IBoxProps, "children"> {
  title: string;
  options: string[];
  extraInfo?: string;
  getSelected: (option: string) => void;
}

export function RegisterOption({
  title,
  options,
  extraInfo,
  getSelected,
  ...rest
}: Props) {
  const [value, setValue] = useState(options[0]);

  return (
    <Box p={4} borderWidth={1} borderColor="trueGray.400" rounded={5} {...rest}>
      <VStack>
        <Text fontSize="md" bold mb={4}>
          {title}
        </Text>

        <Radio.Group
          name=""
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            getSelected(nextValue);
          }}
          colorScheme="amber"
        >
          <HStack>
            {options.map((option) => (
              <Radio key={option} value={option} mr={1}>
                {option}
              </Radio>
            ))}
          </HStack>
        </Radio.Group>
      </VStack>
    </Box>
  );
}
