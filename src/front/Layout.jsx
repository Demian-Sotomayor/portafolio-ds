import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './js/views/App';

const Layout = () => {

    const basename = "/"

  return (
    <div>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<App />} path='/' />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Layout;