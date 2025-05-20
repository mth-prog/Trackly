import {Route, Router} from "electron-router-dom"
Layout
import CreateHabits from "./pages/CreateHabit"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout"


export function Routes(){
    return (
        <Router main= {
            <Route path="/" element={ <Layout/> }>
                <Route path="/" element= { <Home/> } />
                <Route path="/create" element= { <CreateHabits/> } />
                <Route path="/dashboard" element= { <Dashboard/> } />
            </Route>
            }
        />
    )
}