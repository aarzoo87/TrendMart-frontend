import React, { useState } from "react";
import {
  Center,
  Paper,
  Stack,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Select,
  Grid,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const registerParams = {
      api: "register_user",
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile: mobile,
      gender: gender === "Male" ? "1" : gender === "Female" ? "2" : "3",
      dob: dateOfBirth,
      role: role === "Customer" ? "2" : "1",
      password: password,
    };
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(registerParams),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1) {
          notifications.show({
            title: "Registration Successful",
            message: data.message,
            color: "green",
            icon: <IconCheck />,
          });
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobile("");
          setGender("");
          setPassword("");
          setDateOfBirth("");
          setRole("");
          navigate("/login");
        } else {
          notifications.show({
            title: "Registration Failed",
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
        shadow="lg"
        p="xl"
        radius="lg"
        w={480}
        style={{ backgroundColor: "white" }}
      >
        <Stack spacing="md">
          <Title order={2} ta="center" c="blue">
            Create Your TrendMart Account
          </Title>

          <form onSubmit={handleRegister}>
            {/* Name Section */}
            <Grid gutter="md">
              <Grid.Col span={6}>
                <TextInput
                  label="First Name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Last Name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  required
                />
              </Grid.Col>
            </Grid>

            {/* Contact Info */}
            <TextInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              mt="md"
            />
            <TextInput
              label="Phone Number"
              placeholder="9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.currentTarget.value)}
              type="tel"
              required
            />

            <Grid gutter="md">
              <Grid.Col span={6}>
                <Select
                  label="Gender"
                  placeholder="Select"
                  data={["Male", "Female", "Other"]}
                  required
                  value={gender}
                  onChange={setGender}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Date of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) =>
                    setDateOfBirth(event.currentTarget.value)
                  }
                  required
                />
              </Grid.Col>
            </Grid>

            <Divider my="sm" />

            {/* Role & Passwords */}
            <Select
              label="Register As"
              placeholder="Select role"
              data={["Customer", "Seller"]}
              value={role}
              onChange={setRole}
              required
              mt="sm"
            />

            <Grid gutter="md" mt="md">
              <Grid.Col span={6}>
                <PasswordInput
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Re-enter password"
                  required
                />
              </Grid.Col>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              mt="xl"
              s
            >
              Create Account
            </Button>

            <Group justify="center" mt="md">
              <Text size="sm">
                Already have an account?{" "}
                <Text
                  component="a"
                  href="/login"
                  c="blue"
                  fw={600}
                  style={{ textDecoration: "underline" }}
                >
                  Login
                </Text>
              </Text>
            </Group>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
}
