import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdateSetting(e, field) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
