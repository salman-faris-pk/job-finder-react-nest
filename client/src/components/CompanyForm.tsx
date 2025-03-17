import { Fragment, startTransition, useState } from "react";
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
import { CompanyUpdateData } from "../utils/types";
import { EditCompany } from "../apis/uploads.apis";
import { toast } from "sonner"
import Loading from "./Loaders/Loading";



const CompanyForm = ({ open, setOpen }: any) => {
  const { user } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyUpdateData>({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImage(file);
  };

  const onSubmit = async (data: CompanyUpdateData) => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("location", data.location);
    formData.append("about", data.about);
    formData.append("contact", data.contact);
    if (profileImage) {
      formData.append("profileUrl", profileImage);
    }
     
    try {
      const res = await EditCompany(formData);

      startTransition(() => {
        setIsLoading(false);
  
        if (res.status === "failed") {
          toast.error(res.message);
        } else {
          toast.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
    } catch (error) {
      console.log(error);
      startTransition(() => {
        setIsLoading(false);
      });
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
            <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
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
                    Edit Company Profile
                  </DialogTitle>

                  <form
                    className="w-full mt-2 flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name="name"
                      label="Company Name"
                      type="text"
                      register={register("name", {
                        required: "Compnay Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <TextInput
                      name="location"
                      label="Location/Address"
                      placeholder="eg. Califonia"
                      type="text"
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

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
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className="w-1/2 mt-2">
                        <label className="text-gray-600 text-sm mb-1 block">
                          Company Logo
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          id="fileUpload"
                        />

                        <label
                          htmlFor="fileUpload"
                          className="block w-full bg-gray-200 text-center text-gray-700 py-2 rounded cursor-pointer"
                        >
                          {profileImage ? profileImage.name : "Choose a file"}
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        About Company
                      </label>
                      <textarea
                        className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
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

                    <div className="mt-4">
                      {isLoading ? (
                         <Loading/>
                      ) : (
                        <CustomButton
                          type="submit"
                          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none"
                          title="Submit"
                        />
                      )}
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CompanyForm;
