import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
export default function UserSettings({
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
  error,
  preview,
  email,
  preference,
  initialUser,
  onUpdateUser,
  onCancelChanges,
  onFamilyNameChange,
  onGivenNameChange,
  onProfilePictureChange,
  onAgeChange,
  onConfirmNewPasswordChange,
  onCurrentPasswordChange,
  onEmailChange,
  onGoalWeightChange,
  onImperialFeetHeightChange,
  onImperialInchesHeightChange,
  onCurrentWeightChange,
  onMetricHeightChange,
  onPreferenceChange,
  onGenderChange,
  onNewPasswordChange,
  nameError,
  ageError,
  currentWeightError,
  goalWeightError,
  heightError,
  passwordError,
  gender,
  emailError,
  profilePictureError,
}) {
  return (
    <Form>
      <>
        <Form.Group
          className="mb-3"
          controlId="formProfilePicture"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {(profilePicture || preview) && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={preview || profilePicture}
                width={150}
                height={150}
                //placeholder="blur"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                alt="Profile Picture Preview"
              />
            </div>
          )}
          <Form.Label style={{ color: "white" }}>Profile Picture:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => onProfilePictureChange(e)}
            // placeholder="Profile Picture (.jpg or .png)"
            // value={profilePicture}
            // onChange={(e) => {
            //   setProfilePicture(e.target.value);
            //   setError("");
            // }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onUpdateUser();
              }
            }}
          />
          {profilePictureError ? (
            <p style={{ color: "red" }}>{profilePictureError}</p>
          ) : null}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formHeight"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Label style={{ color: "white" }}>Name:</Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={given_name}
              onChange={(e) => onGivenNameChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdateUser();
                }
              }}
            />
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={family_name}
              onChange={(e) => onFamilyNameChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdateUser();
                }
              }}
            />
            {nameError ? <p style={{ color: "red" }}>{nameError}</p> : null}
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="gender">
          <Form.Label>Gender:</Form.Label>
          <Form.Select
            name="gender"
            // value={"Metric (kg, cm, etc.)" || preference}
            onChange={(e) => onGenderChange(e)}
            value={gender}
          >
            {/* <option value="">Select...</option> */}
            <option value="Male">{"Male"}</option>
            <option value="Female">{"Female"}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="preference">
          <Form.Label>Measurement Preference:</Form.Label>
          <Form.Select
            name="preference"
            // value={"Metric (kg, cm, etc.)" || preference}
            onChange={(e) => onPreferenceChange(e)}
            value={preference}
          >
            {/* <option value="">Select...</option> */}
            <option value="Metric">{"Metric (kg, cm, etc.)"}</option>
            <option value="Imperial">
              {"Imperial (lbs, feet & inches, etc.)"}
            </option>
          </Form.Select>
        </Form.Group>
        {initialUser.password ? (
          <>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label style={{ color: "white" }}>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="JohnDoe@example.com"
                value={email}
                onChange={(e) => onEmailChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
              {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formNewPassword"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label style={{ color: "white" }}>New Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => onNewPasswordChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
            </Form.Group>
          </>
        ) : null}
        {newPassword ? (
          <>
            <Form.Group
              className="mb-3"
              controlId="formConfirmNewPassword"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label style={{ color: "white" }}>
                Confirm New Password:
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => onConfirmNewPasswordChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formCurrentPassword"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Form.Label style={{ color: "white" }}>
                Confirm Current Password:
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Current Password"
                value={currentPassword}
                onChange={(e) => onCurrentPasswordChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
            </Form.Group>
            {passwordError ? (
              <p style={{ color: "red" }}>{passwordError}</p>
            ) : null}
          </>
        ) : null}
        <Form.Group
          className="mb-3"
          controlId="formAge"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Label style={{ color: "white" }}>Age:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => onAgeChange(e)}
          />
          {ageError ? <p style={{ color: "red" }}>{ageError}</p> : null}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formWeight"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Label style={{ color: "white" }}>
            {preference === "Metric"
              ? "Current Weight (kg):"
              : "Current Weight (lbs):"}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={
              preference === "Metric"
                ? "Current Weight (kg)"
                : "Current Weight (lbs)"
            }
            value={preference === "Metric" ? currentWeightKG : currentWeightLBS}
            onChange={(e) => onCurrentWeightChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onUpdateUser();
              }
            }}
          />
          {currentWeightError ? (
            <p style={{ color: "red" }}>{currentWeightError}</p>
          ) : null}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGoalWeight"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Label style={{ color: "white" }}>
            {preference === "Metric"
              ? "Goal Weight (kg):"
              : "Goal Weight (lbs):"}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={
              preference === "Metric" ? "Goal Weight (kg)" : "Goal Weight (lbs)"
            }
            value={preference === "Metric" ? goalWeightKG : goalWeightLBS}
            onChange={(e) => onGoalWeightChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onUpdateUser();
              }
            }}
          />
          {goalWeightError ? (
            <p style={{ color: "red" }}>{goalWeightError}</p>
          ) : null}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formHeight"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Form.Label style={{ color: "white" }}>
            {preference === "Metric" ? "Height (cm):" : "Height (ft. & in.):"}
          </Form.Label>
          {preference === "Metric" ? (
            <>
              <Form.Control
                type="text"
                placeholder="Centimeters"
                value={heightMetric}
                onChange={(e) => onMetricHeightChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
              {heightError ? (
                <p style={{ color: "red" }}>{heightError}</p>
              ) : null}
            </>
          ) : (
            <div style={{ display: "flex" }}>
              <Form.Control
                type="text"
                placeholder="Feet"
                value={heightImperial[0]}
                onChange={(e) => onImperialFeetHeightChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
              <Form.Control
                type="text"
                placeholder="Inches"
                value={heightImperial[1]}
                onChange={(e) => onImperialInchesHeightChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onUpdateUser();
                  }
                }}
              />
              {heightError ? (
                <p style={{ color: "red" }}>{heightError}</p>
              ) : null}
            </div>
          )}
        </Form.Group>
        {userChanged ? (
          <Form.Group
            className="mb-3"
            controlId="formHeight"
            style={{ display: "flex" }}
          >
            <Button variant="danger" onClick={() => onCancelChanges()}>
              Cancel Changes
            </Button>
            <Button variant="success" onClick={() => onUpdateUser()}>
              Update
            </Button>
          </Form.Group>
        ) : null}
      </>
    </Form>
  );
}
