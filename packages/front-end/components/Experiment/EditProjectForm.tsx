import { FC } from "react";
import { useAuth } from "../../services/auth";
import Modal from "../Modal";
import { useDefinitions } from "../../services/DefinitionsContext";
import { useForm } from "react-hook-form";
import SelectField from "../Forms/SelectField";

const EditProjectForm: FC<{
  apiEndpoint: string;
  current?: string;
  cancel: () => void;
  mutate: () => void;
}> = ({ current, apiEndpoint, cancel, mutate }) => {
  const { apiCall } = useAuth();
  const { projects } = useDefinitions();

  const form = useForm({
    defaultValues: {
      project: current || "",
    },
  });

  return (
    <Modal
      header={"Edit Project"}
      open={true}
      close={cancel}
      submit={form.handleSubmit(async (data) => {
        await apiCall(apiEndpoint, {
          method: "POST",
          body: JSON.stringify(data),
        });
        mutate();
      })}
      cta="Save"
    >
      <SelectField
        label="Project"
        value={form.watch("project")}
        onChange={(v) => form.setValue("project", v)}
        options={projects.map((p) => ({ label: p.name, value: p.id }))}
        initialOption="None"
      />
    </Modal>
  );
};

export default EditProjectForm;
