import React,{useContext} from "react";
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes,privateRoutes } from "../router/index";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth);

  if (isLoading) {
    return <Loader/>
  }
    return (
      isAuth 
      ?
       <Routes>
        {privateRoutes.map(route =>
          <Route 
          element = {route.component}//route.component.name>} //{el}//{<PostIdPage/>}
          path = {route.path}
          exact = {route.exact}
          key = {route.path}
          />
        )}
        <Route
          path="*"
          element={<Navigate to="/posts" replace />}
        />
    </Routes>
      :
      <Routes>
      {publicRoutes.map(route =>
        <Route 
        element = {route.component}//route.component.name>} //{el}//{<PostIdPage/>}
        path={route.path}
        exact={route.exact}
        key={route.path}
        />
      )}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
  </Routes>
    
    );
};

export default AppRouter;