import { MdAdd } from "react-icons/md";
import { useToast } from '@chakra-ui/react'
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineEdit,
  AiTwotoneDelete,
  AiOutlineShopping,
} from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SimpleGrid } from "@chakra-ui/react";
import {
  Stack,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";
import { Box, Image, IconButton } from "@chakra-ui/react";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'



function ManageInventory() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
  const cancelRef = React.useRef()
  const firstField = React.useRef();
  const toast = useToast()
  const router = useRouter();
  const [Pname, setPname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(" ");
 const [selectedID, setSelectedID] = useState("")
  const [Productdata, setData] = useState(null);
  const [ModalTitle, setModalTitle] = useState(null);
  const [ModalState, setModalState] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const baseURL = "https://eleven.ikadai.co/api/"

  const fetchProducts = async () => {

    await fetch(baseURL+"product", {
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
    // router.push('/auth/sign-in')
  };

  const captureSelected =  (selectedID) => {
    setSelectedID(selectedID);
    onOpenAlert()
  };

  const clearSelected =  () => {
    setSelectedID("");
    onCloseAlert();
  };

  const deleteProduct = async () => {
    await fetch(baseURL+"product/"+selectedID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: 'Product deleted',
          description: "Product have been removed",
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        console.log(data + 'deleted succesfully');
        fetchProducts()
        onCloseAlert();
      });
    // router.push('/auth/sign-in')
  };

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

  const addProduct = async () => {
    await fetch(baseURL+"product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        Pname: Pname,
        description: description,
        price: price,
        image: image
      }),
    });
    toast({
      title: 'Product Added',
      description: "New product added",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    console.log("Product Added Successfully");
    fetchProducts();
    onClose();
  };

  const updateProduct = async () => {
    await fetch(baseURL+"product/"+selectedID, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        Pname: Pname,
        description: description,
        price: price,
        image: image,
      }),
    });
    toast({
      title: 'Product updated',
      description: "product have been updated",
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    console.log("Product Added Successfully");
    fetchProducts();
    onClose();
  };

  const OpenProductModal = (title, id, name, description, price, image, state) => {
    setModalState(state)
    setSelectedID(id)
    setModalTitle(title)
    setPname(name)
    setDescription(description)
    setPrice(price)
    setImage(image)
    onOpen()
  }

  const submitProductModal = () => {
    if(ModalState == 'add'){
      addProduct()
    }
    else if(ModalState == 'edit'){
      updateProduct()
    }
  }


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
                  <Link href="/main/inventory">
                    <MenuItem icon={<AiOutlineShopping />}>
                      View Inventory
                    </MenuItem>
                  </Link>
                    <MenuItem icon={<AiOutlineLogout />} onClick={logout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="p-5 overflow-y-scroll w-full">
              <SimpleGrid minChildWidth="200px" spacing="20px">
                {Productdata &&
                  Productdata.map((Product) => (
                    <Box h="auto" bg="white" key={Product._id}>
                      <div className="flex flex-col rounded-xl border-gray border-2 h-auto shadow-md p-3 justify-between">
                        <div className="flex flex-col mb-5">
                          <Image
                            boxSize="50px"
                            objectFit="fit"
                            src={Product.image}
                            alt="No Image"
                          />
                          <div className="flex flex-col mt-5">
                            <h1 className="text-black text-2xl font-semibold">
                              {Product.Pname}
                            </h1>
                            <p className="text-gray text-xs">
                              {Product.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-black text-4xl font-semibold mt-1 mx-0">
                            $ {Product.price}
                          </h1>
                          <div className="flex flex-row mt-6">
                          <Button
                            marginTop="0.25rem"
                            marginLeft="1rem"
                            marginright="1rem"
                            leftIcon={<AiOutlineEdit />}
                            colorScheme="messenger"
                            variant="solid"
                            onClick={() => OpenProductModal("Edit product", Product._id, Product.Pname, Product.description, Product.price, Product.image, 'edit')}
                          >
                            Edit
                          </Button>
                          <Button
                            marginTop="0.25rem"
                            marginLeft="1rem"
                            marginright="1rem"
                            leftIcon={<AiTwotoneDelete />}
                            colorScheme="red"
                            variant="solid"
                            onClick={() => captureSelected(Product._id)}
                          >
                            Delete
                          </Button>
                          </div>
                        </div>
                      </div>
                    </Box>
                  ))}
              </SimpleGrid>
              <button
                className="absolute bottom-0 right-0 z-20 shadow-2xl w-14 h-14 rounded-lg m-4 hover:scale-105 bg-blue-500"
                onClick={() => OpenProductModal("Add new product", '', '', '', null, '', 'add')}
              >
                <MdAdd className="w-12 h-12 mx-1" color="white" />
              </button>
            </div>
          </div>
        </div>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{ModalTitle}</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="itemName">Product name</FormLabel>
                  <Input
                    ref={firstField}
                    id="productName"
                    placeholder="Please enter item name"
                    value={Pname}
                    required
                    onChange={(e) => setPname(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="desc">Product description</FormLabel>
                  <Textarea
                    id="desc"
                    maxLength="35"
                    maxHeight="90px"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="itemPrice">Product price</FormLabel>
                  <Input
                    type="number"
                    id="itemprice"
                    placeholder="Please enter item price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel htmlFor="image">Product image</FormLabel>
                  <InputGroup>
                    <Input
                     type="url"
                     id="image"
                     value={image}
                     required
                     placeholder="Please add image URL"
                     onChange={(e) => setImage(e.target.value)} >
                    </Input>
                  </InputGroup>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={submitProductModal}>
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={clearSelected}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteProduct} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </div>
    </>
  );
}

// ManageInventory.getInitialProps = async () => {
//   if (typeof window !== 'undefined') {
//     const JWT = localStorage.getItem('jwt')

//   const Response =  await fetch("http://localhost:8000/api/product", {
//     headers: { "Content-Type": "application/json", "X-Auth-Token": localStorage.getItem('jwt'), },
//   });
//   const ProductData = await Response.json()
//   console.log(ProductData)
// }
//   return {
//     props: {productData: 'ProductData'}
//   }

// }

export default ManageInventory;
