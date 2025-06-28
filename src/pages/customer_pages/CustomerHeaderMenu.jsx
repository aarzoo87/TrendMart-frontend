import {
  Menu,
  Box,
  UnstyledButton,
  Container,
  Group,
  ActionIcon,
  rem,
  Button,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconHeart,
  IconShoppingCart,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function CustomerHeaderMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/favorites" },
    { label: "Orders", path: "/collections" },
  ];

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
        boxShadow: theme.shadows.xs,
      })}
    >
      <Container size="xl" px="md" py="xs">
        <Group justify="space-between" align="center" wrap="nowrap">
          <Group gap="lg" align="center" wrap="nowrap">
            <img
              src="/trendmart_logo.png"
              alt="TrendMart Logo"
              style={{ height: rem(70), borderRadius: rem(6) }}
            />

            <Group gap="xs" wrap="nowrap">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  variant={
                    location.pathname === item.path ? "filled" : "subtle"
                  }
                  color="blue"
                  size="lg"
                  radius="xl"
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          </Group>

          {/* Right Side - Icons */}
          <Group gap="xs">
            <ActionIcon variant="light" size="lg" title="🛒 Cart " color="blue">
              <IconShoppingCart size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              size="lg"
              title="💙 Wishlist"
              color="blue"
            >
              <IconHeart size={18} />
            </ActionIcon>
            <ActionIcon
              variant="light"
              size="lg"
              onClick={toggleColorScheme}
              title="🌙/☀️ Theme"
              color="blue"
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoon size={18} />
              )}
            </ActionIcon>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <ActionIcon
                    variant="light"
                    size="lg"
                    title="My Account"
                    color="blue"
                  >
                    <IconUser size={20} />
                  </ActionIcon>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item icon={<IconUser size={16} stroke={1.5} />}>
                  Profile
                </Menu.Item>
                <Menu.Item icon={<IconSettings size={16} stroke={1.5} />}>
                  Settings
                </Menu.Item>

                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconLogout size={16} stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default CustomerHeaderMenu;
