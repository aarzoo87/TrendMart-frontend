import React, { useState } from "react";
import {
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  Timeline,
  Select,
  Button,
  Radio,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import {
  IconCash,
  IconCreditCard,
  IconBrandPaypal,
  IconCurrencyRupee,
  IconWallet,
} from "@tabler/icons-react";

function CustomerCheckout() {
  const [activeStep, setActiveStep] = useState(0);

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const paymentOptions = [
    {
      value: "cod",
      label: "Cash on Delivery",
      icon: IconCash,
    },
    {
      value: "stripe",
      label: "Credit/Debit Card",
      icon: IconCreditCard,
    },
    {
      value: "paypal",
      label: "PayPal",
      icon: IconBrandPaypal,
    },
    {
      value: "razorpay",
      label: "Razorpay",
      icon: IconCurrencyRupee,
    },
    {
      value: "hitpay",
      label: "Hitpay",
      icon: IconWallet,
    },
  ];

  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const nextStep = () => setActiveStep((current) => current + 1);
  const prevStep = () => setActiveStep((current) => Math.max(0, current - 1));

  return (
    <>
      <CustomerHeaderMenu />
      <Container size="lg" mt="md" mb="xl">
        <Group justify="space-between" align="center" mb="xl">
          <Title order={2}>Checkout</Title>
          <Text fw={600} size="lg" c="gray.7">
            Order Subtotal (2 items): ₹300
          </Text>
        </Group>

        <Timeline active={activeStep} bulletSize={30} lineWidth={3}>
          <Timeline.Item title="Shipping Address" mt={-5} bullet="1">
            {activeStep === 0 && (
              <Paper shadow="lg" p="md" mt="sm">
                <TextInput
                  label="Full Name"
                  placeholder="John Doe"
                  value={shippingAddress.name}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      name: e.target.value,
                    })
                  }
                  mb="sm"
                />
                <TextInput
                  label="Address"
                  placeholder="123 Street, City"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                  mb="sm"
                />
                <TextInput
                  label="Phone Number"
                  placeholder="+91 1234567890"
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      phone: e.target.value,
                    })
                  }
                  mb="sm"
                />
                <Group justify="end">
                  <Button
                    onClick={nextStep}
                    disabled={
                      !shippingAddress.name ||
                      !shippingAddress.address ||
                      !shippingAddress.phone
                    }
                  >
                    Continue
                  </Button>
                </Group>
              </Paper>
            )}
          </Timeline.Item>

          <Timeline.Item title="Shipping Method" bullet="2">
            {activeStep === 1 && (
              <Paper shadow="lg" p="md" mt="sm">
                <Select
                  label="Select a shipping method"
                  placeholder="Choose"
                  data={[
                    {
                      value: "standard",
                      label: "Standard Delivery – ₹50 (3-5 days)",
                    },
                    {
                      value: "express",
                      label: "Express Delivery – ₹100 (1-2 days)",
                    },
                  ]}
                  value={shippingMethod}
                  onChange={setShippingMethod}
                  mb="sm"
                />
                <Group justify="space-between">
                  <Button variant="default" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!shippingMethod}>
                    Continue
                  </Button>
                </Group>
              </Paper>
            )}
          </Timeline.Item>

          <Timeline.Item title="Payment Method" bullet="3">
            {activeStep === 2 && (
              <Paper shadow="sm" p="md" mt="sm">
                <Title order={4} mb="md">
                  Select Payment Method
                </Title>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="md">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = paymentMethod === option.value;

                    return (
                      <Paper
                        key={option.value}
                        withBorder
                        radius="md"
                        p="sm"
                        onClick={() => setPaymentMethod(option.value)}
                        style={{
                          borderColor: isSelected ? "#5f3dc4" : "#e0e0e0",
                          borderWidth: 2,
                          borderStyle: "solid",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Group>
                          <Icon
                            size={28}
                            color={isSelected ? "#5f3dc4" : "#868e96"}
                          />
                          <Text size="sm" fw={isSelected ? 600 : 400}>
                            {option.label}
                          </Text>
                        </Group>
                      </Paper>
                    );
                  })}
                </SimpleGrid>

                <Group justify="space-between">
                  <Button variant="default" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!paymentMethod}>
                    Continue
                  </Button>
                </Group>
              </Paper>
            )}
          </Timeline.Item>

          <Timeline.Item title="Review & Place Order" bullet="4">
            {activeStep === 3 && (
              <Paper shadow="lg" p="md" mt="sm">
                <Title order={4} mb="sm">
                  Review Details
                </Title>
                <Text fw={500}>Shipping:</Text>
                <Text size="sm">{shippingAddress.name}</Text>
                <Text size="sm">{shippingAddress.address}</Text>
                <Text size="sm">{shippingAddress.phone}</Text>
                <Divider my="sm" />
                <Text fw={500}>Shipping Method:</Text>
                <Text size="sm">
                  {shippingMethod === "standard"
                    ? "Standard Delivery – ₹50"
                    : "Express Delivery – ₹100"}
                </Text>
                <Divider my="sm" />
                <Text fw={500}>Payment Method:</Text>
                <Text size="sm">{paymentMethod.toUpperCase()}</Text>

                <Group justify="space-between" mt="md">
                  <Button variant="default" onClick={prevStep}>
                    Back
                  </Button>
                  <Button color="violet">Place Order</Button>
                </Group>
              </Paper>
            )}
          </Timeline.Item>
        </Timeline>
      </Container>
    </>
  );
}

export default CustomerCheckout;
