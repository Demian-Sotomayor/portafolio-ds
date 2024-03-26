import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './js/views/App';
import Game from './js/views/Game';

const Layout = () => {

    const basename = "/"

  return (
    <>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<App />} path='/' />
                <Route element={<Game />} path='/game' />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Layout;