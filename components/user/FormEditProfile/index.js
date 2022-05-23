import React, { useState, useRef, useContext } from "react";
import * as api from "api";
import {
  Box,
  Divider,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue
} from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { UserContext } from "context/userContext";
import { HeaderMedium } from "components/common";

const FormEditProfile = ({ ...props }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [openAlert, setOpenAlert] = useState(false);
  const cancelRef = useRef();

  const handleDeleteAccount = async () => {
    try {
      await api.deleteAccount(userData?.result?._id);
      setUserData({});
      localStorage.setItem("user-data", JSON.stringify({}));
    } catch (error) {
      alert(error);
    }
  };

  const AlertDelete = () => {
    return (
      <AlertDialog
        isOpen={openAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setOpenAlert(false)}
        isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete your account? This action can't undo
              afterwards
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setOpenAlert(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDeleteAccount}
                colorScheme="red"
                bg="red.400"
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    );
  };

  return (
    <Box
      {...props}
      p={6}
      borderRadius="15px"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg">
      <HeaderMedium title="Edit Profile" icon={<FaUserEdit />} />
      <Button
        onClick={() => setOpenAlert(true)}
        leftIcon={<HiOutlineTrash />}
        colorScheme="red"
        bg="red.400">
        Delete Account
      </Button>
      <AlertDelete />
      {/* <FormProfile mb={4} />
      <Divider mb={3} borderWidth="1px" borderColor="secondary.main" />
      <FormPassword mb={4} /> */}
    </Box>
  );
};

export default FormEditProfile;
