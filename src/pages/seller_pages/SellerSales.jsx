import React from "react";
import SellerHeaderMenu from "./SellerHeaderMenu";

function SellerSales() {
	return (
		<>
			<SellerHeaderMenu />
			<h1
				style={{
					color: "#555",
					fontSize: "32px",
					textAlign: "center",
					marginTop: "50px",
					fontWeight: "bold",
					fontFamily: "Arial, sans-serif",
				}}
			>
				In Process
			</h1>
		</>
	);
}

export default SellerSales;
