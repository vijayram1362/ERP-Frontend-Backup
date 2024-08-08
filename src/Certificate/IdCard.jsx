import moment from "moment";
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import IdForm from "./IdForm";
import { useLocation } from "react-router-dom";
import { baseURL, uploadCertificate } from "../config/api";

function IdCard() {
  const [formData, setFormData] = useState({
    schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
    schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
    udiseNo: "27160301903",
    affiliationNo: "1131230",
    schoolCode: "31217",
    fullName: "",
    fatherName: "",
    dob: "",
    mobileNo: "",
    studentId: "",
    address: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [logoLeft, setLogoLeft] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const location = useLocation();
  const { student } = location.state || {};

  useEffect(() => {
    if (student) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
        fatherName: student.fatherName,
        dob: moment(student.dob).format("DD/MM/YYYY"),
        mobileNo: student.fatherMobileNo,
        studentId: student.id,
        address: student.address.presentAddress,
      }));

      if (student.photo) {
        const imageUrl = student.photo.startsWith("/")
          ? `${baseURL}${student.photo}`
          : student.photo;
        setProfileImg(imageUrl);
      }
    }
  }, [student]);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    setTimeout(() => {
      const input = document.getElementById("preview-content");
      html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pdfWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        const pdfBlob = pdf.output("blob");

        const formData = new FormData();
        formData.append("file", pdfBlob, "student_id_card_details.pdf");
        formData.append("certificate_type", "Id Card");
        formData.append("reason", "Id Card Issue");
        formData.append("student_id", student.id);

        uploadCertificate({ formData })
          .then((response) => response.json())
          .then((data) => {
            console.log("File saved successfully:", data);
          })
          .catch((error) => {
            console.error("Error saving file:", error);
          });

        pdf.save("student_id_card_details.pdf");
      });
    }, 1000);
  };

  return (
    <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Student ID Card Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div className="flex justify-center items-center gap-x-32">
        <div className="flex justify-center items-center mt-20">
          <div className="text-center">
            <label className="block text-white mb-2">
              Upload Profile Image
            </label>
            {!profileImg ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setProfileImg)}
                className="text-white bg-[#FFFFFF] p-4 w-32 h-32 rounded cursor-pointer"
              />
            ) : (
              <img
                src={profileImg}
                alt="Profile"
                className="w-32 h-32 rounded"
                style={{ objectFit: "cover" }}
                loading="eager"
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center mt-20">
          <div className="text-center">
            <label className="block text-white mb-2">Upload Left Logo</label>
            {!logoLeft ? (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setLogoLeft)}
                className="text-white bg-[#FFFFFF] p-4 w-32 h-32 rounded cursor-pointer"
              />
            ) : (
              <img
                src={logoLeft}
                alt="Logo Left"
                className="w-32 h-32 rounded"
                style={{ objectFit: "cover" }}
                loading="eager"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((key) => (
            <div className="px-2" key={key}>
              <label className="text-white mb-2">
                {key.split(/(?=[A-Z])/).join(" ")}
              </label>
              <input
                type="text"
                name={key}
                placeholder={`Enter ${key.split(/(?=[A-Z])/).join(" ")}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12">
          <button
            className="bg-[#6e1485] text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handlePreview}
          >
            Preview
          </button>
          <button
            className="bg-[#6e1485] text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        {showPreview && (
          <div className="flex justify-center items-center mt-12">
            <div id="preview-content">
              <IdForm
                {...formData}
                profileImg={profileImg}
                logoLeft={logoLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdCard;
