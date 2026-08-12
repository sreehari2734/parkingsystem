import React, { useEffect } from "react";
import { ArrowRight, Building2, Car, Sparkles } from "lucide-react";

const GOOGLE_CLIENT_ID =
  "589307444357-dg85kpnfmvc5a567kji4rii7k7hftvh5.apps.googleusercontent.com";

export default function WelcomePage({ onContinue }) {

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,

          callback: handleGoogleLogin,
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleGoogleLogin(response) {
    try {
      console.log("Google login received");

      const result = await fetch(
        "http://localhost:5000/api/login/google",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            credential: response.credential,
          }),
        }
      );

      const data = await result.json();

      console.log("Backend response:", data);

      if (!result.ok) {
        alert(data.message || "Google login failed");
        return;
      }

      alert(`Welcome ${data.user.name || data.user.email}`);

      // Go to next page
      onContinue();

    } catch (error) {
      console.error("Backend connection error:", error);

      alert(
        "Backend connection failed. Make sure Node server is running on port 5000."
      );
    }
  }

  function loginWithGoogle() {
    if (!window.google) {
      alert("Google login is still loading. Try again.");
      return;
    }

    window.google.accounts.id.prompt();
  }

  async function loginWithEmail() {
    const email = window.prompt("Enter your email:");

    if (!email) return;

    try {
      const result = await fetch(
        "http://localhost:5000/api/login/email",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const data = await result.json();

      console.log(data);

      if (!result.ok) {
        alert(data.message || "Email login failed");
        return;
      }

      alert("Email saved successfully!");

      onContinue();

    } catch (error) {
      console.error(error);

      alert(
        "Backend connection failed. Make sure Node server is running on port 5000."
      );
    }
  }

  return (
    <section className="welcome page-enter">

      <div className="welcome-copy">

        <span className="eyebrow">
          <Sparkles size={16} />
          Smart campus parking
        </span>

        <h1>
          Park confidently.
          <br />
          <em>Leave safely.</em>
        </h1>

        <p>
          Find the best nearby parking slot, navigate to it, and let
          ParkGuardian handle the rest.
        </p>

        <div className="signin-card">

          <div>
            <strong>Welcome to Campus Parking</strong>
            <span>Scan, sign in, and select a slot</span>
          </div>

          <button
            className="google-btn"
            onClick={loginWithGoogle}
          >
            <img
              className="google-mark"
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />

            Continue with Google

            <ArrowRight size={18} />
          </button>

          <button
            className="email-btn"
            onClick={loginWithEmail}
          >
            Continue with email
          </button>

        </div>

        <small>
          By continuing, you agree to receive essential parking and
          safety notifications.
        </small>

      </div>

      <div className="hero-card">

        <div className="hero-map">

          <span className="map-line one" />
          <span className="map-line two" />
          <span className="map-line three" />

          <span className="destination-dot">
            <Building2 size={22} />
          </span>

          <span className="car-dot">
            <Car size={23} />
          </span>

          <span className="route-dash" />

        </div>

        <div className="hero-card-copy">

          <span className="tiny-label">
            YOUR SMARTEST ROUTE
          </span>

          <strong>
            Parking and peace of mind.
          </strong>

          <span>
            Real-time slots · safety check-ins · seamless exit
          </span>

        </div>

      </div>

    </section>
  );
}