import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const Route = createFileRoute('/not-authorized')({
  component: NotAuthorizedPage,
});

function NotAuthorizedPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const handleGoToDashboard = () => {
    navigate({ to: '/user/dashboard' });
  };

  return (
    <div className="not-authorized-page">
      {/* Animated background */}
      <div className="not-authorized-bg">
        <div className="not-authorized-orb not-authorized-orb-1" />
        <div className="not-authorized-orb not-authorized-orb-2" />
        <div className="not-authorized-orb not-authorized-orb-3" />
        <div className="not-authorized-grid" />
      </div>

      <div className="not-authorized-content">
        {/* Icon */}
        <div className="not-authorized-icon-wrapper">
          <div className="not-authorized-icon-ring not-authorized-icon-ring-outer" />
          <div className="not-authorized-icon-ring not-authorized-icon-ring-inner" />
          <div className="not-authorized-icon-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Error code */}
        <div className="not-authorized-code">403</div>

        {/* Heading */}
        <h1 className="not-authorized-heading">Access Denied</h1>

        {/* Description */}
        <p className="not-authorized-description">
          You don't have permission to view this page. This area is restricted
          to administrators only.
        </p>

        {/* Divider */}
        <div className="not-authorized-divider">
          <span className="not-authorized-divider-text">What would you like to do?</span>
        </div>

        {/* Actions */}
        <div className="not-authorized-actions">
          {isLoggedIn ? (
            <button
              onClick={handleGoToDashboard}
              className="not-authorized-btn not-authorized-btn-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Go to Dashboard
            </button>
          ) : (
            <Link to="/login" className="not-authorized-btn not-authorized-btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Sign In
            </Link>
          )}
          <Link to="/" className="not-authorized-btn not-authorized-btn-secondary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
        </div>

        {/* Footer note */}
        <p className="not-authorized-footer">
          If you believe this is a mistake, please contact your administrator.
        </p>
      </div>

      <style>{`
        .not-authorized-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050608;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          padding: 2rem;
        }

        /* Animated background */
        .not-authorized-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .not-authorized-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: not-auth-pulse 8s ease-in-out infinite;
        }

        .not-authorized-orb-1 {
          width: 500px;
          height: 500px;
          top: -150px;
          left: -100px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%);
          animation-delay: 0s;
        }

        .not-authorized-orb-2 {
          width: 400px;
          height: 400px;
          bottom: -100px;
          right: -80px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%);
          animation-delay: -3s;
        }

        .not-authorized-orb-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(127, 29, 29, 0.08) 0%, transparent 70%);
          animation-delay: -6s;
        }

        .not-authorized-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        @keyframes not-auth-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Content card */
        .not-authorized-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 480px;
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(220, 38, 38, 0.1),
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          animation: not-auth-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes not-auth-slide-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Lock icon */
        .not-authorized-icon-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .not-authorized-icon-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(220, 38, 38, 0.3);
          animation: not-auth-ring-spin 12s linear infinite;
        }

        .not-authorized-icon-ring-outer {
          width: 100px;
          height: 100px;
          border-top-color: rgba(220, 38, 38, 0.7);
          animation-direction: normal;
        }

        .not-authorized-icon-ring-inner {
          width: 76px;
          height: 76px;
          border-right-color: rgba(239, 68, 68, 0.5);
          animation-direction: reverse;
          animation-duration: 8s;
        }

        @keyframes not-auth-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .not-authorized-icon-center {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(127, 29, 29, 0.3));
          border: 1px solid rgba(220, 38, 38, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ef4444;
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* 403 code */
        .not-authorized-code {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -3px;
          text-shadow: none;
        }

        /* Heading */
        .not-authorized-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.625rem;
          font-weight: 700;
          color: #f9fafb;
          margin: 0 0 0.75rem;
          letter-spacing: -0.5px;
        }

        /* Description */
        .not-authorized-description {
          font-size: 0.9375rem;
          color: rgba(156, 163, 175, 1);
          line-height: 1.6;
          margin: 0 0 1.75rem;
          max-width: 360px;
        }

        /* Divider */
        .not-authorized-divider {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .not-authorized-divider::before,
        .not-authorized-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .not-authorized-divider-text {
          font-size: 0.75rem;
          color: rgba(107, 114, 128, 1);
          white-space: nowrap;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Actions */
        .not-authorized-actions {
          display: flex;
          gap: 0.75rem;
          width: 100%;
          margin-bottom: 1.5rem;
        }

        .not-authorized-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: 1;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Inter', sans-serif;
        }

        .not-authorized-btn-primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: #fff;
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .not-authorized-btn-primary:hover {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }

        .not-authorized-btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(209, 213, 219, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .not-authorized-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.18);
          color: #fff;
          transform: translateY(-1px);
        }

        /* Footer */
        .not-authorized-footer {
          font-size: 0.8125rem;
          color: rgba(75, 85, 99, 1);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 480px) {
          .not-authorized-content {
            padding: 2rem 1.5rem;
          }
          .not-authorized-code {
            font-size: 4rem;
          }
          .not-authorized-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
