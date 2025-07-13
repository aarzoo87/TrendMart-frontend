import React, { useState, useEffect } from "react";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import {
  Box,
  Button,
  Divider,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function CustomerCart() {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [productList, setProductList] = useState([]);
  const [totalItems, setTotalItems] = useState("");
  const totalPrice = productList.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  useEffect(() => {
    console.log("productList", productList);
  }, [productList]);

  const getProductData = () => {
    const loginData =
      JSON.parse(atob(localStorage.getItem("loginDetails"))) || [];
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api: "get_cart_product_details",
        customer_id: loginData.user_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          setProductList(data.data.products);
          setTotalItems(data.data.total_items);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCheckout = () => {
    navigate("/customer/checkout");
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <CustomerHeaderMenu />
      {totalItems && totalItems > 0 ? (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" p="lg">
          <Box>
            <Group justify="space-between" mb="md">
              <Title order={2}>Shopping Cart</Title>
              <Text fw={500}>{totalItems} Items</Text>
            </Group>

            <Divider mb="md" />

            <Stack spacing="md">
              {productList.map((item) => (
                <Group key={item.id} align="flex-start">
                  <Image
                    src={item.product_image}
                    w="10%"
                    maw={60}
                    radius="md"
                  />

                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text fw={600}>{item.product_name}</Text>
                    <Button variant="subtle" size="xs" c="red">
                      Remove
                    </Button>
                  </Stack>

                  <Group>
                    <NumberInput
                      value={item.product_qty}
                      min={1}
                      style={{ width: 80 }}
                    />
                    <Text>₹{item.product_price}</Text>
                    <Text fw={600}>
                      ₹{item.product_price * item.product_qty}
                    </Text>
                  </Group>
                </Group>
              ))}
            </Stack>

            <Button mt="lg" variant="subtle" color="blue">
              ← Continue Shopping
            </Button>
          </Box>

          {/* Right: Order Summary */}
          <Paper shadow="md" radius="md" p="lg">
            <Title order={3} mb="md">
              Order Summary
            </Title>

            <Group position="apart" mb="xs">
              <Text>Items {totalItems}</Text>
              <Text fw={600}>₹{totalPrice.toFixed(2)}</Text>
            </Group>

            <Group position="apart" mb="xs">
              <Text>Shipping</Text>
              <Select
                placeholder="Choose"
                data={[
                  { value: "standard", label: "Standard Delivery – ₹5.00" },
                  { value: "express", label: "Express Delivery – ₹10.00" },
                ]}
                defaultValue="standard"
                style={{ flex: 1 }}
              />
            </Group>

            <TextInput
              placeholder="Enter your code"
              label="Promo Code"
              mt="md"
            />
            <Button color="red" fullWidth mt="xs">
              Apply
            </Button>

            <Divider my="lg" />

            <Group position="apart">
              <Text fw={700}>Total Cost</Text>
              <Text fw={700}>₹{(totalPrice + 5).toFixed(2)}</Text>
            </Group>

            <Button
              color="violet"
              fullWidth
              size="md"
              mt="lg"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Paper>
        </SimpleGrid>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <h1
            style={{
              color: "#555",
              fontSize: "36px",
              fontWeight: "700",
              fontFamily: "Arial, sans-serif",
              marginBottom: "20px",
            }}
          >
            Your Cart is Empty
          </h1>

          <p
            style={{
              color: "#777",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Looks like you haven’t added anything yet.
          </p>

          <Button
            variant="outline"
            size="md"
            radius="md"
            onClick={() => navigate("/customer/products")}
          >
            Browse Products
          </Button>
        </div>
      )}
    </>
  );
}

export default CustomerCart;
