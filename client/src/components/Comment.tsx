import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Comment {
    id: number;
    userId: string;
    exerciseId: number;
    text: string;
}

interface User {
    id: number;
    name: string;
}

const Comment: React.FC<Comment> = ({userId, exerciseId, id, text}) => {

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
        <div className="card" style={{ width: 600 }}>
          <div className="card-body">
            <h5 className="card-title"><strong>{user.name}</strong> </h5>
            <p className="card-text">{text}</p>
          </div>    
        </div>
      );
}
export default Comment;
