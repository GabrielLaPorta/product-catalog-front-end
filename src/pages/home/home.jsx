import React, {useState, useEffect}from "react";
import axios from "axios";
import ProductCard from "../../components/product-card";
import Menu from '../../components/menu';
import Footer from '../../components/footer';
import { Grid } from "@material-ui/core";

function ProductsList(){   
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
       axios.get(`${process.env.REACT_APP_API_URL}/product`).then((response) => {
            const { data } = response;
            if (data) {
                setProducts(data);
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return products.map(product =>
        <ProductCard key={product.id} title={product.name} description={product.description} imageUrl={product.image_url} price={product.price} />
    )
}

function Home() {
   
    return (
        <>
            <Menu />
            <Grid
                container
                justifyContent="center"
                alignItems="center">
                <ProductsList/>
            </Grid>
            <Footer/>
        </>
    )
}

export default Home