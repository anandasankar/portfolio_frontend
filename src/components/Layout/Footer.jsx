import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto border-top border-secondary">
      <div className="container-fluid px-4">
        <div className="row align-items-center text-center">

          <div className="col-12">
            <span className="fw-medium">
              © {new Date().getFullYear()} Hospital Management System. All Rights Reserved.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
