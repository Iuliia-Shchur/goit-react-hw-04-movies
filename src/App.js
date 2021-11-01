import "./App.css";
import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./Navigation/Navigation";
import Loader from "./Components/Loader/Loader";
import Container from "./Components/Container/Container";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "home-view" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage" /* webpackChunkName: "movies-view" */)
);
const MovieDetailsPage = lazy(() =>
  import("./views/MovieDetailsPage/MovieDetailsPage")
);
const Cast = lazy(() => import("./views/MovieDetailsPage/Cast"));
const MovieReviews = lazy(() =>
  import("./views/MovieDetailsPage/MovieReviews")
);
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

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId" exact>
            <MovieDetailsPage />
          </Route>

          <Route path="movies/:movieId/cast">
            <Cast />
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
