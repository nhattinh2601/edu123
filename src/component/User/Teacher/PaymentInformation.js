import React, { useState, useEffect } from "react";
import axiosClient from "../../../api/axiosClient";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const bankList = [
  "Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)",
  "Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)",
  "Ngân hàng TMCP Quốc Tế (VIB)",
  "Ngân hàng TMCP Xuất Nhập Khẩu Việt Nam (EIB)",
  "Ngân hàng TMCP Quân Đội (MBank)",
  "Ngân hàng TMCP Phát Triển TP. Hồ Chí Minh (HDBank)",
  "Ngân hàng TMCP Á Châu (ACB)",
  "Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)",
  "Ngân hàng TMCP Quốc Dân (NCB)",
  "Ngân hàng TMCP Hàng Hải (MSB)",
  "Ngân hàng TMCP Việt Á (VAB)",
  "Ngân hàng TMCP Việt Nam Thịnh Vượng (VPB)",
  "Ngân hàng Thương mại trách nhiệm hữu hạn một thành viên Dầu Khí Toàn Cầu (GPBank)",
  "Ngân hàng TMCP Phương Đông (OCB)",
  "Ngân hàng TMCP Đại Dương (OJB)",
  "Ngân hàng TMCP Bắc Á (BAB)",
  "Ngân hàng TMCP An Bình (ABB)",
  "Ngân hàng TMCP Tiên Phong (TPB)",
  "Ngân hàng TMCP Bưu Điện Liên Việt (LPB)",
  "Ngân hàng TMCP Sài Gòn Hà Nội (SHB)",
  "Ngân hàng TMCP Bảo Việt (BVB)",
  "Ngân hàng TMCP Đông Á (DongABank)",
  "Ngân hàng TMCP Công Thương Việt Nam (Vietinbank)",
  "Ngân hàng Nông Nghiệp và Phát Triển Nông thôn Việt Nam (VARB)",
  "Ngân hàng TMCP Đầu Tư và Phát triển Việt Nam (BIDV)",
  "Ngân hàng TMCP Đông Nam Á (SeABank)",
  "Ngân hàng TMCP Sài Gòn (SCB)",
  "Ngân hàng TMCP Kiên Long (KLB)",
  "Ngân hàng liên doanh Việt Nga (VRB)",
  "Ngân hàng TMCP Nam Á (NAB)",
];

export default function PaymentInformation() {
  const [bankname, setBankName] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [accountname, setAccountName] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [disableUpdate, setDisableUpdate] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const encodedId = localStorage.getItem("userId");
        const userId = atob(encodedId);

        const response = await axiosClient.get(`users/${userId}`);
        const userData = response.data;

        setBankName(userData.bank_name);
        setAccountNumber(userData.account_number);
        setAccountName(userData.account_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const fieldsToUpdate = {
    bank_name: bankname,
    account_number: accountnumber,
    account_name: accountname,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!bankname || !accountnumber || !accountname) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const encodedId = localStorage.getItem("userId");
      const userId = atob(encodedId);

      const response = await axiosClient.patch(
        `/users/${userId}`,
        fieldsToUpdate
      );
      console.log("User updated:", response.data);
      setDisableUpdate(true);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  const handleAccountNumberChange = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, "");
    let formattedNumber = "";

    for (let i = 0; i < inputNumber.length; i++) {
      formattedNumber += inputNumber[i];

      if ((i + 1) % 4 === 0 && i !== inputNumber.length - 1) {
        formattedNumber += " ";
      }
    }

    if (formattedNumber.length <= 23) {
      setAccountNumber(formattedNumber);
    }

    setDisableUpdate(
      formattedNumber.length < 19 || formattedNumber.length > 24
    );
  };

  const handleAccountNameChange = (e) => {
    const inputName = e.target.value
      .replace(/^\s+/, "")
      .replace(/\s{2,}/g, " ");
    const uppercaseName = inputName.toUpperCase();
    const validName = /^[A-Z][A-Z\s]*$/;

    if (validName.test(uppercaseName) || uppercaseName === "") {
      setAccountName(uppercaseName);
      setNameError("");
    } else {
      setNameError(
        "Tên chủ thẻ chỉ được chứa chữ cái tiếng Anh và khoảng trắng"
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-9 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h2 className="card-title text-center mb-5 fw-bold">
                  Thông tin thanh toán
                </h2>
                <form onSubmit={handleSubmit}>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="bankname">
                      Tên ngân hàng *
                    </label>
                    <select
                      className="form-select"
                      name="bankname"
                      value={bankname}
                      onChange={(e) => setBankName(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Chọn ngân hàng
                      </option>
                      {bankList.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label fw-bold"
                      htmlFor="accountnumber"
                    >
                      Số tài khoản *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Số tài khoản"
                      name="accountnumber"
                      value={accountnumber}
                      onChange={handleAccountNumberChange}
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label fw-bold" htmlFor="accountname">
                      Tên Chủ Thẻ *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      name="accountname"
                      value={accountname}
                      onChange={handleAccountNameChange}
                    />
                    {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary btn-block mb-4 w-100 ${
                      disableUpdate ? "disabled" : ""
                    }`}
                    disabled={disableUpdate}
                  >
                    Cập nhật
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
