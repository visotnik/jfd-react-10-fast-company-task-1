import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                {/* оттображение компонента с помощью render. history, location, match
                необходимо передавать дополнительно через props */}
                {/* <Route
                    path="/login/:type?"
                    render={(props) => <Login {...props} />}
                /> */}
                {/* оттображение компонента с помощью component
                (автоматически передаются параметры history, location, match) */}
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
