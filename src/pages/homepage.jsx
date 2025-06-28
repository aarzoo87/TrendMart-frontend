import {
  Box,
  Container,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Title,
  Text,
  Overlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const productImages = [
    "/products/girl_tshirt.jpg",
    "/products/shoes.jpg",
    "/products/headphone.png",
    "/products/shoes_1.jpg",
    "/products/coord.jpg",
    "/products/wide.jpg",
    "/products/tshirt.jpg",
    "/products/laptop.jpg",
    "/products/mobile.png",
  ];

  return (
    <Box bg="gray.0" style={{ minHeight: "100vh" }}>
      <Container size="xl" pt="xl">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="xl">
          <Group>
            <Image
              src="/trendmart_logo.png"
              alt="TrendMart Logo"
              width={50}
              height={50}
              radius="md"
            />
            <Title
              order={3}
              fw={900}
              c="blue.9"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.5px",
              }}
            >
              TrendMart
            </Title>
          </Group>
          <Text
            fw={700}
            size="lg"
            c="blue.6"
            style={{ cursor: "pointer" }}
            onClick={handleLogin}
          >
            Login
          </Text>
        </Flex>

        {/* Hero Banner */}
        <Box
          pos="relative"
          mb="xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #bbdefb 0%, #b2ebf2 100%)",
            padding: "3rem 2rem",
            borderRadius: "1rem",
          }}
        >
          <Overlay color="#000" opacity={0.2} zIndex={1} />

          <Flex
            direction="column"
            align="center"
            justify="center"
            h="100%"
            pos="relative"
            zIndex={2}
            px="md"
            ta="center"
            gap="sm"
          >
            <Title
              order={2}
              fw={700}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "2.5rem",
                color: "#0d47a1",
              }}
            >
              Welcome to TrendMart
            </Title>

            <Text
              size="lg"
              c="dimmed"
              style={{
                fontFamily: "'Poppins', sans-serif",
                maxWidth: "700px",
              }}
            >
              Discover everything from fashion to electronics — curated for your
              style.
            </Text>

            <Text
              size="md"
              c="gray.7"
              style={{ fontFamily: "'Poppins', sans-serif", maxWidth: "700px" }}
            >
              Whether you're looking for the latest gadgets, trendiest outfits,
              or essential daily items — TrendMart brings you top-quality
              products at unbeatable prices, all in one place.
            </Text>

            <Text
              size="sm"
              c="gray.6"
              style={{
                fontStyle: "italic",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              “Your one-stop shop for everything stylish and smart.”
            </Text>
          </Flex>
        </Box>

        {/* Product Showcase */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {productImages.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                overflow: "hidden",
                borderRadius: "lg",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                },
                "& img": {
                  transition: "transform 0.5s ease, filter 0.4s ease",
                },
                "&:hover img": {
                  transform: "scale(1.05)",
                  filter: "brightness(1.05) contrast(1.05)",
                },
              }}
            >
              <Image
                src={img}
                alt={`Product ${idx + 1}`}
                height={280}
                fit="cover"
                radius="md"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Home;
