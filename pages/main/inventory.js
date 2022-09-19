import { MdAdd } from "react-icons/md";
import { AiOutlineMenu, AiOutlineLogout, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { SimpleGrid } from "@chakra-ui/react";
import { Box, Image, IconButton } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

function Inventory() {
  const router = useRouter();
  const [Productdata, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const baseURL = "https://eleven.ikadai.co/api/"

  useEffect(() => {
    setLoading(true);
    fetch(baseURL+"product", {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  }, []);

  
  const logout = () => {
    localStorage.clear();
    router.push('/auth/sign-in')
  }


  return (
    <>
      <div className="bg-gradient-to-r from-gray-300 via-blue-50 to-gray-300 block h-screen w-screen items-center justify-center md:flex">
        <div className="fixed bg-cover flex flex-col items-center overflow-hidden shadow-lg md:flex-row w-full h-full bg-white">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between h-auto min-h-fit bg-black px-5 py-5">
              <h1 className="text-white text-3xl font-semibold text-left">
                eleven. Grocery
              </h1>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<AiOutlineMenu color="grey" />}
                  variant="outline"
                />
                <MenuList>
                  <Link href="/main/manage-inventory">
                    <MenuItem icon={<AiOutlineEdit />}>
                      Manage Inventory
                    </MenuItem>
                  </Link>
                    <MenuItem icon={<AiOutlineLogout />} onClick={logout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="p-4 overflow-y-scroll w-full">
              <SimpleGrid minChildWidth="200px" spacing="20px">
              {Productdata &&
                  Productdata.map((Product) => (
                <Box
                  bg="#f7f7f7"
                  height="300px"
                  width="100%"
                  border="2px"
                  borderColor="gray.300"
                  borderRadius="16px"
                  key={Product._id}
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-center p-2">
                      <Image
                        boxSize="150px"
                        objectFit="fit"
                        src={Product.image}
                        alt="No Image"
                      />
                    </div>
                    <h1 className="text-black text-2xl ml-3 font-semibold">
                    {Product.Pname}
                    </h1>
                    <p className="text-gray text-xs ml-3">
                    {Product.description}
                    </p>
                    <div className="flex flex-row justify-between px-3 mt-5">
                      <h1 className="text-black text-3xl font-semibold">
                      $ {Product.price}
                      </h1>
                      <IconButton
                        colorScheme="messenger"
                        aria-label="Search database"
                        size="lg"
                        icon={<MdAdd />}
                      />
                    </div>
                  </div>
                </Box>
                   ))}
              </SimpleGrid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inventory;
