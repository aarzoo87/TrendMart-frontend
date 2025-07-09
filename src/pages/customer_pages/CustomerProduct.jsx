import React, { useState, useEffect } from "react";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import ProductDetailPage from "./ProductDetailPage";
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Button,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CustomerProduct() {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);

  const getProductData = () => {
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api: "get_product_details",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          setProductList(data.data);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleQuickButton = (productId) => {
    navigate(`/product/${productId}`);
  };

  const ProductCard = ({ product }) => {
    return (
      <Box style={{ position: "relative" }} ml={20}>
        {product.discount_price > 0 && (
          <img
            src="/sale_logo.png"
            alt="Hot Sale"
            style={{
              position: "absolute",
              top: "-16px",
              right: "-5px",
              width: "65px",
              height: "auto",
              zIndex: 2,
              transform: "rotate(1deg)",
              pointerEvents: "none",
            }}
          />
        )}
        <Card
          shadow="sm"
          radius="lg"
          withBorder
          padding="lg"
          style={{ transition: "all 0.2s" }}
        >
          <Card.Section>
            <Image
              src={product.product_image}
              alt={product.product_name}
              height={200}
              fit="contain"
              style={{ backgroundColor: "#f9f9f9", padding: "1rem" }}
            />
          </Card.Section>

          <Stack spacing="xs" mt="md">
            <Group justify="space-between">
              <Text fw={600} size="lg" lineClamp={1}>
                {product.product_name}
              </Text>
              {product.discount_price && product.discount_price > 0 && (
                <Badge color="green" variant="light" size="lg">
                  {Math.round(
                    ((product.product_price - product.discount_price) /
                      product.product_price) *
                      100,
                  )}
                  % OFF
                </Badge>
              )}
            </Group>

            <Group spacing="xs">
              <Text fw={600} c="blue" size="md">
                ₹
                {product.discount_price > 0
                  ? product.discount_price
                  : product.product_price}
              </Text>
              {product.discount_price && product.discount_price > 0 && (
                <Text
                  size="sm"
                  c="dimmed"
                  td="line-through"
                  style={{ fontStyle: "italic" }}
                >
                  ₹{product.product_price}
                </Text>
              )}
              <Button onClick={(e) => handleQuickButton(product.id)}>
                Quick View
              </Button>
            </Group>

            {/*            <Text size="sm" c="dimmed" lineClamp={2}>
              {product.description}
            </Text>*/}
          </Stack>
        </Card>
      </Box>
    );
  };

  return (
    <>
      <CustomerHeaderMenu />
      <SimpleGrid
        cols={4}
        spacing="xl"
        breakpoints={[
          { maxWidth: 1200, cols: 3 },
          { maxWidth: 900, cols: 2 },
          { maxWidth: 600, cols: 1 },
        ]}
      >
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </>
  );
}
export default CustomerProduct;
