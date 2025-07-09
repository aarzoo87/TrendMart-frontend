import React, { useState, useEffect } from "react";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import {
  Box,
  Image,
  Text,
  Title,
  Button,
  Group,
  Stack,
  Badge,
  NumberInput,
  Tabs,
  Divider,
  Rating,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

function ProductDetailPage() {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const { product_id } = useParams();
  const [productData, setProductData] = useState([]);
  const [productQty, setProductQty] = useState(1);

  const getProductDetails = () => {
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api: "get_single_product_detail",
        product_id: product_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          console.log(data.data);
          setProductData(data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddToCart = () => {
    const loginData =
      JSON.parse(atob(localStorage.getItem("loginDetails"))) || [];
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api: "add_to_cart",
        product_id: product_id,
        customer_id: loginData.user_id,
        product_qty: productQty,
        selected: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          notifications.show({
            title: "Add To Cart Success",
            message: data.message,
            color: "green",
            icon: <IconCheck />,
          });
        } else {
          notifications.show({
            title: "Add To Cart Failed",
            message: data.message,
            color: "red",
            icon: <IconX />,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChangeQty = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (product_id !== "" || product_id !== 0) {
      console.log("product_id", product_id);
      getProductDetails();
    }
  }, [product_id]);

  return (
    <>
      <CustomerHeaderMenu />
      <Box px="xl" py="md">
        <Group align="start" wrap="nowrap" spacing="xl">
          <Image
            src={productData.product_image}
            alt={productData.product_name}
            radius="md"
            withPlaceholder
            fit="contain"
            w="35%"
            maw={250}
            style={{
              background: "#f8f9fa",
              padding: 16,
            }}
          />

          <Stack spacing="xs" style={{ flex: 1 }}>
            <Title order={2}>{productData.product_name}</Title>

            <Group>
              <Text fw={600} size="xl" color="blue">
                ₹
                {productData.discount_price > 0
                  ? productData.discount_price
                  : productData.product_price}
              </Text>
              {productData.discount_price > 0 && (
                <>
                  <Text
                    size="md"
                    c="dimmed"
                    td="line-through"
                    style={{ fontStyle: "italic" }}
                  >
                    ₹{productData.product_price}
                  </Text>
                  <Badge color="green" variant="light">
                    {Math.round(
                      ((productData.product_price -
                        productData.discount_price) /
                        productData.product_price) *
                        100,
                    )}
                    % OFF
                  </Badge>
                </>
              )}
            </Group>

            <Text size="sm" c="dimmed">
              {productData.description}
            </Text>

            <Rating value={4.5} readOnly fractions={2} />

            <Group>
              <Text>Qty: </Text>
              <NumberInput
                defaultValue={1}
                min={1}
                max={productData.product_stock}
                value={productQty}
                onChange={setProductQty}
                size="md"
                style={{ width: 120 }}
              />
              <Button size="md" color="blue" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Group>
          </Stack>
        </Group>

        <Divider my="lg" />

        <Tabs defaultValue="description">
          <Tabs.List>
            <Tabs.Tab value="description">Description</Tabs.Tab>
            <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
            <Tabs.Tab value="specs">Specifications</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="description" pt="md">
            <Text>{productData.description}</Text>
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="md">
            No reviews yet.
          </Tabs.Panel>

          <Tabs.Panel value="specs" pt="md">
            <Text size="sm" c="dimmed">
              Coming soon...
            </Text>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </>
  );
}

export default ProductDetailPage;
