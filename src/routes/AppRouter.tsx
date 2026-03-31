import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from './routePaths';

import Home          from '../pages/Home';
import FoodAndDrinks from '../pages/FoodAndDrinks';
import Combos        from '../pages/Combos';
import About         from '../pages/About';
import Contact       from '../pages/Contact';
const AppRouter = () => {
  return (
    <BrowserRouter>
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
