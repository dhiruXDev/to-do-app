import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoApp from '../component/Todo/TodoApp';
import Login from '../component/Auth/Login';
import Register from '../component/Auth/Register';
import PrivateRoute from './PrivateRoute';
import NotFound from '../component/NotFound/NotFound';

const AppRoutes = () => {
	return (
    <BrowserRouter>   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<TodoApp/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
	);
};

export default AppRoutes;
