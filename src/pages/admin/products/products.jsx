import React, {useState, useEffect} from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '../../../components/menu';
import Footer from '../../../components/footer';
import { Grid } from "@material-ui/core";
import { Delete, Edit, Add } from '@mui/icons-material';
import { Link} from "react-router-dom";
import { Button } from "react-materialize";
import { useNavigate } from "react-router-dom";


const Products = () => {
    const navigate = useNavigate();
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

    const deleteProduct = (btn) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/product/${btn.currentTarget.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('app-token'),
            }
            }).then((response) => {
                loadProducts();
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Menu />
            <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                <h1>Lista de Produtos</h1>
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
                <Button><Link to="/admin/products/form"><Add/></Link></Button>
                <List sx={{ width: '50%', bgcolor: 'background.paper', margin: 'auto'}}>
                    {
                        products.map((product) => {
                            return (
                                <>
                                    <ListItem key={product.id}>
                                        <ListItemAvatar style={{width: "10%"}}>
                                            <Avatar alt={product.name} src={product.image_url} />
                                        </ListItemAvatar>
                                        <ListItemText
                                        style={{width: "90%"}}
                                        primary={product.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {product.description}
                                                </Typography>
                                                - {product.category_name}
                                            </React.Fragment>
                                        }
                                        />
                                        <ListItemButton style={{backgroundColor: "#ffffff"}} >
                                            <Button onClick={()=> navigate({pathname:`/admin/products/form/${product.id}`})}>
                                                <Edit sx={{ color: "#0060a1" }}/>
                                            </Button>
                                        </ListItemButton>
                                        <ListItemButton style={{backgroundColor: "#ffffff"}}>
                                            <Button onClick={deleteProduct} id={product.id}>
                                                <Delete sx={{ color: "#e15448" }}/>
                                            </Button>
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>
                            ) 
                        })
                    }
                </List>
            </Grid>
            <Footer/>
        </>
    )
}

export default Products