import React, { useState } from "react";
import { Box, Text, HStack, IconButton } from "@chakra-ui/react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight
} from "react-icons/hi";

const DataPagination = ({ count, rowsPerPage, page, changePage, ...props }) => {
  const [firstRangePerPage, setFirstRangePerPage] = useState(1);
  const [secondRangePerPage, setSecondRangePerPage] = useState(rowsPerPage);

  const totalPage = Math.floor(count / rowsPerPage);

  const handleChangeFirstPage = (e) => {
    changePage(0);
    setFirstRangePerPage(1);
    setSecondRangePerPage(rowsPerPage);
  };

  const handleChangePage = (e, type) => {
    switch (type) {
      case "prev":
        changePage(page - 1);
        setFirstRangePerPage(firstRangePerPage - rowsPerPage);
        setSecondRangePerPage(secondRangePerPage - rowsPerPage);
        break;
      case "next":
        changePage(page + 1);
        setFirstRangePerPage(firstRangePerPage + rowsPerPage);
        setSecondRangePerPage(secondRangePerPage + rowsPerPage);
        break;
      default:
        return undefined;
    }
  };

  const handleChangeLastPage = (e) => {
    changePage(totalPage);
    setFirstRangePerPage(rowsPerPage * totalPage + 1);
    setSecondRangePerPage(rowsPerPage * totalPage + rowsPerPage);
  };

  const rangePerPage = () => {
    let range;

    if (page === 0) {
      range = `${count < 1 ? "0" : "1"}-${
        count < rowsPerPage ? count : rowsPerPage
      } of ${count}`;
    } else {
      range = `${firstRangePerPage}-${
        secondRangePerPage > count ? count : secondRangePerPage
      } of ${count}`;
    }

    return range;
  };

  return (
    <Box {...props}>
      <HStack spacing="5px">
        <IconButton
          isDisabled={page === 0 ? true : false}
          onClick={(e) => handleChangeFirstPage(e)}
          bg="secondary.main"
          color="white"
          borderRadius="50%"
          _hover={{
            background: "secondary.light"
          }}
          _active={{
            background: "secondary.dark"
          }}
          icon={<HiChevronDoubleLeft fontSize="30px" />}
        />
        <IconButton
          isDisabled={page === 0 ? true : false}
          onClick={(e) => handleChangePage(e, "prev")}
          bg="secondary.main"
          color="white"
          borderRadius="50%"
          _hover={{
            background: "secondary.light"
          }}
          _active={{
            background: "secondary.dark"
          }}
          icon={<HiChevronLeft fontSize="30px" />}
        />
        <Box px="10px" textAlign="center">
          <Text>{rangePerPage()}</Text>
        </Box>
        <IconButton
          isDisabled={
            count === rowsPerPage || page === totalPage ? true : false
          }
          onClick={(e) => handleChangePage(e, "next")}
          bg="secondary.main"
          color="white"
          borderRadius="50%"
          _hover={{
            background: "secondary.light"
          }}
          _active={{
            background: "secondary.dark"
          }}
          icon={<HiChevronRight fontSize="30px" />}
        />
        <IconButton
          isDisabled={
            count === rowsPerPage || page === totalPage ? true : false
          }
          onClick={(e) => handleChangeLastPage(e)}
          bg="secondary.main"
          color="white"
          borderRadius="50%"
          _hover={{
            background: "secondary.light"
          }}
          _active={{
            background: "secondary.dark"
          }}
          icon={<HiChevronDoubleRight fontSize="30px" />}
        />
      </HStack>
    </Box>
  );
};

export default DataPagination;
