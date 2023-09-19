import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/header'
import Footer from './components/footer'
import Home from './screens/home'
import ProductsList from './screens/productsList'
import About from './screens/about'
import ContactUs from './screens/contactUs'
import Cart from './screens/cart'
import Checkout from './screens/checkout'
import ProductDetails from './screens/productDetails'
import OrderCompleted from './screens/orderCompleted'
import SignOut from './screens/signOut'
import SignIn from './screens/signIn'
import SignUp from './screens/signUp'
import Profile from './screens/profile'
import OrderHistory from './screens/orderHistory'
import Search from './screens/search';
import AllCategories from './screens/allCategories';
import ProductsListByCategory from './screens/productsListByCategory';
import PageNotFound from './screens/pageNotFound';
//admin imports
import AdminAddCategory from './screens/admin/addCategory'
import AdminSignIn from './screens/admin/signIn'
import AdminSignUp from './screens/admin/signUp'
import AdminAddProduct from './screens/admin/addProduct'
import AdminEditProduct from './screens/admin/editProduct'
import AdminProductsList from './screens/admin/productsList'
import AdminProfile from './screens/admin/profile'
import AdminRegisteredUsers from './screens/admin/registeredUsers'
import AdminSignOut from './screens/admin/signOut'
import ScrollToTop from './components/scrollToTop';


function App() {
    return (
        <Router>
            <div className='app'>
                <NavBar />
                <ScrollToTop>
                    <Switch>
                        <Route path={'/'} exact component={Home} />
                        <Route path={'/productsList'} exact component={ProductsList} />
                        <Route path={'/about'} exact component={About} />
                        <Route path={'/contactUs'} exact component={ContactUs} />
                        <Route path={'/signIn'} exact component={SignIn} />
                        <Route path={'/signUp'} exact component={SignUp} />
                        <Route path={'/profile'} exact component={Profile} />
                        <Route path={'/cart'} exact component={Cart} />
                        <Route path={'/checkout'} exact component={Checkout} />
                        <Route path={'/productDetails/:id'} exact component={ProductDetails} />
                        <Route path={'/orderCompleted'} exact component={OrderCompleted} />
                        <Route path={'/signOut'} exact component={SignOut} />
                        <Route path={'/orderHistory'} exact component={OrderHistory} />
                        <Route path={'/search'} exact component={Search} />
                        <Route path={'/allCategories'} exact component={AllCategories} />
                        <Route path={'/productsList/byCategory/:cat'} exact component={ProductsListByCategory} />
                        <Switch>
                            <Route path={'/admin/signUp'} exact component={AdminSignUp} />
                            <Route path={'/admin/signIn'} exact component={AdminSignIn} />
                            <Route path={'/admin/signOut'} exact component={AdminSignOut} />
                            <Route path={'/admin/profile'} exact component={AdminProfile} />
                            <Route path={'/admin/addCategory'} exact component={AdminAddCategory} />
                            <Route path={'/admin/addProduct'} exact component={AdminAddProduct} />
                            <Route path={'/admin/editProduct/:id'} exact component={AdminEditProduct} />
                            <Route path={'/admin/productsList'} exact component={AdminProductsList} />
                            <Route path={'/admin/registeredUsers'} exact component={AdminRegisteredUsers} />
                            <Route path={'/admin/signOut'} exact component={AdminSignOut} />
                            <Route path={'*'} component={PageNotFound} />
                        </Switch>
                        <Route path={'*'} component={PageNotFound} />
                    </Switch>
                </ScrollToTop>
                <Footer />
            </div>
        </Router>
    )
}

export default App
