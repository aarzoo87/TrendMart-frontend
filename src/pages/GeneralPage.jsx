import { LoadingOverlay } from "@mantine/core";

export default function Loader({ loaderVisible }) {
  return (
    <>
      <LoadingOverlay
        visible={loaderVisible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </>
  );
}
