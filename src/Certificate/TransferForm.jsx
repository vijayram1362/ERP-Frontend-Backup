import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TransferCertificatePreview from "./TransferCertificatePreview";

function TransferForm() {
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
    // SlNo: "", 
    StudentID: student?.id || "",
    UIDNo: student?.uidNo || "",
    AdmissionNo: student?.admNo || "",
    NationalCode: "",
    studentName: student
      ? `${student.firstName || ""} ${student.middleName || ""} ${
          student.lastName || ""
        }`.trim()
      : "",
    mothersName: student?.motherName || "",
    fathersName: student?.fatherName || "",
    dateOfBirth: moment(student?.dob).format("DD/MM/YYYY") || "",
    birthPlace: student?.dobPlace || "",
    taluka: student?.address.taluka || "",
    district: student?.address.district || "",
    nationality: student?.nationality || "",
    caste: student?.caste || "",
    admissionDate: moment(student?.admDate).format("DD/MM/YYYY") || "",
    lastClass: student?.lastClass || "",
    inWords: "",
    lastExam: "",
    failed: "",
    subjects: ["", "", "", "", "", ""],
    workingDays: "",
    presence: "",
    duesPaid: "",
    promotion: "",
    govtCategory: "",
    extracurricular: "",
    progress: "",
    conduct: "",
    reasonForLeaving: "",
    applicationDate: "",
    struckOffDate: "",
    issueDate: "",
    remarks: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleDownload = () => {
    const input = document.getElementById("preview-content");
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Transfer_Certificate.pdf");
    });
  };

  return (
    <div className="text-white bg-[#412249] min-h-screen font-[roboto]">
      <div className="pt-20">
        <h2 className="text-3xl font-semibold text-center">
          Transfer Certificate Details
        </h2>
        <p className="text-center">
          Enter the required information for the certificate
        </p>
      </div>

      <div className="mt-8 md:mt-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto">
          {Object.keys(formData).map(
            (key) =>
              key !== "subjects" &&
              key !== "promotion" &&
              key !== "govtCategory" &&
              key !== "extracurricular" && (
                <div key={key} className="px-2">
                  <label className="text-white mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:
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
                      placeholder={`Enter ${key
                        .replace(/([A-Z])/g, " $1")
                        .trim()}`}
                      className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              )
          )}
          {formData.subjects.map((subject, index) => (
            <div key={index} className="px-2">
              <label className="text-white mb-2">{`Subject ${
                index + 1
              }:`}</label>
              <input
                type="text"
                placeholder={`Enter Subject ${index + 1}`}
                className="p-2 text-black rounded focus:outline-none cursor-pointer w-full"
                value={subject}
                onChange={(e) => handleSubjectChange(index, e.target.value)}
              />
            </div>
          ))}

          <div className="px-2">
            <label className="text-white mb-2">
              Qualified for promotion to the higher class:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="promotion"
                value="YES"
                checked={formData.promotion === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="promotion"
                value="NO"
                checked={formData.promotion === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-2">
            <label className="text-white mb-2">
              Whether school is under Govt./ Minority / Independent Category:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="govtCategory"
                value="YES"
                checked={formData.govtCategory === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="govtCategory"
                value="NO"
                checked={formData.govtCategory === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="px-2">
            <label className="text-white mb-2">
              Games played or extra curricular activities:
            </label>
            <div className="flex items-center">
              <label className="mr-2">YES</label>
              <input
                type="radio"
                name="extracurricular"
                value="YES"
                checked={formData.extracurricular === "YES"}
                onChange={handleChange}
                className="mr-4"
              />
              <label className="mr-2">NO</label>
              <input
                type="radio"
                name="extracurricular"
                value="NO"
                checked={formData.extracurricular === "NO"}
                onChange={handleChange}
              />
            </div>
          </div>
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

      <div className="pb-32">
        {showPreview && <TransferCertificatePreview formData={formData} />}
      </div>
    </div>
  );
}

export default TransferForm;
