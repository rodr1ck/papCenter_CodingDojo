import './App.css'
import Register from './views/Register'
import Login from './views/Login'
import { UserProvider } from './contexts/userContext'
import Header from './views/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'

function App() {
    return (
        <div className="App">
            <Router>
                <UserProvider>
                    <Header />
                    <div>
                        <Switch>
                            <Route exact path="/dashboard">
                                <Dashboard />
                            </Route>

                            <Route exact path="/">
                                <Login />
                                <Register />
                            </Route>
                        </Switch>
                    </div>
                </UserProvider>
            </Router>
        </div>
    )
}

export default App
