import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/UserInterface/Home";
import AdminLogin from "./Components/Administrator/Administartor/AdminLogin";
import Dashboard from "./Components/Administrator/Administartor/Dashboard";
import ShowVehicle from "./Components/UserInterface/MyComponents/ShowVehicle";
import BookingDetails from "./Components/UserInterface/MyComponents/BookingDetails";
import PaymentGateWay from "./Components/UserInterface/MyComponents/PaymentGateWay";
import Subscriptions from "./Components/UserInterface/MyComponents/Subscriptions";
import SubBenefits from "./Components/UserInterface/MyComponents/VehicleSubscription";
import Benefits from "./Components/Administrator/Benefits/Benefits";
import SubscriptionVehicle from "./Components/UserInterface/MyComponents/SubscriptionVehicle";
import Map from "./Components/UserInterface/MyComponents/Map";
import SubscriptionDetails from "./Components/UserInterface/MyComponents/SubscriptionDetails";
import VehicleSubscriptionDetail from "./Components/UserInterface/MyComponents/VehicleSubscriptionDetail";
import SubscriptionPayment from "./Components/UserInterface/MyComponents/SubscriptionPayment";
import RentalPayment from "./Components/UserInterface/MyComponents/RentalPayment";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PaymentGateWay/>} path="/paymentgateway" />
          <Route element={<ShowVehicle/>} path="/showvehicle" />
          <Route element={<BookingDetails/>} path="/booking" />
          <Route element={<AdminLogin/>} path="/adminlogin" />
          <Route element={<Dashboard/>} path="/dashboard/*" />
          <Route element={<Subscriptions/>} path="/subscriptions" />
          <Route element={<SubBenefits/>} path="/benefits" />
          <Route element={<Benefits/>} path="/benefit" />
          <Route path='/' element={<Home />} />
          <Route element={<SubscriptionDetails/>} path="/subscriptiondetail" />
          <Route element={<SubscriptionVehicle/>} path="/subscriptionvehicle" />
          <Route element={<VehicleSubscriptionDetail/>} path="/vehiclesubscriptiondetail" />
          <Route element={<SubscriptionPayment />} path="/subscriptionpayment" />
          <Route element={<Map/>} path="/map" />
          <Route element={<RentalPayment/>} path="/rental" />
        </Routes>
      </Router>
     
      
    </div>
  );
}

export default App;
