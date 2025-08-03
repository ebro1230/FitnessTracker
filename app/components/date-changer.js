import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import { addDays, format } from "date-fns";
import Button from "react-bootstrap/Button";

export default function DateChanger({
  onReduceDate,
  selectedDate,
  onDateChange,
  onIncreaseDate,
}) {
  return (
    <>
      <Button
        size="sm"
        variant="primary"
        onClick={() => {
          onReduceDate();
        }}
        className="date-change-button"
      >
        {/* {"<"} */}
        <i className="bi bi-arrow-left"></i>
      </Button>
      {selectedDate ? (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            onDateChange(date);
          }}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="yyyy-MM-dd"
          className="custom-input"
        />
      ) : null}
      <Button
        size="sm"
        variant="primary"
        onClick={() => {
          onIncreaseDate();
        }}
        className="date-change-button"
      >
        {/* {">"} */}
        <i className="bi bi-arrow-right"></i>
      </Button>
    </>
  );
}
