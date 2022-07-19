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
import { Delete, Edit } from '@mui/icons-material';
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
                console.log(data)
                if (data) {
                    setProducts(data);
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
        <Menu />
        <h1>Lista de Produtos</h1>
        <Formik 
            initialValues={{}} 
            onSubmit={loadProducts}>
            <Form className="Form">
                <div className="Form-Group">
                    <Field
                        name="searchTerm" 
                        placeholder="Busca"
                        className="Form-Field"/>
                </div>
                <button className="Form-Btn" type="submit">
                    Buscar
                </button>
            </Form>
        </Formik>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
                products.map((product) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start" key={product.id}>
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
                                <ListItemButton style={{width: "5%"}} /* onClick={navigate('/admin/product/form', {state:{product: product}, replace: true})} */><Edit/></ListItemButton>
                                <ListItemButton style={{width: "5%"}}><Delete/></ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ) 
                })
            }
        </List>
        </>
    )
}

export default Products