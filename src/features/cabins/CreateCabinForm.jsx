import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editvalues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editvalues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal()?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal()?.();
          },
        }
      );
    }
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label={"name"} error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This filed is required",
          })}
        />
      </FormRow>

      <FormRow label={"maxCapacity"} error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "this filed is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"regularPrice"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This filed is required",
            min: {
              value: 1,
            },
          })}
        />
      </FormRow>

      <FormRow label={"discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This filed is required",

            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow label={"description"} error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This filed is required",
          })}
        />
      </FormRow>

      <FormRow label={"image"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This File is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal()?.()}
          size={"medium"}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking} size={"medium"} variation="primary">
          {`${isEditSession ? "Edit cabin" : "Create a cabin"}`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
