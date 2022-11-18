import React from 'react';
import { Router, unstable_HistoryRouter } from 'react-router-dom';
import {useHistory} from 'react-router-dom';


const PostItem = (props) => {
  const rputer = useHistory()
  return (
    <div className="post">
      <div className="post__context">
        <strong>{props.number} {props.post.title}</strong>
        <div>
        {props.post.body}
        </div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router.push(`/posts/${props.post.id}`) }>
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
