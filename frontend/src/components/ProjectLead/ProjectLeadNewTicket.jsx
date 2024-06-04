import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import StyledSelectionList from "../../ui/StyledSelectionList";
import StyledInput from "../../ui/StyledInput";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";
import { useTicketStore } from "../../store/TicketStore";
import { useNavigate } from "react-router-dom";
import { useDepartmentStore } from "../../store/DepartmentStore";
import { useProjectStore } from "../../store/projectStore";
import { uploadImage } from "../../api/uploadapi";
import Spinner from "../../ui/Spinner";
const ProjectLeadNewTicket = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { addTicket } = useTicketStore();
  const { departments, fetchDepartment } = useDepartmentStore();
  const { projects, fetchProjectById } = useProjectStore();
  const [dep, setDep] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    fetchDepartment();
  }, []);
  useEffect(() => {
    let filter = {};
    if (dep) {
      filter.inDep = dep;
    }
    fetchProjectById(filter);
  }, [dep]);
  const Priority = [
    { value: "low", name: "Low" },
    { value: "medium", name: "Medium" },
    { value: "high", name: "High" },
  ];
  const Project = projects.map((project) => ({
    value: project._id,
    name: project.projectName,
  }));
  const Department = departments.map((dep) => ({
    value: dep._id,
    name: dep.departmentName,
  }));
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (data.attachment.length > 0) {
      const imageUrl = await uploadImage(data.attachment);
      if (imageUrl == "error") {
        toast.error("File size exceed");
        return;
      } else {
        data.attachment = [];
        imageUrl.data.map((dataUrl) => data.attachment.push(dataUrl.url));
      }
    }

    try {
      await addTicket(data);
      toast.success("Ticket created successfully!");
      reset();
      navigate("/ProjectLead/Ticket");
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <h1 className="mb-6 text-xl font-semibold">New Ticket</h1>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Controller
                    name="priority"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledSelectionList
                          label="Priority"
                          options={Priority}
                          {...field}
                        />
                        {errors.priority && (
                          <span className="text-red-500">
                            {errors.priority.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Priority is required" }}
                  />
                </div>
                <div>
                  <Controller
                    name="department"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledSelectionList
                          label="Department"
                          options={Department}
                          {...field}
                          onChange={(value) => {
                            setDep(value); // Set selected user type inline
                            field.onChange(value);
                          }}
                        />
                        {errors.department && (
                          <span className="text-red-500">
                            {errors.department.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Department is required" }}
                  />
                </div>
              </div>
              {Project.length > 0 ? (
                <div>
                  <Controller
                    name="projectId"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <StyledSelectionList
                          label="Project"
                          options={Project}
                          {...field}
                        />
                        {errors.project && (
                          <span className="text-red-500">
                            {errors.project.message}
                          </span>
                        )}
                      </>
                    )}
                    rules={{ required: "Project is required" }}
                  />
                </div>
              ) : (
                <div>
                  <span className="text-red-500">No Projects available</span>
                </div>
              )}
              <div>
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <StyledInput
                      type="text"
                      label="Subject"
                      placeholder="Subject"
                      {...field}
                    />
                  )}
                  rules={{ required: "Subject is required" }}
                />
                {errors.subject && (
                  <span className="text-red-500">{errors.subject.message}</span>
                )}
              </div>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <StyledText label="Description" field={field} />
                )}
                rules={{ required: "Description is required" }}
              />
            </div>
            <div className="mt-14">
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
              <Controller
                name="attachment"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange } }) => (
                  <FileUpload onChange={onChange} />
                )}
              />
            </div>
          </div>
          <div className="flex justify-end bg-gray-50 pb-4 sm:px-6">
            <StyledButton
              text={isSubmitting ? <Spinner /> : "Create"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProjectLeadNewTicket;
