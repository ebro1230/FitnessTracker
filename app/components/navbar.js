import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { signOut } from "next-auth/react";
import { Form, Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserSettings from "@/app/components/user-settings";
import { UserContext } from "@/lib/user-context";
import { useContext } from "react";

export default function NavBar() {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const [initialUser, setInitialUser] = useState("");
  // const [updatedUser, setUpdatedUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // const [password, setPassword] = useState("");
  // const [profilePicture, setProfilePicture] = useState("");
  // const [age, setAge] = useState("");
  // const [currentWeightKG, setCurrentWeightKG] = useState("");
  // const [goalWeightKG, setGoalWeightKG] = useState("");
  // const [currentWeightLBS, setCurrentWeightLBS] = useState("");
  // const [goalWeightLBS, setGoalWeightLBS] = useState("");
  // const [preference, setPreference] = useState("Metric");
  // const [heightMetric, setHeightMetric] = useState("");
  // const [heightImperial, setHeightImperial] = useState([]);
  // const [userChanged, setUserChanged] = useState(false);
  // const [error, setError] = useState("");
  // const [preview, setPreview] = useState(null);
  // const [updating, setUpdating] = useState(false);
  // const [family_name, setFamily_name] = useState("");
  // const [given_name, setGiven_name] = useState("");
  // const { data: session, status } = useSession();

  // const numberCheck = /^(\d+(\.\d+)?|\.\d+|\d+\/\d+)$/;
  // const textCheck = /^[a-zA-Z]+$/;
  // const ageCheck = /^(1[89]|[2-9][0-9])$/;
  // const weightCheck =
  //   /^(40(?:\.\d)?|4[1-9](?:\.\d)?|[5-9]\d(?:\.\d)?|[1-4]\d{2}(?:\.\d)?|500(?:\.0)?)$/;

  // const handleCancelChanges = () => {
  //   setFamily_name(initialUser.family_name);
  //   setGiven_name(initialUser.given_name);
  //   setAge(initialUser.age ? initialUser.age : "");
  //   setEmail(initialUser.email ? initialUser.email : "");
  //   setGoalWeightKG(initialUser.goalWeightKG ? initialUser.goalWeightKG : "");
  //   setCurrentWeightKG(
  //     initialUser.currentWeightKG ? initialUser.currentWeightKG : ""
  //   );
  //   setGoalWeightLBS(
  //     initialUser.goalWeightLBS ? initialUser.goalWeightLBS : ""
  //   );
  //   setCurrentWeightLBS(
  //     initialUser.currentWeightLBS ? initialUser.currentWeightLBS : ""
  //   );
  //   setPreference(initialUser.preference ? initialUser.preference : "Metric");
  //   setHeightImperial(
  //     initialUser.heightImperial ? initialUser.heightImperial : ""
  //   );
  //   setHeightMetric(initialUser.heightMetric ? initialUser.heightMetric : "");
  //   setPreview(null);
  //   setProfilePicture(
  //     initialUser.profilePicture || initialUser.image
  //       ? initialUser.profilePicture || initialUser.image
  //       : ""
  //   );
  //   setNewPassword("");
  //   setConfirmNewPassword("");
  //   setPassword("");
  //   setError("");
  //   setUserChanged(false);
  // };

  // const handleUpdateUser = () => {
  //   setUpdating(true);
  //   const formData = new FormData();
  //   formData.append("profilePicture", profilePicture); // File upload
  //   formData.append("family_name", family_name);
  //   formData.append("given_name", given_name);
  //   formData.append("preference", preference);
  //   formData.append("email", email); // Additional user data
  //   formData.append("password", newPassword);
  //   formData.append("age", age);
  //   formData.append("currentWeightKG", currentWeightKG);
  //   formData.append("currentWeightLBS", currentWeightLBS);
  //   formData.append("goalWeightKG", goalWeightKG);
  //   formData.append("goalWeightLBS", goalWeightLBS);
  //   formData.append("heightImperial", heightImperial);
  //   formData.append("heightMetric", heightMetric);

  // };

  // const handleFamilyNameChange = (e) => {
  //   setFamily_name(e.target.value);
  //   if (e.target.value != initialUser.family_name) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  // };

  // const handleGivenNameChange = (e) => {
  //   setGiven_name(e.target.value);
  //   if (e.target.value != initialUser.given_name) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  // };

  // const handleAgeChange = (e) => {
  //   setAge(e.target.value);
  //   if (e.target.value != initialUser.age) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   setError("");
  // };

  // const handlePreferenceChange = (e) => {
  //   setPreference(e.target.value);
  //   if (e.target.value != initialUser.preference) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   setError("");
  // };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   if (e.target.value != initialUser.email) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   setError("");
  // };

  // const handleCurrentPasswordChange = (e) => {
  //   setPassword(e.target.value);
  //   setError("");
  // };

  // const handleNewPasswordChange = (e) => {
  //   setNewPassword(e.target.value);
  //   if (e.target.value != "") {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //     setConfirmNewPassword("");
  //     setPassword("");
  //   }
  //   setError("");
  // };

  // const handleConfirmNewPasswordChange = (e) => {
  //   setConfirmNewPassword(e.target.value);
  //   setError("");
  // };

  // const handleCurrentWeightChange = (e) => {
  //   if (preference === "Metric") {
  //     setCurrentWeightKG(e.target.value);
  //     if (e.target.value != initialUser.currentWeightKG) {
  //       setUserChanged(true);
  //     } else {
  //       setUserChanged(false);
  //     }
  //     setCurrentWeightLBS(Number((e.target.value * 2.2).toFixed(2)));
  //   } else {
  //     setCurrentWeightLBS(e.target.value);
  //     if (e.target.value != initialUser.currentWeightLBS) {
  //       setUserChanged(true);
  //     } else {
  //       setUserChanged(false);
  //     }
  //     setCurrentWeightKG(Number((e.target.value / 2.2).toFixed(2)));
  //   }
  //   setError("");
  // };

  // const handleGoalWeightChange = (e) => {
  //   if (preference === "Metric") {
  //     setGoalWeightKG(e.target.value);
  //     if (e.target.value != initialUser.goalWeightKG) {
  //       setUserChanged(true);
  //     } else {
  //       setUserChanged(false);
  //     }
  //     setGoalWeightLBS(Number((e.target.value * 2.2).toFixed(2)));
  //   } else {
  //     setGoalWeightLBS(e.target.value);
  //     if (e.target.value != initialUser.goalWeightLBS) {
  //       setUserChanged(true);
  //     } else {
  //       setUserChanged(false);
  //     }
  //     setGoalWeightKG(Number((e.target.value / 2.2).toFixed(2)));
  //   }
  // };

  // const handleMetricHeightChange = (e) => {
  //   setHeightMetric(e.target.value ? Number(e.target.value) : "");
  //   if (e.target.value != initialUser.heightMetric) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   setHeightImperial(
  //     e.target.value
  //       ? [
  //           Math.floor(Number(e.target.value) / 30.48),
  //           Math.floor(
  //             12 *
  //               (Number(e.target.value) / 30.48 -
  //                 Math.floor(Number(e.target.value) / 30.48))
  //           ),
  //         ]
  //       : ["", ""]
  //   );
  //   setError("");
  // };

  // const handleImperialFeetHeightChange = (e) => {
  //   if (e.target.value != initialUser.heightImperial[0]) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   if (heightImperial.length === 0) {
  //     setHeightImperial([e.target.value, ""]);
  //   } else {
  //     setHeightImperial((prevHeights) =>
  //       prevHeights.map((h, index) =>
  //         index === 0 ? (e.target.value ? Number(e.target.value) : "") : h
  //       )
  //     );
  //   }
  //   if (!heightImperial[1] && !e.target.value) {
  //     setHeightMetric("");
  //   } else {
  //     setHeightMetric(
  //       Math.round(
  //         Number(heightImperial[1]) * 2.54 +
  //           (e.target.value ? Number(e.target.value) * 30.48 : 0)
  //       )
  //     );
  //   }
  //   setError("");
  // };

  // const handleImperialInchesHeightChange = (e) => {
  //   if (e.target.value != initialUser.heightImperial[1]) {
  //     setUserChanged(true);
  //   } else {
  //     setUserChanged(false);
  //   }
  //   if (heightImperial.length === 0) {
  //     setHeightImperial(["", e.target.value]);
  //   } else {
  //     setHeightImperial((prevHeights) =>
  //       prevHeights.map((h, index) =>
  //         index === 1 ? (e.target.value ? Number(e.target.value) : "") : h
  //       )
  //     );
  //   }
  //   if (!heightImperial[0] && !e.target.value) {
  //     setHeightMetric("");
  //   } else {
  //     setHeightMetric(
  //       Math.round(
  //         Number(heightImperial[0]) * 30.48 +
  //           (e.target.value ? Number(e.target.value) * 2.54 : 0)
  //       )
  //     );
  //   }
  //   setError("");
  // };

  // const handleProfilePictureChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile.type.startsWith("image/")) {
  //       setProfilePicture(selectedFile);
  //       setPreview(URL.createObjectURL(selectedFile));
  //       setUserChanged(true);
  //       setError("");
  //     } else {
  //       setError("Only image files are allowed!");
  //       event.target.value = ""; // Reset file input
  //       setUserChanged(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   async function fetchUser(userId) {
  //     try {
  //       const res = await fetch(`/api/getUser/${userId}`);
  //       if (!res.ok) throw new Error("User not found");
  //       const data = await res.json();
  //       setInitialUser(data);
  //       setUpdatedUser(data);
  //       setFamily_name(data.family_name);
  //       setGiven_name(data.given_name);
  //       setAge(data.age ? data.age : "");
  //       setEmail(data.email ? data.email : "");
  //       setGoalWeightKG(data.goalWeightKG ? data.goalWeightKG : "");
  //       setCurrentWeightKG(data.currentWeightKG ? data.currentWeightKG : "");
  //       setGoalWeightLBS(data.goalWeightLBS ? data.goalWeightLBS : "");
  //       setCurrentWeightLBS(data.currentWeightLBS ? data.currentWeightLBS : "");
  //       setPreference(data.preference ? data.preference : "Metric");
  //       setHeightImperial(data.heightImperial ? data.heightImperial : "");
  //       setHeightMetric(data.heightMetric ? data.heightMetric : "");
  //       // setPreview(
  //       //   data.profilePicture || data.image
  //       //     ? data.profilePicture || data.image
  //       //     : null
  //       // );
  //       setProfilePicture(data.profilePicture ? data.profilePicture : "");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   if (session && initialUser === "") {

  //     fetchUser(session.user.id);
  //   } else if (session && initialUser != "") {
  //   } else if (status === "loading") {
  //     //setIsLoading(true);
  //     //setIsUnauthenticated(false);
  //   } else if (status === "unauthenticated") {
  //     //signIn();
  //   }
  // }, [session]);

  const {
    family_name,
    given_name,
    age,
    goalWeightKG,
    currentWeightKG,
    goalWeightLBS,
    currentWeightLBS,
    currentPassword,
    newPassword,
    confirmNewPassword,
    profilePicture,
    heightImperial,
    heightMetric,
    userChanged,
    updating,
    handleGenderChange,
    gender,

    preview,
    email,
    preference,
    initialUser,
    handleUpdateUser,
    handleCancelChanges,
    handleFamilyNameChange,
    handleGivenNameChange,
    handleProfilePictureChange,
    handleAgeChange,
    handleConfirmNewPasswordChange,
    handleCurrentPasswordChange,
    handleEmailChange,
    handleGoalWeightChange,
    handleImperialFeetHeightChange,
    handleImperialInchesHeightChange,
    handleCurrentWeightChange,
    handleMetricHeightChange,
    handlePreferenceChange,
    handleNewPasswordChange,
    show,
    handleClose,
    handleShow,
    status,
    nameError,
    ageError,
    currentWeightError,
    goalWeightError,
    heightError,
    passwordError,
    emailError,
    profilePictureError,
  } = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg" sticky="top" fixed="top">
      <Container>
        <Navbar.Brand>Fitness Tracker</Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Items */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {status === "authenticated" ? (
              <>
                <Button variant="danger" onClick={() => signOut()}>
                  Sign Out
                </Button>
                <Button onClick={handleShow} disabled={!initialUser.email}>
                  <i className="bi bi-gear-fill"></i>
                </Button>
              </>
            ) : null}
            <Offcanvas
              show={show}
              onHide={handleClose}
              keyboard={true}
              placement="end"
              className="bg-dark text-white"
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: userChanged ? "100%" : "auto",
                  }}
                >
                  <Offcanvas.Title>User Settings</Offcanvas.Title>
                  {userChanged ? (
                    <Form.Group
                      controlId="formHeight"
                      style={{ display: "flex", width: "auto" }}
                    >
                      <Button
                        variant="danger"
                        style={{
                          // fontSize: "clamp(8px, 1.2vw, 16px)",
                          margin: "0rem 0.1rem",
                          width: "fit-content",
                        }}
                        onClick={() => handleCancelChanges()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="success"
                        style={{
                          // fontSize: "clamp(8px, 1.2vw, 16px)",
                          margin: "0rem 0.1rem",
                          width: "fit-content",
                        }}
                        onClick={() => handleUpdateUser()}
                      >
                        Update
                      </Button>
                    </Form.Group>
                  ) : null}
                </div>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <UserSettings
                  age={age}
                  email={email}
                  profilePicture={profilePicture}
                  currentPassword={currentPassword}
                  family_name={family_name}
                  given_name={given_name}
                  currentWeightKG={currentWeightKG}
                  currentWeightLBS={currentWeightLBS}
                  goalWeightKG={goalWeightKG}
                  goalWeightLBS={goalWeightLBS}
                  preference={preference}
                  heightImperial={heightImperial}
                  heightMetric={heightMetric}
                  userChanged={userChanged}
                  updating={updating}
                  newPassword={newPassword}
                  confirmNewPassword={confirmNewPassword}
                  preview={preview}
                  initialUser={initialUser}
                  onUpdateUser={handleUpdateUser}
                  onCancelChanges={handleCancelChanges}
                  onFamilyNameChange={handleFamilyNameChange}
                  onGivenNameChange={handleGivenNameChange}
                  onProfilePictureChange={handleProfilePictureChange}
                  onAgeChange={handleAgeChange}
                  onConfirmNewPasswordChange={handleConfirmNewPasswordChange}
                  onCurrentPasswordChange={handleCurrentPasswordChange}
                  onEmailChange={handleEmailChange}
                  onGoalWeightChange={handleGoalWeightChange}
                  onImperialFeetHeightChange={handleImperialFeetHeightChange}
                  onImperialInchesHeightChange={
                    handleImperialInchesHeightChange
                  }
                  onCurrentWeightChange={handleCurrentWeightChange}
                  onMetricHeightChange={handleMetricHeightChange}
                  onPreferenceChange={handlePreferenceChange}
                  onGenderChange={handleGenderChange}
                  gender={gender}
                  onNewPasswordChange={handleNewPasswordChange}
                  nameError={nameError}
                  ageError={ageError}
                  currentWeightError={currentWeightError}
                  goalWeightError={goalWeightError}
                  heightError={heightError}
                  passwordError={passwordError}
                  emailError={emailError}
                  profilePictureError={profilePictureError}
                />
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
