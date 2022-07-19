import React, {useState, useEffect}from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./menu.css"
import Logo from "../assets/images/logo-escuro-dourado.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CategoriesList(){   
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
       axios.get(`${process.env.REACT_APP_API_URL}/category`).then((response) => {
            const { data } = response;
            if (data) {
                setCategories(data);
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return categories.map(category =>
        <Button color="inherit" key={category.id} onClick={()=> navigate('/products', {state:{categoryId:category.id}, replace: true})}>
            {category.name}
        </Button>
    );
}

const useStyles = makeStyles({
    bar: {
        backgroundColor: "#000000"
    },
    root: {
        flexGrow: 1,
        width: "100%"
    },
    menuButton: {
        marginRight: 2,
    },
    title: {
        textAlign: "left",
        flexGrow: 1,
    },
});

const Menu = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const isLogged = !!localStorage.getItem('app-token');
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className="menu-link" to={isLogged ? "/admin/home" : "/home"}> <img id="logo-menu" alt="logo" src={Logo}/></Link>
                    </Typography>
                    { !isLogged && <CategoriesList/>}
                    { isLogged &&
                        <>
                            <Button color="inherit" onClick={()=> navigate('/admin/products', {replace: true})}>Produtos</Button>
                            <Button color="inherit" onClick={()=> navigate('/admin/categories', {replace: true})}>Categorias</Button>
                            <Button color="inherit" onClick={()=> {localStorage.clear('app-token'); navigate('/home', {replace: true});}}>Sair</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default Menu