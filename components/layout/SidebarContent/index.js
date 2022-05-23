import React, { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "context/userContext";
// import { FavouritesContext } from "context/favouritesContext";
import {
  Image,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useColorMode
} from "@chakra-ui/react";
import {
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineCog,
  HiMoon,
  HiSun
} from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import SidebarMenuItem from "components/layout/SidebarMenuItem";

const SidebarContent = ({ menuItems, handleLogout }) => {
  const { userData } = useContext(UserContext);
  // const { setFavMeals, setFavIngredients } = useContext(FavouritesContext);
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const arrayPathname = router.pathname.split("/");

  return (
    <>
      <Box bg="white" mb={10} mx={6} py={1} borderRadius="15px">
        <Image
          h="45px"
          mx="auto"
          src="/assets/images/logo/logo.png"
          alt="logo"
        />
      </Box>
      <Box flex="1">
        {menuItems.map((item, index) => {
          return (
            <SidebarMenuItem
              key={index}
              onClick={() => router.push(item.path)}
              icon={item.icon}
              label={item.label}
              isActive={arrayPathname[1] === item.path.slice(1) ? true : false}
            />
          );
        })}
      </Box>

      {userData?.isLoggedIn ? (
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              fontSize="2xl"
              bgColor="primary.main"
              color="black"
              _hover={{ background: "primary.dark" }}
              _active={{ background: "primary.dark" }}>
              <HiOutlineCog />
            </MenuButton>
            <MenuList p={2}>
              <SidebarMenuItem
                onClick={toggleColorMode}
                icon={colorMode === "dark" ? <HiSun /> : <HiMoon />}
                label={`Enable ${colorMode === "dark" ? "light" : "dark"} mode`}
                background="transparent"
              />
              <SidebarMenuItem
                onClick={() => router.push("/edit-profile")}
                icon={<FaUserEdit />}
                label="Edit Profile"
                background="transparent"
                isActive={arrayPathname[1] === "edit-profile" ? true : false}
              />
              <SidebarMenuItem
                onClick={handleLogout}
                icon={<HiOutlineLogout />}
                label="Logout"
                background="transparent"
              />
            </MenuList>
          </Menu>
        </Box>
      ) : (
        <SidebarMenuItem
          onClick={() => router.push("/auth")}
          icon={<HiOutlineLogin />}
          label="Login"
          isActive={arrayPathname[1] === "auth" ? true : false}
        />
      )}
    </>
  );
};

export default SidebarContent;
