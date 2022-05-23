import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
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
  AlertIcon,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { FaUserPlus, FaUserTag } from "react-icons/fa";
import {
  HiOutlineMail,
  HiLockClosed,
  HiOutlineShieldCheck,
  HiOutlineEyeOff,
  HiOutlineEye
} from "react-icons/hi";

const Register = () => {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserContext);
  const defaultInputValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    message: undefined
  });

  const [inputValue, setInputValue] = useState(defaultInputValue);

  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleShowHidePassword = (type) => {
    switch (type) {
      case "password":
        setShowPassword({
          ...showPassword,
          password: !showPassword.password
        });
        break;
      case "password2":
        setShowPassword({
          ...showPassword,
          password2: !showPassword.password2
        });
        break;
      default:
        setShowPassword({
          password: false,
          password2: false
        });
        break;
    }
  };

  const handleError = (message) => {
    setTimeout(() => {
      setLoading(false);
      setMessage({
        type: "error",
        message: message
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputValue.password.length >= 8) {
      if (inputValue.password === inputValue.confirmPassword) {
        try {
          const { data } = await api.signUp(inputValue);
          const newUserData = { ...data, isLoggedIn: true };
          setInputValue(defaultInputValue);
          setLoading(false);
          setMessage({
            type: "success",
            message: "Success to sign up new account"
          });
          setUserData(newUserData);
          localStorage.setItem("user-data", JSON.stringify(newUserData));
          router.push("/");
        } catch (error) {
          handleError(error.response.data.message);
        }
      } else {
        handleError("Password not match.");
      }
    } else {
      handleError("Password minimum 8 characters.");
    }
  };

  const { firstName, lastName, email, password, confirmPassword } = inputValue;

  return (
    <>
      <Heading fontFamily="body" as="h4" fontSize="2xl" mb={4}>
        <Center>
          <VStack>
            <Box bg="primary.main" color="black" p={5} borderRadius="50%">
              <FaUserPlus />
            </Box>
            <Text>Sign Up Your Account</Text>
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
        <Grid templateColumns="repeat(2, 1fr)" gap={2} my={5}>
          <GridItem colSpan={1}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserTag />} />
              <Input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First Name"
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </InputGroup>
          </GridItem>
          <GridItem colSpan={1}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUserTag />} />
              <Input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </InputGroup>
          </GridItem>
        </Grid>

        <InputGroup my={5}>
          <InputLeftElement pointerEvents="none" children={<HiOutlineMail />} />
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Valid Email"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
        </InputGroup>

        <InputGroup my={5}>
          <InputLeftElement pointerEvents="none" children={<HiLockClosed />} />
          <Input
            type={showPassword.password ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          <InputRightElement onClick={() => handleShowHidePassword("password")}>
            {showPassword.password ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </InputRightElement>
        </InputGroup>

        <InputGroup my={5}>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineShieldCheck />}
          />
          <Input
            type={showPassword.password2 ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          <InputRightElement
            onClick={() => handleShowHidePassword("password2")}>
            {showPassword.password2 ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </InputRightElement>
        </InputGroup>

        <Center>
          <Button
            type="submit"
            bg="primary.main"
            color="black"
            _hover={{ background: "primary.dark" }}
            _active={{ background: "primary.dark" }}>
            {loading ? <Spinner /> : "Sign Up"}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default Register;
