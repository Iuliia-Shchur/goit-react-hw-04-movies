import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./Navigation/Navigation";
import Loader from "./Components/Loader/Loader";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage" /* webpackChunkName: "home-view" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage/MoviesPage" /* webpackChunkName: "movies-view" */)
);
const MovieDetailsPage = lazy(() =>
  import("./views/MovieDetailsPage/MovieDetailsPage")
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

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="notFound">
            <NotFound />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
