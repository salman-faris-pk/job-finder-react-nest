import { Fragment, useState} from "react"
import { Dialog, Transition,TransitionChild,DialogPanel,DialogTitle} from "@headlessui/react";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";




const CompanyForm = ({ open, setOpen }:any) => {
    // const { user } = useSelector((state) => state.user);
    const user={};
 
    const [profileImage, setProfileImage] = useState("");
    const [uploadCv, setUploadCv] = useState("");
  
    const onSubmit = () => {};
  
    const closeModal = () => setOpen(false);
  
    return (
      <>
        <Transition appear show={opener ?? false} as={Fragment}>
          <Dialog as='div' className='relative z-50' onClose={closeModal}>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </TransitionChild>
  
            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <TransitionChild
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <DialogTitle
                      as='h3'
                      className='text-lg font-semibold leading-6 text-gray-900'
                    >
                      Edit Company Profile
                    </DialogTitle>
  
                    <form
                      className='w-full mt-2 flex flex-col gap-5'
                    >
                      <TextInput
                        name='name'
                        label='Company Name'
                        type='text'
                      />
  
                      <TextInput
                        name='location'
                        label='Location/Address'
                        placeholder='eg. Califonia'
                        type='text'
                      />
  
                      <div className='w-full flex gap-2'>
                        <div className='w-1/2'>
                          <TextInput
                            name='contact'
                            label='Contact'
                            placeholder='Phone Number'
                            type='text'
   
                          />
                        </div>
  
                        <div className='w-1/2 mt-2'>
                          <label className='text-gray-600 text-sm mb-1'>
                            Company Logo
                          </label>
                          <input
                            type='file'
                            // onChange={(e) => setProfileImage(e.target.files[0])}
                          />
                        </div>
                      </div>
  
                      <div className='flex flex-col'>
                        <label className='text-gray-600 text-sm mb-1'>
                          About Company
                        </label>
                        <textarea
                          className='ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                          rows={4}
                          cols={6}
                       
                        //   aria-invalid={errors.about ? "true" : "false"}
                        ></textarea>
                       
                      </div>
  
                      <div className='mt-4'>
                        <CustomButton
                          type='submit'
                          containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                          title={"Submit"}
                        />
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