import React from "react";
import { BrowserRouter, Route, Routes ,Navigate} from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from "../pages/PostIdPage";
import { publicRoutes,privateRoutes } from "../router/index";

const AppRouter = () => {
  
    return (
      isAuth 
      ?
       <Routes>
        {privateRoutes.map(route =>
          <Route 
          element = {route.component}//route.component.name>} //{el}//{<PostIdPage/>}
          path={route.path}
          exact={route.exact}
          key={route.path}
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