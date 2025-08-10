"use client";
import Image from "next/image";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import BlankProfilePic from "@/assets/profile-picture-dark-mode.png";
import WeightChart from "./weight-chart";

export default function Profile({
  userData,
  preference,
  weightLossPerWeekKG,
  weightLossPerWeekLBS,
  weightLossPerWeekChanged,
  onWeightLossPerWeekChange,
  onWeightLossPerWeekSave,
  onWeightLossPerWeekCancel,
  activityLevel,
  onActivityLevelChange,
  onActivityLevelSave,
  onActivityLevelCancel,
  activityLevelChanged,
  dailyCalorieGoal,
  bmiKG,
  bmiLBS,
  goalWeightKG,
  goalWeightLBS,
  currentWeightKG,
  currentWeightLBS,
}) {
  return (
    <div className="profile-div">
      <Row className="pic-weightChart-div">
        <Col xs={12} sm={6}>
          <Row style={{ height: "250px" }}>
            <Col className="pic-col">
              {userData.profilePicture || userData.image ? (
                <Image
                  src={userData.profilePicture || userData.image}
                  width={150}
                  height={150}
                  //placeholder="blur"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt="Profile Picture"
                />
              ) : (
                <Image
                  src={BlankProfilePic}
                  width={150}
                  height={150}
                  placeholder="blur"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt="Profile Picture"
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col className="pic-col">
              <Table
                striped
                bordered
                hover
                size="sm"
                variant="dark"
                className="profile-table"
              >
                <tbody>
                  <tr key="user-name">
                    <td>Name</td>
                    <td>
                      {userData.given_name} {userData.family_name}
                    </td>
                  </tr>
                  <tr key="user-age">
                    <td>Age</td>
                    <td>{userData.age ? userData.age : "--"}</td>
                  </tr>
                  <tr key="gender">
                    <td>Gender</td>
                    <td>{userData.gender ? userData.gender : "--"}</td>
                  </tr>
                  <tr key="user-current-height">
                    {userData.preference === "Metric" ||
                    !userData.preference ? (
                      <>
                        <td>{`Height (cm)`}</td>
                        <td>
                          {userData.heightMetric ? userData.heightMetric : "--"}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{`Height (ft. & in.)`}</td>
                        <td>
                          {userData.heightImperial
                            ? userData.heightImperial.length
                              ? `${userData.heightImperial[0]}' ${userData.heightImperial[1]}"`
                              : "--"
                            : "--"}
                        </td>
                      </>
                    )}
                  </tr>
                  <tr key="user-current-weight">
                    {userData.preference === "Metric" ||
                    !userData.preference ? (
                      <>
                        <td>{`Current Weight (kg)`}</td>
                        <td>
                          {userData.currentWeightKG
                            ? userData.currentWeightKG
                            : "--"}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{`Current Weight (lbs)`}</td>
                        <td>
                          {userData.currentWeightLBS
                            ? userData.currentWeightLBS
                            : "--"}
                        </td>
                      </>
                    )}
                  </tr>

                  <tr key="user-goal-weight">
                    {userData.preference === "Metric" ||
                    !userData.preference ? (
                      <>
                        <td>{`Goal Weight (kg)`}</td>
                        <td>
                          {userData.goalWeightKG ? userData.goalWeightKG : "--"}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{`Goal Weight (lbs)`}</td>
                        <td>
                          {userData.goalWeightLBS
                            ? userData.goalWeightLBS
                            : "--"}
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={6}>
          <Row>
            <Col className="pic-col">
              <WeightChart userData={userData} />
            </Col>
          </Row>

          <Row>
            <Col className="pic-col">
              <Table
                striped
                bordered
                hover
                size="sm"
                variant="dark"
                className="profile-table"
              >
                <tbody>
                  <tr key="bmi">
                    <td>BMI</td>
                    <td>
                      {userData.preference === "Metric"
                        ? bmiKG
                          ? typeof bmiKG === "number"
                            ? bmiKG.toFixed(2)
                            : "TBD"
                          : "TBD"
                        : bmiLBS
                        ? typeof bmiLBS === "number"
                          ? bmiLBS.toFixed(2)
                          : "TBD"
                        : "TBD"}
                    </td>
                  </tr>
                  <tr key="bmi-level">
                    <td>BMI Category</td>
                    <td>
                      {userData.preference === "Metric"
                        ? !bmiKG || bmiKG === "TBD"
                          ? "TBD"
                          : bmiKG < 18.5
                          ? "Underweight"
                          : bmiKG >= 18.5 && bmiKG < 25
                          ? "Normal weight"
                          : bmiKG >= 25 && bmiKG < 30
                          ? "Overweight"
                          : bmiKG >= 30 && bmiKG < 35
                          ? "Obesity Class I (Mild)"
                          : bmiKG >= 35 && bmiKG < 40
                          ? "Obesity Class II (Moderate)"
                          : bmiKG >= 40
                          ? "Obesity Class III (Severe/Morbid)"
                          : null
                        : !bmiLBS || bmiLBS === "TBD"
                        ? "TBD"
                        : bmiLBS < 18.5
                        ? "Underweight"
                        : bmiLBS >= 18.5 && bmiLBS < 25
                        ? "Normal weight"
                        : bmiLBS >= 25 && bmiLBS < 30
                        ? "Overweight"
                        : bmiLBS >= 30 && bmiLBS < 35
                        ? "Obesity Class I (Mild)"
                        : bmiLBS >= 35 && bmiLBS < 40
                        ? "Obesity Class II (Moderate)"
                        : bmiLBS >= 40
                        ? "Obesity Class III (Severe/Morbid)"
                        : null}
                    </td>
                  </tr>
                  <tr key="Weight Loss Per Week">
                    <td>
                      {userData.preference === "Metric"
                        ? "Weight Loss Per Week (kg)"
                        : "Weight Loss Per Week (lbs):"}
                    </td>
                    <td>
                      <Form.Group className="" controlId="Weight Loss Per Week">
                        {userData.preference === "Metric" ? (
                          <Form.Select
                            name="Weight Loss Per Week (kg)"
                            onChange={(e) => onWeightLossPerWeekChange(e)}
                            value={weightLossPerWeekKG}
                          >
                            <option value={0}>{0}</option>
                            <option value={0.1}>{0.1}</option>
                            <option value={0.2}>{0.2}</option>
                            <option value={0.3}>{0.3}</option>
                            <option value={0.4}>{0.4}</option>
                            <option value={0.5}>{0.5}</option>
                            <option value={0.6}>{0.6}</option>
                            <option value={0.7}>{0.7}</option>
                            <option value={0.8}>{0.8}</option>
                            <option value={0.9}>{0.9}</option>
                            <option value={1}>{1}</option>
                          </Form.Select>
                        ) : (
                          <Form.Select
                            name="Weight Loss Per Week (lbs)"
                            onChange={(e) => onWeightLossPerWeekChange(e)}
                            value={weightLossPerWeekLBS}
                          >
                            <option value={0}>{0}</option>
                            <option value={0.25}>{0.25}</option>
                            <option value={0.5}>{0.5}</option>
                            <option value={0.75}>{0.75}</option>
                            <option value={1}>{1}</option>
                            <option value={1.25}>{1.25}</option>
                            <option value={1.5}>{1.5}</option>
                            <option value={1.75}>{1.75}</option>
                            <option value={2}>{2}</option>
                          </Form.Select>
                        )}
                        {weightLossPerWeekChanged ? (
                          <>
                            <Button
                              variant="danger"
                              onClick={() => {
                                onWeightLossPerWeekCancel();
                              }}
                            >
                              Cancel
                            </Button>{" "}
                            <Button
                              variant="success"
                              onClick={() => {
                                onWeightLossPerWeekSave();
                              }}
                            >
                              Save
                            </Button>
                          </>
                        ) : null}
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>Activity Level</td>
                    <td>
                      <Form.Group className="" controlId="Activity Level">
                        <Form.Select
                          name="Activity Level"
                          onChange={(e) => onActivityLevelChange(e)}
                          value={activityLevel}
                        >
                          <option value={1.2}>
                            {"Sedentary"}
                            {/* (little or no exercise) */}
                          </option>
                          <option value={1.375}>
                            {"Lightly active"}
                            {/* (light exercise 1–3 days/week) */}
                          </option>
                          <option value={1.55}>
                            {"Moderately active"}
                            {/* (moderate exercise 3–5 days/week) */}
                          </option>
                          <option value={1.725}>
                            {"Very active"}
                            {/* (hard exercise 6–7 days/week) */}
                          </option>
                          <option value={1.9}>
                            {"Super active"}
                            {/* (twice daily workouts, physical job) */}
                          </option>
                        </Form.Select>

                        {activityLevelChanged ? (
                          <>
                            <Button
                              variant="danger"
                              onClick={() => {
                                onActivityLevelCancel();
                              }}
                            >
                              Cancel
                            </Button>{" "}
                            <Button
                              variant="success"
                              onClick={() => {
                                onActivityLevelSave();
                              }}
                            >
                              Save
                            </Button>
                          </>
                        ) : null}
                      </Form.Group>
                    </td>
                  </tr>
                  <tr key="Weeks Until Goal">
                    <td>Weeks Until Goal</td>
                    <td>
                      {userData.preference === "Metric"
                        ? weightLossPerWeekKG && currentWeightKG && goalWeightKG
                          ? Math.round(
                              (currentWeightKG - goalWeightKG) /
                                weightLossPerWeekKG
                            )
                          : "TBD"
                        : weightLossPerWeekLBS &&
                          currentWeightLBS &&
                          goalWeightLBS
                        ? Math.round(
                            (currentWeightLBS - goalWeightLBS) /
                              weightLossPerWeekLBS
                          )
                        : "TBD"}
                    </td>
                  </tr>

                  <tr key="Daily Calorie Goal">
                    <td>Daily Calorie Goal</td>
                    {typeof dailyCalorieGoal === "number" ? (
                      <td>{dailyCalorieGoal.toFixed(2)}</td>
                    ) : (
                      <td>{dailyCalorieGoal}</td>
                    )}
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Col xs={12} md={6} className="profile-table-col"></Col>
        <Col xs={12} md={6} className="profile-table-col"></Col>
      </Row>
    </div>
  );
}
