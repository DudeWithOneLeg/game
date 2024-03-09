import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls, PointerLockControls } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import World from "./components/World";
import { Avatar } from "./components/Avatar";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Suspense>
            <Canvas dpr={[1, 2]} shadows>
              {/* <Avatar rotation={[0, 0, 0]}/> */}
              <World />
              <color attach="background" args={["#213547"]} />
              {/* <OrbitControls /> */}

            
            </Canvas>
          <Loader />
          </Suspense>
          <Route path="/login">{/* <LoginFormPage /> */}</Route>
          <Route path="/signup">{/* <SignupFormPage /> */}</Route>
        </Switch>
      )}
    </>
  );
}

export default App;
