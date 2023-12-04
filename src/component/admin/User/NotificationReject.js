import { useState } from 'react';
import axiosClient from '../../../api/axiosClient'; // assuming you have a client set up
import Header from '../Header/Header';

export default function NotificationReject() {
  const [message, setMessage] = useState('');
  const email = 'tinh26012002@gmail.com'; // fixed email address

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Call your API to send the email
    axiosClient.post(`/auth/send/message/${email}`, {
      message: message,
    })
    .then(response => {
      console.log(response);
      // You might want to navigate somewhere else here or set some state to indicate the email was sent
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <div className="container">
        <Header/>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5  fw-bold ">Lý do từ chối</h2>
                <form onSubmit={handleFormSubmit}>                  
                  <div className="form-outline mb-4">
                    <textarea
                      className="form-control"
                      placeholder="Lý do"
                      value={message}
                      onChange={handleMessageChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4 w-100 "
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}