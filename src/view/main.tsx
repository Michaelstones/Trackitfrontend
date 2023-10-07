import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/style.css'; // Use a relative path to your CSS file
import Axios from 'axios';
import API_URL from '../config';
import { useNavigate } from 'react-router-dom';

interface FormValues {
  recipient?: string;
  subject?: string;
  body?: string;
}

function Main() {
  const initialValues: FormValues = { recipient: '', subject: '', body: '' };
  const navigate = useNavigate()

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
   recipient: Yup.string()
    .email('Invalid email address')
    .required('Recipient address is required'),
    subject: Yup.string().required('Subject of message is required'),
    body: Yup.string().required('Body of message is required'),
  });

 const onSubmit = async (values: FormValues) => {
  try {
    // Make an Axios POST request to the endpoint with the form data
    // https://emailtracking.onrender.com/
    console.log(API_URL)
    const response = await Axios.post(`${API_URL}email/send-email`, values);
    console.log(response.data)
    if (response.data) {
      values.body = ''
      values.recipient = ''
      values.subject=''
      navigate('/info')
    }

    // Handle the response, e.g., show a success message
    // console.log('Response:', response.data);
  } catch (error) {
    // Handle errors, e.g., show an error message
    console.error('Error:', error);
  }
};

  
// Navigate to the '/chat-home' route
   const navigateToChat = () => {
    navigate('/chat-home');
  };

  return (
    <div className='formWrapper'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div>
            <div>
              <label htmlFor="recipient">Recipient</label>
              <Field type="text" id="recipient" name="recipient" />
            </div>
            <ErrorMessage name="recipient" component="div" />
          </div>

          <div>
            <div>
              <label htmlFor="subject">Subject</label>
              <Field type="text" id="subject" name="subject" />
            </div>
            <ErrorMessage name="subject" component="div" />
          </div>

          <div>
            <div>
              <label htmlFor="body">Body</label>
              <Field type="text" id="body" name="body" />
            </div>
            <ErrorMessage name="body" component="div" />
          </div>

          <div className='buttonContainer'>
            <button type="submit" className='submitButton'>Submit</button>
            <button type='button' onClick={navigateToChat} className='sendChatButton'>
              Send Chat
            </button>
          </div>
          
        </Form>
      </Formik>
  
    </div>
  );
}

export default Main;
