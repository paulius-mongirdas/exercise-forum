import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ExerciseListItem {
    id: number;
    userId: string;
    categoryId: number;
    title: string;
    difficulty: string;
    description: string;
    sets: number;
    reps: number;
    duration: number;
    video_url: string;
}

const ExerciseListItem: React.FC<ExerciseListItem> = ({id, userId, categoryId, title, difficulty, sets, reps, duration, video_url}) => {

    // check if video_url is empty
    let video = video_url;
    if (video_url === '' || video_url === null) {
        video = 'No video available';
    }
    return (
        <tr>
            <td><Link to={"/api/categories/" + categoryId + "/exercises/" + id}>{title}</Link></td>
            <td>{difficulty}</td>
            <td>{duration} minutes</td>
            <td>{sets}</td>
            <td>{reps}</td>
            <td>{video} </td> 
        </tr>
    );
}
export default ExerciseListItem;