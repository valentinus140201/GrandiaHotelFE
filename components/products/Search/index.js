import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiSearch, BiX } from "react-icons/bi";

const Search = ({ fetchSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearch(inputValue);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box>
        <InputGroup>
          <InputLeftElement cursor="pointer" onClick={(e) => handleSubmit(e)}>
            <BiSearch fontSize="20px" />
          </InputLeftElement>
          <Input
            variant="filled"
            borderRadius="15px"
            bgColor={useColorModeValue("gray.200", "gray.800")}
            _hover={{
              background: useColorModeValue("gray.200", "gray.800"),
            }}
            _focus={{
              background: useColorModeValue("white", "gray.900"),
            }}
            placeholder="Search by name..."
            onChange={(e) => handleInputChange(e)}
            value={inputValue}
          />
          {inputValue.length > 0 && (
            <InputRightElement
              cursor="pointer"
              onClick={() => setInputValue("")}
            >
              <BiX fontSize="20px" />
            </InputRightElement>
          )}
        </InputGroup>
      </Box>
    </form>
  );
};

export default Search;
