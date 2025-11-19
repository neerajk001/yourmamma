import { useUser, UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function UserProfileBox() {
  const { user } = useUser();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (user) {
      setStatus("syncing");

      fetch("http://localhost:3000/api/auth/sync", {  
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || user.firstName,
          profileImgUrl: user.imageUrl,
        }),
      })
        .then(() => setStatus("success"))
        .catch(() => setStatus("idle"));
    }
  }, [user]);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        width: "260px",
        borderRadius: "10px",
        fontFamily: "sans-serif",
        background: "#f9f9f9",
      }}
    >
      <SignedOut>
        <h3>You are not logged in</h3>
        <SignInButton>
          <button
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "none",
              background: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div style={{ textAlign: "center" }}>
          {/* Clerk Profile Image */}
          <img
            src={user?.imageUrl}
            alt="Profile"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />

          <h3>{user?.username || user?.firstName}</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>
            {user?.primaryEmailAddress?.emailAddress}
          </p>

          {/* Sync status */}
          {status === "syncing" && (
            <p style={{ color: "blue", fontSize: "14px" }}>Syncing… 🔄</p>
          )}
          {status === "success" && (
            <p style={{ color: "green", fontSize: "14px" }}>Synced ✔</p>
          )}

          {/* Clerk Logout Button */}
          <div style={{ marginTop: "15px" }}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
