import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../components/Navbar";
import CommentListItem from "../components/Comment/CommentListItem";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateCommentModal from "../components/Comment/CreateComment";
import DeleteCommentModal from "../components/Comment/DeleteComment";
import EditCommentModal from "../components/Comment/EditComment";
import YouTube from "react-youtube";
import YouTubeVideoId from "youtube-video-id";
import "./home.css";

interface ExerciseWrapper {
    id: number;
    categoryId: number;
}

interface Exercise {
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

interface Comment {
    id: number;
    userId: string;
    exerciseId: number;
    text: string;
}

interface User {
    uuid: string;
    name: string;
    roleId: number;
}

function getId(url: string) {
    let regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    const match = regex.exec(url);
    return match ? match[3] : '';
}

const Exercise: React.FC<ExerciseWrapper> = ({ id, categoryId }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const [showCreateComment, setShowCreateComment] = useState<boolean>(false);
    const [showDeleteComment, setShowDeleteComment] = useState<boolean>(false);
    const [showEditComment, setShowEditComment] = useState<boolean>(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

    const [exercise, setExercise] = useState<Exercise>({
        id: 0,
        userId: '',
        categoryId: 0,
        title: '',
        difficulty: '',
        description: '',
        sets: 0,
        reps: 0,
        duration: 0,
        video_url: ''
    });

    const youtubeRegEx = new RegExp(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|watch\?.+&v=))((\w|-){11})(?:\S+)?$/);
    const opts = {
        // responsive height and width
        width: "100%",
        height: "400",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken !== null) {
            axios.get('http://localhost:8000/api/users/me', {
                headers: {
                    Authorization: `${accessToken}`
                }
            }).then((response) => {
                setUser(response.data);
            }).catch((error) => {
                // check if error is jwt expired
                console.log('Error:', error);
            });
        }
    }, []);

    useEffect(() => {
        try {
            axios.get('http://localhost:8000/api/categories/' + categoryId + '/exercises/' + id).then((response) => {
                const exercise = response.data;
                setExercise(exercise);
                console.log('video id:', getId(exercise.video_url));
            })
        } catch (error) {
            console.error('Error fetching exercise:', error);
        }
    }, []);

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:8000/api/categories/' + categoryId + '/exercises/' + id + '/comments').then((response) => {
                const comments = response.data.map((comment: Comment) => ({
                    id: comment.id,
                    userId: comment.userId,
                    exerciseId: comment.exerciseId,
                    text: comment.text
                }));
                setComments(comments);
            });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, []);

    return (
        <>
            <Nav />
            <Button onClick={() => navigate(-1)}>Back</Button>
            <div className="container-box">
                <h1>{exercise.title}</h1>
                <p>{exercise.description}</p>
                <p><b>Difficulty:</b> {exercise.difficulty}</p>
                <p><b>Duration:</b> {exercise.duration} minutes</p>
                {exercise.sets > 0 && (
                    <p><b>Sets:</b> {exercise.sets}</p>
                )}
                {exercise.reps > 0 && (
                    <p><b>Reps:</b> {exercise.reps}</p>
                )}
                {youtubeRegEx.test(exercise.video_url) && (
                    <>
                        <p><b>Video:</b></p>
                        <div className="video-container">
                            <YouTube videoId={getId(exercise.video_url)} opts={opts} />
                        </div>
                    </>
                )}
                <br />
                <div className="container-row">
                    <h3>Comments</h3>
                    {user && (
                        <Button onClick={() => setShowCreateComment(true)}>Create Comment</Button>)}
                </div>
                <Row className="g-2">
                    {[...comments].reverse().map((comment, index) => (
                        <Col key={index} xs={12} sm={12} md={6} lg={4}>
                            <Card className="card-box h-100">
                                <Card.Body>
                                    <Card.Title>
                                        <CommentListItem userId={comment.userId} />
                                    </Card.Title>
                                    <Card.Text>{comment.text}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="container-row">
                                    {user && user.uuid === comment.userId && (
                                        <>
                                            <Button variant="primary" onClick={() => {
                                                setSelectedComment(comment);
                                                setShowEditComment(true);
                                            }}>Edit</Button>
                                            <Button variant="danger" onClick={() => {
                                                setSelectedComment(comment);
                                                setShowDeleteComment(true);
                                            }}>Delete</Button>

                                        </>
                                    )}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            {showCreateComment && (
                <CreateCommentModal isVisible={showCreateComment}
                    onClose={() => setShowCreateComment(false)}
                    categoryId={categoryId}
                    exerciseId={id} />
            )}
            {showDeleteComment && selectedComment && (
                <DeleteCommentModal isVisible={showDeleteComment}
                    onClose={() => setShowDeleteComment(false)}
                    commentId={selectedComment.id}
                    exerciseId={selectedComment.exerciseId}
                    categoryId={categoryId} />
            )}
            {showEditComment && selectedComment && (
                <EditCommentModal isVisible={showEditComment} onClose={() => setShowEditComment(false)}
                    categoryId={categoryId} comment={selectedComment} />
            )}
        </>
    )
}
export default Exercise;