import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Category {
    id: number;
    userId: string;
    title: string;
    description: string;
}

const Category: React.FC<Category> = ({ id, userId, title, description }) => {
    return (
        <React.Fragment>
            <td><Link to={"/api/categories/" + id + "/exercises"}>{title}</Link></td>,
            <td>{description}</td>
            </React.Fragment>
    );
}
export default Category;