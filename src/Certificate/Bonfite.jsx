import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment/moment";
import BonafitePreview from "./BonfitePreview";
import { uploadCertificate } from "../config/api";

function Bonafite() {
  const location = useLocation();
  const student = location.state?.student;

  const [formData, setFormData] = useState({
    schoolName: "INDURA ENGLISH SCHOOL (CBSE)",
    schoolAddress: "Enjangaon (East), Tq, Basmath Dist Hingoli",
    udiseNo: "27160301903",
    affiliationNo: "1131230",
    schoolCode: "31217",
    logoLeft: "",
    logoRight: "",
    studentName: student
      ? `${student.firstName || ""} ${student.middleName || ""} ${
          student.lastName || ""
        }`.trim()
      : "",
    class: student?.class || "",
    Year: moment().format("YYYY") || "",
    dob: moment(student?.dob).format("DD/MM/YYYY") || "",
    birthDateInWords: moment(student?.dob).format("Do MMMM YYYY") || "",
    dobPlace: student?.dobPlace || "",
    caste: student?.caste || "",
    reason: "",
    // certificateNo:"",
    regdNo: student?.id || "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = async () => {
    const input = document.getElementById("preview-content");
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Convert the PDF to a blob
      // const pdfBlob = pdf.output("blob");

      // // Send the PDF blob to the server
      // const formData = new FormData();
      // // formData.append("file", pdfBlob, "Transfer_Certificate.pdf");
      // // console.log("formData", formData);

      // uploadCertificate({ formData })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("File saved successfully:", data);
      //   })
      //   .catch((error) => {
      //     console.error("Error saving file:", error);
      //   });

      pdf.save("Bonafide_Certificate.pdf");
    });
  };

  return (
    <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Bonafide Certificate Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div className="mt-8 md:mt-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map((key) => (
            <div key={key} className="px-2">
              <label className="text-white mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              {key === "logoLeft" || key === "logoRight" ? (
                <input
                  type="file"
                  name={key}
                  accept="image/*"
                  className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                  className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center p-8 text-white mt-20">
        <button
          className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
          onClick={handlePreview}
        >
          Preview
        </button>
        {showPreview && (
          <button
            className="bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        )}
      </div>

      <h3 className="text-xl mt-12 text-center font-semibold mb-4">Preview</h3>

      <div className="pb-32" id="preview-content">
        {showPreview && <BonafitePreview formData={formData} />}
      </div>
    </div>
  );
}

export default Bonafite;
