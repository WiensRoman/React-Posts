import React from 'react';
import { Router, unstable_HistoryRouter } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
  const router = useNavigate()
  console.log(router);
  return (
    <div className="post">
      <div className="post__context">
        <strong>{props.post.id}. {props.post.title}</strong>
        <div>
        {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
          Открыть
        </MyButton>
        <MyButton onClick={() => props.remove(props.post) }>
          Удалить
        </MyButton>
      </div>
     </div>
    
  )
}

export default PostItem;
