const BookingSuccessScreen = () => {
  return (
    <div className="success-hero">
      <div className="success-card">

        <div className="success-icon">✔</div>

        <h1 className="success-title">Plata a fost înregistrată</h1>

        <p className="success-subtitle">
          Rezervarea ta a fost creată cu succes. O poți vedea în secțiunea „Rezervările mele”.
        </p>

        <a href="/mybookings" className="btn-success-back">
          Vezi rezervările mele
        </a>

      </div>
    </div>
  );
};

export default BookingSuccessScreen;
