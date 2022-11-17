import React,{useState,useRef,useMemo, useEffect} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList"
import MyButton from "./components/UI/button/MyButton"
import MyInput from "./components/UI/input/MyInput"
import PostForm from "./components/PostForm"
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import {usePosts} from "./hooks/usePost";
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import {useFetching} from './hooks/useFetching';
import {getPagesArray,getPageCount} from './utils/pages';

//
function App() {
  const [posts,setPosts] = useState([])
  const [filter,setFilter] = useState({sort: '',query: ''})
  const [body,setBody] = useState('')
  const [modal,setModal] = useState(false);

  const [totalPages,setTotalPages] = useState(0);
  const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query);
  const [limit,setLimit] = useState(10);
  const [page,setPage] = useState(1);
  let pagesArray = getPagesArray(totalPages);

  
  const [fetchPosts,isPostsLoading,postError] = useFetching(async (limit,page) => {
    const response = await PostService.getAll(limit,page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount,limit))
  })
  
  useEffect(() => {
    fetchPosts(limit,page)
  },[page])


  const createPost = (newPost) => {
      setPosts([...posts,newPost])
      setModal(false)
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit,page)
  }

  return (  
    <div className="App">
      <button onClick={fetchPosts}>GET POSTS</button>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter = {filter}
        setFilter = {setFilter}
      />

      {postError && 
        <h1>Произошла ошибка ${postError}</h1>
      }

      {isPostsLoading
      ? <div style={{display: 'flex',justifyContent: 'center'}}><Loader /></div>
       : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
        }
        <div className="page__wrapper">
          {pagesArray.map(p => 
          <span 
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}  
          >
            {p}
          </span>
          )}
        </div>
        
  </div>
  );
}

export default App;
