import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ROUTES from './routePaths';

import Home          from '../pages/Home';
import FoodAndDrinks from '../pages/FoodAndDrinks';
import Combos        from '../pages/Combos';
import About         from '../pages/About';
import Contact       from '../pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.HOME}            element={<Home />} />
        <Route path={ROUTES.FOOD_AND_DRINKS} element={<FoodAndDrinks />} />
        <Route path={ROUTES.COMBOS}          element={<Combos />} />
        <Route path={ROUTES.ABOUT}           element={<About />} />
        <Route path={ROUTES.CONTACT}         element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
