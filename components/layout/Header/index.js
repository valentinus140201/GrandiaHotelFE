import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Divider,
  useBreakpointValue
} from "@chakra-ui/react";
import { UserContext } from "context/userContext";

const Header = ({ title, ...props }) => {
  const [mounted, setMounted] = useState(false);
  const [greetings, setGreetings] = useState(undefined);
  const { userData } = useContext(UserContext);
  const nameUser = userData?.result?.firstName;

  const makeGreetings = () => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour <= 10) {
      setGreetings("Morning");
    } else if (hour >= 11 && hour <= 16) {
      setGreetings("Afternoon");
    } else if (hour >= 17 && hour <= 20) {
      setGreetings("Evening");
    } else if (hour >= 21 && hour <= 24) {
      setGreetings("Night");
    }
  };

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      makeGreetings();
    }

    return () => setMounted(false);
  });

  return (
    <Box {...props}>
      <Heading as="h2" size="lg" fontFamily="body" mb={1}>
        {title === undefined ? (
          <Text>
            Good {greetings}
            {nameUser && `, ${nameUser}`}
          </Text>
        ) : (
          <>
            <Text>{title}</Text>
          </>
        )}
      </Heading>
      {useBreakpointValue({
        base: <Divider borderColor="secondary.main" borderWidth="1px" my={3} />,
        lg: <></>
      })}
    </Box>
  );
};

export default Header;
