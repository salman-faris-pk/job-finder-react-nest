import { Fragment, useState, SetStateAction, Dispatch } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useSelector } from "../redux/store";
import { useForm } from "react-hook-form";
import { UpdateUserDatas } from "../apis/uploads.apis";
import { toast } from "sonner";
import { Updateduser } from "../utils/types";
import Loading from "./Loaders/Loading";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UserForm = ({ open, setOpen }: ModalProps) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Updateduser>({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading,setIsLoading]=useState(false)

  const handleImgFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
  };


  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const formValues = getValues();

      const formData = new FormData();
      formData.append("firstName", formValues.firstName || "");
      formData.append("lastName", formValues.lastName || "");
      formData.append("email", formValues.email || "");
      formData.append("contact", formValues.contact || "");
      formData.append("location", formValues.location || "");
      formData.append("portfolioUrl", formValues.portfolioUrl || "");
      formData.append("githubUrl", formValues.githubUrl || "");
      formData.append("jobTitle", formValues.jobTitle || "");
      formData.append("about", formValues.about || "");
  
      if (profileImage) {
        formData.append("profileUrl", profileImage);
      }

      const res = await UpdateUserDatas(formData);

      if (res.status === "failed") {
        toast.error(res.message);
      } else {
        toast.success(res.message);
          setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error submitting form:", error);
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </DialogTitle>

                  <div className="mt-2 max-h-[50vh] overflow-y-auto overflow-x-hidden pr-2">
                    <div className="w-full flex flex-col gap-5">
                      <div className="w-full flex gap-2">
                        <div className="w-1/2">
                          <TextInput
                            name="firstName"
                            label="First Name"
                            placeholder="James"
                            type="text"
                            register={register("firstName", {
                              required: "First Name is required",
                            })}
                            error={
                              errors.firstName ? errors.firstName?.message : ""
                            }
                          />
                        </div>
                        <div className="w-1/2">
                          <TextInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Wagonner"
                            type="text"
                            register={register("lastName", {
                              required: "Last Name is required",
                            })}
                            error={
                              errors.lastName ? errors.lastName?.message : ""
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full flex gap-2">
                        <div className="w-1/2">
                          <TextInput
                            name="contact"
                            label="Contact"
                            placeholder="Phone Number"
                            type="text"
                            register={register("contact", {
                              required: "Contact is required!",
                            })}
                            error={
                              errors.contact ? errors.contact?.message : ""
                            }
                          />
                        </div>

                        <div className="w-1/2">
                          <TextInput
                            name="location"
                            label="Location"
                            placeholder="Location"
                            type="text"
                            register={register("location", {
                              required: "Location is required",
                            })}
                            error={
                              errors.location ? errors.location?.message : ""
                            }
                          />
                        </div>
                      </div>

                      <TextInput
                        name="jobTitle"
                        label="Job Title"
                        placeholder="Software Engineer"
                        type="text"
                        register={register("jobTitle", {
                          required: "Job Title is required",
                        })}
                        error={errors.jobTitle ? errors.jobTitle?.message : ""}
                      />

                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          Profile Picture
                        </label>
                        <label
                          className="cursor-pointer border border-gray-400 px-4 py-2 text-center rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                          htmlFor="profilePic"
                        >
                          {profileImage
                            ? profileImage.name
                            : "Upload Profile Picture"}
                        </label>
                        <input
                          type="file"
                          id="profilePic"
                          className="hidden"
                          onChange={handleImgFileChange}
                        />
                      </div>

                      <TextInput
                        name="portfolioUrl"
                        label="Portfolio"
                        placeholder="https://your-portfolio.com"
                        type="url"
                        register={register("portfolioUrl", {
                          pattern: {
                            value:
                              /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
                            message: "Enter a valid URL",
                          },
                        })}
                        error={
                          errors.portfolioUrl
                            ? errors.portfolioUrl?.message
                            : ""
                        }
                      />

                        <TextInput
                        name="githubUrl"
                        label="Github"
                        placeholder="https://your-gitprofile.com"
                        type="url"
                        register={register("githubUrl", {
                          pattern: {
                            value:
                              /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/,
                            message: "Enter a valid URL",
                          },
                        })}
                        error={
                          errors.githubUrl
                            ? errors.githubUrl?.message
                            : ""
                        }
                      />

                      <div className="flex flex-col">
                        <label className="text-gray-600 text-sm mb-1">
                          About
                        </label>
                        <textarea
                          className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                          rows={4}
                          cols={6}
                          {...register("about", {
                            required:
                              "Write a little bit about yourself",
                          })}
                          aria-invalid={errors.about ? "true" : "false"}
                        ></textarea>
                        {errors.about && (
                          <span
                            role="alert"
                            className="text-xs text-red-500 mt-0.5"
                          >
                            {errors.about?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isLoading ? (
                      <Loading/>
                    ): (
                      <CustomButton
                      type="button"
                      containerStyles="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                      title={"Submit"}
                      onClick={handleSubmit(onSubmit)}
                    />
                    )}
                   
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserForm;
