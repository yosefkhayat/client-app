import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useStore } from "../stores/store";

export { useStore } from "../stores/store"

interface Props extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
    const { userStore: { isLoggerdIn } } = useStore();
    return (
        <Route
            {...rest}
            render={(props) => isLoggerdIn ? <Component {...props} /> : <Redirect to='/' />}
            />
    )
}