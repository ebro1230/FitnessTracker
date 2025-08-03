import { Stack, Button } from "react-bootstrap";

export default function UpdateUserButtons({ onCancelChanges, onSaveChanges }) {
  return (
    <Stack direction="horizontal" gap={3}>
      <div className="p-2 me-auto meal"></div>
      <div className="p-2">
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            onCancelChanges();
          }}
        >
          Cancel Changes
        </Button>
      </div>
      <div className="p-2">
        <Button
          size="sm"
          variant="success"
          onClick={() => {
            onSaveChanges();
          }}
        >
          Save Changes
        </Button>
      </div>
    </Stack>
  );
}
