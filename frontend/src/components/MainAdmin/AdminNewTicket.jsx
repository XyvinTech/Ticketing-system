import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledSelectionList from "../../ui/StyledSelectionList";
import StyledInput from "../../ui/StyledInput";
import StyledText from "../../ui/StyledText";
import FileUpload from "../../ui/FileUpload";
import StyledButton from "../../ui/StyledButton";
import { useTicketStore } from "../../store/TicketStore";
import { useNavigate } from "react-router-dom";
import { useDepartmentStore } from "../../store/DepartmentStore";
import { useProjectStore } from "../../store/projectStore";
const AdminNewTicket = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { addTicket } = useTicketStore();
  const { departments, fetchDepartment } = useDepartmentStore();
  const { projects, fetchProject } = useProjectStore();
  const Priority = [{ value:"low",name: "Low" }, {value:"medium" ,name: "Medium" }, {value:"high" ,name: "High" }];
  const Project =projects.map((project) => ({
    value: project._id,
    name: project.projectName,
  }));
  const Department = departments.map((dep) => ({
    value: dep._id,
    name: dep.departmentName,
  }));
  useEffect(() => {
    fetchDepartment();
  }, []);
  useEffect(() => {
    fetchProject();
  }, []);
  const onSubmit = async (data) => {

    //& TODO add attachments

    try {
      await addTicket(data);
      toast.success("Ticket created successfully!");
      reset();
      navigate("/admin/ticket");
     
    } catch (error) {
      console.error("Error adding ticket:", error);
      toast.error("Error!");
    }
  };

  return (
    <>
      <div className="divide-y divide-gray-200">
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
            <StyledButton text="Create" type="submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminNewTicket;
