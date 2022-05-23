import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as api from "api";
import { UserContext } from "context/userContext";
import {
  Box,
  Text,
  Heading,
  Center,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  VStack,
  Button,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import {
  HiOutlineMail,
  HiOutlineLogin,
  HiLockClosed,
  HiOutlineEyeOff,
  HiOutlineEye
} from "react-icons/hi";

const Login = () => {
  const router = useRouter();
  const { setUserData } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: undefined
  });

  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = inputValue;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleShowHidePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.signIn(inputValue);
      const newUserData = { ...data, isLoggedIn: true };
      setInputValue({
        email: "",
        password: ""
      });
      setLoading(false);
      setUserData(newUserData);
      localStorage.setItem("user-data", JSON.stringify(newUserData));
      setMessage({
        type: "",
        message: undefined
      });
      router.push("/");
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "error",
          message: error.response.data.message
        });
      }, 1000);
    }
  };

  return (
    <>
      <Heading fontFamily="body" as="h4" fontSize="2xl" mb={4}>
        <Center>
          <VStack>
            <Box bg="primary.main" color="black" p={5} borderRadius="50%">
              <HiOutlineLogin />
            </Box>
            <Text>Sign In Your Account</Text>
          </VStack>
        </Center>
      </Heading>

      {message.message !== undefined && (
        <Alert status={message.type} borderRadius="10px">
          <AlertIcon />
          <Text>{message.message}</Text>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <InputGroup my={5}>
          <InputLeftElement pointerEvents="none" children={<HiOutlineMail />} />
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
        </InputGroup>

        <InputGroup my={5}>
          <InputLeftElement pointerEvents="none" children={<HiLockClosed />} />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          <InputRightElement onClick={handleShowHidePassword}>
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </InputRightElement>
        </InputGroup>

        <Center>
          <Button
            type="submit"
            bg="primary.main"
            color="black"
            _hover={{ background: "primary.dark" }}
            _active={{ background: "primary.dark" }}>
            {loading ? <Spinner /> : "Sign In"}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default Login;
