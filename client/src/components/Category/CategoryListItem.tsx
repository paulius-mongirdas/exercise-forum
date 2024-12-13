import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface Category {
    id: number;
    userId: string;
    title: string;
    description: string;
}

const Category: React.FC<Category> = ({id, userId, title, description}) => {

    return (
        <tr>
            <td><Link to={"/api/categories/" + id + "/exercises"}>{title}</Link></td>
            <td>{description}</td>
        </tr>
    );
}
export default Category;