import React, {useState, useEffect}from "react";
import axios from "axios";
import ProductCard from "../../components/product-card";
import Menu from '../../components/menu';
import Footer from '../../components/footer';
import { Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

function ProductsList(){   
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);
    
    const loadProducts = (values) => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/search`, {
            params: {
                term: values?.searchTerm
            }
            }).then((response) => {
                const { data } = response;
                if (data) {
                    setProducts(data);
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <br/>
            <Formik 
                initialValues={{}} 
                onSubmit={loadProducts}>
                <Form className="Form">
                    <Field
                        name="searchTerm" 
                        placeholder="Busca"
                        className="Form-Field"/>
                    <input type="submit" value="Buscar" className="Form-Btn"/>
                </Form>
            </Formik>
            <br/>
            <Grid
                container
                justifyContent="center"
                alignItems="center">
                {products.map(product =>
                    <ProductCard key={product.id} title={product.name} description={product.description} imageUrl={product.image_url} price={product.price} />
                )}
            </Grid>
        </>
    )
}

function Home() {
   
    return (
        <>
            <Menu />
                <ProductsList/>
            <Footer/>
        </>
    )
}

export default Home