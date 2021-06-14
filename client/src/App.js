import './App.css'
import Register from './views/Register'
import Login from './views/Login'
import { UserProvider } from './contexts/userContext'
import Header from './views/Header'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import NewPatient from './views/NewPatient'

import 'antd/dist/antd.css';
import Details from './views/Details'
import Home from './views/Home'
import NewPap from './views/NewPap'
import UpdatePap from './views/UpdatePap'


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

                            <Route exact path="/paps/:id">
                                <Details />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                            <Route path="/newpatient" component={NewPatient} />
                            <Route path="/newpap/:id/" component={NewPap} />
                            <Route path="/paps/:patientId/:papId/edit" component={UpdatePap} />
                            <Route exact path="/">
                                <Home />
                            </Route>
                            
                        </Switch>
                    </div>
                </UserProvider>
            </Router>
        </div>
    )
}

export default App
