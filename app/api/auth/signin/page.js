"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/components/loading-indicator";
import Spinner from "react-bootstrap/Spinner";

export default function SignIn() {
  const [providers, setProviders] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [given_name, setGiven_name] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [isGoogleWorking, setIsGoogleWorking] = useState(false);
  const [gender, setGender] = useState("");
  const emailCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordCheck =
    /^(?=(.*[A-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  const textCheck = /^[a-zA-Z]+$/;
  const ageCheck = /^(1[89]|[2-9][0-9])$/;
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = async (e) => {
    e.preventDefault();
    let errorText = "";
    if (!emailCheck.test(email)) {
      errorText = "- Please enter a valid email\n";
    }
    if (!passwordCheck.test(password)) {
      errorText =
        errorText +
        "- Password must contain:\n- 8 characters,\n- at least 1 capital letter,\n- at least 1 special character, &\n- at least 1 number";
    }
    setError(errorText);
    if (emailCheck.test(email) && passwordCheck.test(password)) {
      setIsWorking(true);
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        result.error === "Email Not Found, Please Sign Up"
          ? setUserNotFound(true)
          : setUserNotFound(false);
        console.error("Error:", result.error);
        setIsWorking(false);
      } else {
        setError("");
        setIsWorking(false);
        router.replace("/"); // Redirect on successful login
      }
    }
  };

  const handleSignUp = async () => {
    let errorText = "";
    if (!textCheck.test(given_name) || !textCheck.test(family_name)) {
      errorText = "- Please only use characters when entering your name\n";
    }
    if (!ageCheck.test(age)) {
      errorText =
        errorText +
        "- Please enter whole numbers between 18 & 99 when entering your age\n";
    }
    if (gender != "Male" && gender != "Female") {
      errorText = errorText + "- Please choose a gender\n";
    }
    if (!emailCheck.test(email)) {
      errorText = errorText + "- Please enter a valid email\n";
    }
    if (!passwordCheck.test(password)) {
      errorText =
        errorText +
        "- Password must contain:\n- 8 characters,\n- at least 1 capital letter,\n- at least 1 special character, &\n- at least 1 number\n";
    }
    if (password != confirmPassword) {
      errorText = errorText + "- Passwords do not match";
    }
    setError(errorText);
    if (
      textCheck.test(given_name) &&
      textCheck.test(family_name) &&
      ageCheck.test(age) &&
      (gender === "Male" || gender === "Female") &&
      emailCheck.test(email) &&
      passwordCheck.test(password) &&
      password === confirmPassword
    ) {
      setIsWorking(true);
      fetch(`/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          given_name: given_name,
          family_name: family_name,
          email: email,
          password: password,
          age: Number(age),
          gender: gender,
        }),
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json(); // Parse response if status is 201
          } else if (response.status === 400) {
            console.log(response.error);
            throw new Error(response.error); // Handle 400 error
          } else {
            throw new Error(`Unexpected status: ${response.status}`);
          }
        }) // Parse JSON response
        .then(async (data) => {
          const result = await signIn("credentials", {
            redirect: false, // Prevent automatic redirect
            email,
            password,
          });
          if (result?.error) {
            setError(result.error);
            result.error === "Email Not Found, Please Sign Up"
              ? setUserNotFound(true)
              : setUserNotFound(false);
            console.error("Error:", result.error);
            setIsWorking(false);
          } else {
            setError("");
            router.replace("/"); // Redirect on successful login
            setIsWorking(false);
          }
        }) // Handle data
        .catch((error) => {
          console.error("Error:", error);
          setError(error);
          setIsWorking(false);
        }); // Handle errors
    }
  };
  useEffect(() => {
    if (!providers) {
      setIsLoading(true);
      getProviders().then((prov) => setProviders(prov));
    } else {
      setIsLoading(false);
    }
    if (status === "authenticated") {
      router.replace("/"); // Redirect on successful login
    }
  }, [providers, status]);

  return (
    <div className="homepage-div">
      {isLoading ? (
        <LoadingIndicator />
      ) : providers ? (
        <>
          <h1 style={{ color: "white", marginBottom: "2rem" }}>
            Fitness Tracker
          </h1>
          <div style={{ display: "flex" }}>
            <button
              className="gsi-material-button"
              key={providers.google.name}
              onClick={() => {
                setIsGoogleWorking(true);
                signIn(providers.google.id, { callbackUrl: "/" });
              }}
              style={{ marginBottom: "1rem" }}
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: "block" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">
                  Sign in with Google
                </span>
                <span style={{ display: "none" }}>Sign in with Google</span>
              </div>
            </button>
            {isGoogleWorking ? (
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : null}
          </div>
          <h1 style={{ color: "white" }}>OR</h1>

          <Form>
            {!userNotFound ? (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>
                    Email address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="JohnDoe@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignIn(e);
                      }
                    }}
                  />
                </Form.Group>{" "}
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignIn(e);
                      }
                    }}
                  />
                </Form.Group>{" "}
              </>
            ) : (
              <>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>
                    First Name:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John"
                    value={given_name}
                    onChange={(e) => {
                      setGiven_name(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    value={family_name}
                    onChange={(e) => {
                      setFamily_name(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>Age:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="18+"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label style={{ color: "white" }}>Gender:</Form.Label>
                  <Form.Select
                    name="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                      setError("");
                    }}
                    value={gender}
                  >
                    <option value="">{"Select..."}</option>
                    <option value="Male">{"Male"}</option>
                    <option value="Female">{"Female"}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>
                    Email address:
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="JohnDoe@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>{" "}
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Form.Label style={{ color: "white" }}>
                    Confirm Password:
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignUp();
                      }
                    }}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group style={{ display: "flex", justifyContent: "center" }}>
              {!userNotFound ? (
                <Button
                  variant="success"
                  onClick={(e) => handleSignIn(e)}
                  disabled={userNotFound}
                >
                  Sign In
                </Button>
              ) : null}

              {userNotFound ? (
                <>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setUserNotFound(false);
                      setError("");
                    }}
                  >
                    Back to Sign In
                  </Button>
                  <Button variant="primary" onClick={() => handleSignUp()}>
                    Sign Up
                  </Button>
                </>
              ) : null}
              {isWorking ? (
                <Spinner animation="border" role="status" variant="light">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : null}
            </Form.Group>
          </Form>
          {error ? (
            <div
              style={{
                width: "100%",
                color: "red",
                display: "flex",
                justifyContent: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {error}
            </div>
          ) : null}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}
