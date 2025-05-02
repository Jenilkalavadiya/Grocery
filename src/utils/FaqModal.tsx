import { apiRequest } from "@/api/ApiCall";
import { Modal, Button, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  question: Yup.string()
    .required("Question is required")
    .min(5, "Question should be at least 5 characters long"),
  answer: Yup.string()
    .required("Answer is required")
    .min(10, "Answer should be at least 10 characters long"),
});

const FaqModal = ({ open, handleClose, getfaqs }: any) => {
  const initialValues = {
    question: "",
    answer: "",
  };

  const handleSubmit = async (values: any) => {
    console.log("FAQ submitted:", values);
    const params = {
      question: values.question,
      answer: values.answer,
    };

    const res = await apiRequest({
      method: "post",
      url: "/add_faqs",
      data: params,
    });
    console.log("Qwert", res);
    toast.success("Question Added");
    getfaqs();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="add-faq-modal">
      <div className="modal-container w-[400px] p-6 mx-auto mt-20 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add FAQ</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="space-y-4">
                {/* Question Field */}
                <div>
                  <Field
                    name="question"
                    as={TextField}
                    label="Question"
                    fullWidth
                    variant="outlined"
                    className="text-gray-700"
                    error={false}
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    name="answer"
                    as={TextField}
                    label="Answer"
                    fullWidth
                    variant="outlined"
                    className="text-gray-700"
                    multiline
                    rows={4}
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-4 flex justify-center">
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default FaqModal;
