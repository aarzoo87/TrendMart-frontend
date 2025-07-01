import React, { useState, useEffect } from "react";
import SellerHeaderMenu from "./SellerHeaderMenu";
import {
	Container,
	MultiSelect,
	Group,
	Select,
	Text,
	Title,
	Radio,
	Card,
	Divider,
	TextInput,
	Modal,
	Button,
	ScrollArea,
	Image,
	Badge,
	Stack,
	Box,
	Anchor,
	Grid,
	NumberInput,
	Textarea,
	FileInput,
	Center,
	ActionIcon,
	SimpleGrid,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconX, IconPencil, IconTrash } from "@tabler/icons-react";
import Loader from "../GeneralPage";

function SellerProducts() {
	const API_BASE_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const [
		addProductOpened,
		{ open: openAddProductModal, close: closeAddProductModal },
	] = useDisclosure(false);
	const [addProductLoader, setAddProductLoader] = useState(false);
	const [categoryData, setCategoryData] = useState([]);
	const [file, setFile] = useState(null);
	const [productName, setProductName] = useState("");
	const [productCategory, setProductCateory] = useState("");
	const [productBrandName, setProductBrandName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productDisPrice, setProductDisPrice] = useState("");
	const [productStock, setProductStock] = useState("");
	const [productDesc, setProductDesc] = useState("");
	const [productList, setProductList] = useState([]);

	const handleOpenAddProductModal = () => {
		openAddProductModal();
		setAddProductLoader(true);
		fetch(API_BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				api: "get_category_details",
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setAddProductLoader(false);
				if (data.status === 1) {
					setCategoryData(data.data);
				} else {
					notifications.show({
						title: "Login Failed",
						message: data.message,
						color: "red",
						icon: <IconX />,
					});
				}
			})
			.catch((err) => {
				setAddProductLoader(false);
				console.error(err);
			});
	};

	const handleCloseModal = () => {
		setFile(null);
		setProductName("");
		setProductPrice("");
		setProductCateory("");
		setProductBrandName("");
		setProductDisPrice("");
		setProductDesc("");
		setProductStock("");
		closeAddProductModal();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("api", "add_product");
		formData.append("product_image", file);
		formData.append("product_name", productName);
		formData.append("product_category", productCategory);
		formData.append("product_brand", productBrandName);
		formData.append("product_price", productPrice);
		formData.append("product_discount_price", productDisPrice);
		formData.append("product_stock", productStock);
		formData.append("product_desc", productDesc);
		fetch(API_BASE_URL, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				handleCloseModal();
				getProductData();
			})
			.catch((err) => console.error(err));
	};

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
				console.log(data);
			})
			.catch((err) => console.error(err));
	};

	const deleteProduct = (productId) => {
		fetch(API_BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				api: "delete_product",
				product_id: productId,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status === 1) {
					getProductData();
				}
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		getProductData();
	}, []);

	const ProductCard = ({ product }) => {
		const [hovered, setHovered] = useState(false);

		return (
			<Box
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{ position: "relative" }}
			>
				<Card
					shadow="sm"
					padding="md"
					radius="lg"
					withBorder
					w="100%"
					style={{ minHeight: 250 }}
				>
					<Card.Section>
						<Image
							src={product.product_image}
							height={140}
							fit="cover"
							alt={product.product_name}
						/>
					</Card.Section>

					<Stack spacing={4} mt="sm">
						<Text fw={600} size="lg">
							{product.product_name}
						</Text>
						<Text fw={500} size="md" c="blue">
							₹{product.product_price}
						</Text>
					</Stack>

					{hovered && (
						<Center
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "rgba(255, 255, 255, 0.7)",
								zIndex: 1,
							}}
						>
							<Group spacing="md">
								<ActionIcon
									size="lg"
									color="blue"
									variant="filled"
								>
									<IconPencil size="1.2rem" />
								</ActionIcon>
								<ActionIcon
									size="lg"
									color="red"
									variant="filled"
									onClick={(e) => deleteProduct(product.id)}
								>
									<IconTrash size="1.2rem" />
								</ActionIcon>
							</Group>
						</Center>
					)}
				</Card>
			</Box>
		);
	};

	return (
		<>
			<SellerHeaderMenu />
			<Modal
				opened={addProductOpened}
				onClose={closeAddProductModal}
				title="Add New Product"
				size="lg"
				overlayProps={{
					backgroundOpacity: 0.5,
					blur: 2,
				}}
			>
				{addProductLoader ? (
					<Center py="xl">
						<Loader loaderVisible={addProductLoader} />
					</Center>
				) : (
					<form onSubmit={handleSubmit}>
						<Stack>
							<TextInput
								label="Product Name"
								placeholder="Smart Watch"
								value={productName}
								onChange={(e) =>
									setProductName(e.currentTarget.value)
								}
								required
							/>

							<Grid>
								<Grid.Col span={6}>
									<Select
										label="Category"
										data={categoryData}
										value={productCategory}
										onChange={setProductCateory}
										placeholder="Select Category"
										required
									/>
								</Grid.Col>

								<Grid.Col span={6}>
									<TextInput
										label="Brand"
										placeholder="Samsung"
										value={productBrandName}
										onChange={(e) =>
											setProductBrandName(
												e.currentTarget.value,
											)
										}
										required
									/>
								</Grid.Col>
							</Grid>

							<Grid>
								<Grid.Col span={4}>
									<NumberInput
										label="Price"
										prefix="₹"
										min={0}
										value={productPrice}
										onChange={(val) => setProductPrice(val)}
										required
									/>
								</Grid.Col>

								<Grid.Col span={4}>
									<NumberInput
										label="Discount Price"
										prefix="₹"
										value={productDisPrice}
										onChange={(val) =>
											setProductDisPrice(val)
										}
										min={0}
									/>
								</Grid.Col>

								<Grid.Col span={4}>
									<NumberInput
										label="Stock"
										min={0}
										value={productStock}
										onChange={(val) => setProductStock(val)}
										required
									/>
								</Grid.Col>
							</Grid>

							<Textarea
								label="Description"
								placeholder="Describe your product..."
								minRows={3}
								value={productDesc}
								onChange={(e) =>
									setProductDesc(e.currentTarget.value)
								}
								required
							/>

							<FileInput
								label="Upload Image"
								placeholder="Choose image"
								accept="image/*"
								value={file}
								onChange={setFile}
								required
							/>

							<Group justify="flex-end" mt="md">
								<Button
									variant="outline"
									onClick={closeAddProductModal}
								>
									Cancel
								</Button>
								<Button type="submit">Save Product</Button>
							</Group>
						</Stack>
					</form>
				)}
			</Modal>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				w="100%"
				style={{ minWidth: 250 }}
			>
				<Container size="xl" py="lg">
					<Button onClick={handleOpenAddProductModal}>
						Add Product
					</Button>
					{/*					<Grid gutter="xl" columns={12} mt="md">
						{productList.map((product) => (
							<Grid.Col span={4} key={product.id}>
								<ProductCard product={product} />
							</Grid.Col>
						))}
					</Grid>*/}
					<SimpleGrid
						cols={4}
						spacing="lg"
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
				</Container>
			</Card>
		</>
	);
}

export default SellerProducts;
