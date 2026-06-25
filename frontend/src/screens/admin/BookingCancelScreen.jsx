import React from 'react';
import { Link } from 'react-router-dom';

const BookingCancelScreen = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Plata a fost anulată</h1>
      <p className="mb-4">
        Nu s-a efectuat nicio plată și rezervarea nu a fost creată.
      </p>

      <Link to="/" className="btn btn-primary">
        Înapoi la pagina principală
      </Link>
    </div>
  );
};

export default BookingCancelScreen;
