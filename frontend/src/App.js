import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import "./bootstrap.min.css"
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<HomeScreen/>} exact />
					<Route path="/product/:id" element={<ProductScreen />} />
					<Route path="/cart/:productId?" element={<CartScreen />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
