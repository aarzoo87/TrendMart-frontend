import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Paper,
  Title,
  Text,
  Stack,
  Center,
  Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginRole, setLoginRole] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const handleCheckLogin = (e) => {
    e.preventDefault();
    const loginParams = {
      api: "get_login_details",
      email: loginEmail,
      role: loginRole,
      password: loginPass,
    };
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(loginParams),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          notifications.show({
            title: "Login Successful",
            message: data.message,
            color: "green",
            icon: <IconCheck />,
          });
          const loginDetails = {
            role: loginRole,
            email: loginEmail,
            user_id: data.data,
          };
          const encodedLoginDetails = btoa(JSON.stringify(loginDetails));
          localStorage.setItem("loginDetails", encodedLoginDetails);
          if (loginRole === "1") {
            navigate("/seller/dashboard");
          } else {
            navigate("/customer/home");
          }
        } else {
          notifications.show({
            title: "Login Failed",
            message: data.message,
            color: "red",
            icon: <IconX />,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Center h="100vh" bg="gray.0">
      <Paper
        withBorder
        shadow="md"
        p="xl"
        radius="md"
        w={400}
        style={{ backgroundColor: "white" }}
      >
        <Stack spacing="md">
          <Title order={2} ta="center" c="blue">
            TrendMart Login
          </Title>

          <form onSubmit={handleCheckLogin}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.currentTarget.value)}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              value={loginPass}
              onChange={(e) => setLoginPass(e.currentTarget.value)}
            />

            <Select
              label="Login As"
              placeholder="Select role"
              data={[
                { label: "Seller", value: "1" },
                { label: "Customer", value: "2" },
              ]}
              mt="sm"
              value={loginRole}
              onChange={setLoginRole}
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" fullWidth variant="filled" color="blue">
                Login
              </Button>
            </Group>
            <Group justify="center" mt="md">
              <Text size="sm">
                Don&apos;t have an account?{" "}
                <Text
                  component="a"
                  href="/register"
                  c="blue"
                  fw={500}
                  underline
                >
                  Sign Up
                </Text>
              </Text>
            </Group>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
}
