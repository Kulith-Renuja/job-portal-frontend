// /src/company/CompanyLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "./Header"; 
import Footer from "../components/Footer"; 

export default function CompanyLayout() {
  return (
    <div className="company-layout">
      <Header />
        <main className="company-content">
            <Outlet />
        </main>
      <Footer />
    </div>
  );
}
