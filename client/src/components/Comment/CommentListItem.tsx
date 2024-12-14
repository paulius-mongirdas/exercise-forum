import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Comment {
    userId: string;
}

interface User {
    id: number;
    name: string;
}

const Comment: React.FC<Comment> = ({userId}) => {

    const [user, setUser] = useState<User>({
        id: 0,
        name: ''
    });
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + userId).then((response) => {
            setUser(response.data);
        });
    }, []);

    return (
            <p>{user.name}</p>
      );
}
export default Comment;
