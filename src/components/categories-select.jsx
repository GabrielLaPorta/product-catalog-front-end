import React, {useState, useEffect}from "react";
import Select from 'react-select'
import axios from "axios";
import { MenuItem } from "react-materialize";
import { InputLabel } from "@material-ui/core";

function CategoriesSelect(props){
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
    return ( 
        <>
            <InputLabel id="categories">Categorias</InputLabel>
            <Select labelId="categories" 
                id="select-categories" 
                {...props}
                className="Form-Field">
                { categories.map((row) => (
                    <MenuItem value={row.id}>{row.name}</MenuItem>
                ))}
            </Select>
        </>
    );
}

export default CategoriesSelect