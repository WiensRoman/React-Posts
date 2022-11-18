import React,{ useEffect,useState } from "react";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import { useParams } from "react-router-dom";
const PostIdPage = () => {
    const params = useParams();
    const [post,setPost] = useState({});
    console.log(post)
    const [comments,setComments] = useState([]);
    console.log(comments)
    const [fetchPostById,isLoading,error] = useFetching(async(id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments,isComLoading,comError] = useFetching(async(id) => {
        const response = await PostService.getCommentsByPostId(id)
        setPost(response.data)
    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    },[])
    return (
        <div>
            <h1>
                Вы открыли страницу поста c ID = {params.id}
            </h1>
            {isLoading ? <Loader/> 
            :  <div>{post.id} {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
            ? <Loader/>
            : <div>
            {comments.map(comm => 
                <div style={{marginTop: 15}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
                )}
            </div>
            }
        </div>

    )
}

export default PostIdPage;