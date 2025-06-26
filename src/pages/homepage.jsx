import { Box, Button, Flex, Popover, Stack, Text } from "@mantine/core";

function Home() {
  return (
    <Box p="lg">
      <Flex justify="space-between" align="center">
        <Text fw={700} size="xl">
          TrendMart
        </Text>

        <Popover width={300} position="bottom-end" withArrow shadow="md">
          <Popover.Target>
            <Button variant="light">Login</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <Button fullWidth>Login as Admin</Button>
              <Button fullWidth variant="outline">
                Login as Customer
              </Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Flex>
    </Box>
  );
}

export default Home;
