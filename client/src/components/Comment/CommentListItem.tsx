import apiClient from "../../ApiClient";
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
        apiClient.get('/api/users/' + userId).then((response) => {
            setUser(response.data);
        });
    }, []);

    return (
            <p>{user.name}</p>
      );
}
export default Comment;
