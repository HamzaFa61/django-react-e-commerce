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

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<HomeScreen/>} exact />
					<Route path="/product/:id" element={<ProductScreen />} />
				</Routes>
				<Footer />
			</Router>
		</>
	);
}

export default App;
