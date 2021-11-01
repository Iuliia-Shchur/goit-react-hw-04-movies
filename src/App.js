import "./App.css";
import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./Navigation/Navigation";
import Loader from "./Components/Loader/Loader";
// import HomePage from "./Components/HomePage/HomePage";
// import MoviesPage from "./views/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./views/MovieDetailsPage/MovieDetailsPage";
// import Cast from "./views/MovieDetailsPage/Cast";
// import NotFoundView from "./views/NotFound/NotFound";

const HomePage = lazy(() => import("./views/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./views/MoviesPage/MoviesPage"));
const NotFound = lazy(() => import("./views/NotFound/NotFound"));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/search-movies">
            <MoviesPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
