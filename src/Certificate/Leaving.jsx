



import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Leaving() {
  const location = useLocation();
  const student = location.state?.student || {}; // Get student data from location state

  const [formData, setFormData] = useState({
    admissionSerialNo: student.admissionSerialNo || '',
    studentId: student.id || '',
    grNo: student.gr_id || '', //
    FullName: student
      ? `${student.firstName || ''} ${student.middleName || ''} ${student.lastName || ''}`.trim()
      : '',
    fathersName: student.father_name || '',
    mothersName: student.mother_name || '',
    adhaarCardNo: student.aadhaarCardNo || '',
    caste: student.caste || '',
    religion: student.religion || '',
    parentsOccupation: student.father_occupation || '',
    motherTongue:  student.mother_tongue || '',
    dateOfAdmission: student.adm_date || '',
    dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : '',
    dobWords: '',
    placeOfBirth: student.dob_place || '',
    stdAdmitted: student.adm_class || '', //
    lastSchoolAttended: student.last_class || '',
    stdStudying: student.className || '',
    progress: '',
    classLeaving: student.classLeaving || '',
    dateLeaving: student.dateLeaving || '',
    reasonLeaving: '',
    identification1: student.identification_mark_1 || '',
    identification2: student.identification_mark_2 || '',
    admissionOfficerSignature: student.admissionOfficerSignature || '',
    registrationOfficerSignature: student.registrationOfficerSignature || '',
    schoolName: 'INDURA ENGLISH SCHOOL (CBSE)',
    schoolAddress: 'Enjangaon (East), Tq, Basmath Dist Hingoli',
    udiseNo: '27160301903',
    affiliationNo: '1131230',
    schoolCode: '31217',
    logoLeft: '',
    logoRight: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };


  const handleDownload = () => {
    const input = document.getElementById('preview-content');
    html2canvas(input, {
      scale: 2, 
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('student_leaving_certificate.pdf');
    });
  };

  return (
    <div className='text-white bg-[#412249] min-h-screen font-[roboto]'>
      <div className='pt-20'>
        <h2 className='text-3xl font-semibold text-center'>Student Leaving Certificate Details</h2>
        <p className='text-center'>Enter the required information for the certificate</p>
      </div>

      <div className='mt-8 md:mt-16 lg:mt-32 container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-lg lg:max-w-6xl mx-auto'>
          {Object.keys(formData).filter(field => !['schoolName', 'schoolAddress', 'udiseNo', 'affiliationNo', 'schoolCode', 'logoLeft', 'logoRight'].includes(field)).map((field) => (
            <div className='px-2' key={field}>
              <label className='text-white mb-2'>
                {field.split(/(?=[A-Z])/).join(' ')}
              </label>
              <input
                type={field === 'dob' || field === 'dateOfAdmission' || field === 'dateLeaving' ? 'date' : 'text'}
                name={field}
                placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ')}`}
                className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
                value={formData[field]}
                onChange={handleFormChange}
              />
            </div>
          ))}
          <div className='px-2'>
            <label className='text-white mb-2'>Upload Left Logo</label>
            <input
              type='file'
              name='logoLeft'
              accept='image/*'
              onChange={handleFileChange}
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
            />
          </div>
          <div className='px-2'>
            <label className='text-white mb-2'>Upload Right Logo</label>
            <input
              type='file'
              name='logoRight'
              accept='image/*'
              onChange={handleFileChange}
              className='p-2 text-black rounded focus:outline-none cursor-pointer w-full'
            />
          </div>
        </div>

        <div className='mt-8'>
          <div className='flex pb-20 justify-center items-center text-white mt-20'>
            <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handlePreview}>
              Preview
            </button>
            <button className='bg-[#744881] px-8 py-2 rounded-md mx-4 mt-2 md:mt-0' onClick={handleDownload}>
              Download
            </button>
          </div>
          {showPreview && (
            <div id='preview-content' className='mt-8 p-4 border border-gray-300 bg-white text-black'>
              <div className='bg-white p-4'>
                <div className='m-12 p-12 border-4 border-black'>
                  <div className='flex items-center justify-center space-x-2'>
                    <div className='w-44 h-44'>
                      <img src={formData.logoLeft} alt="School Logo" loading='lazy' title='School Logo' className='object-contain h-full w-full' />
                    </div>
                    <div className='mb-12'>
                      <h2 className='text-center text-red-700 mb-2 font-bold text-3xl'>{formData.schoolName}</h2>
                      <p className='text-center font-semibold'>{formData.schoolAddress}</p>
                      <p className='text-center font-semibold'>UDISE No.: {formData.udiseNo} Affiliation No.: {formData.affiliationNo} School Code: {formData.schoolCode}</p>
                      <div className='text-center font-semibold'>
                        <a href="http://www.induraenglishschool.in" className='mx-4'>Website : www.induraenglishschool.in</a>
                        <a href="mailto:induraenglishschool@gmail.com" className='mx-4'>Email : induraenglishschool@gmail.com</a>
                      </div>
                    </div>
                    <div className='w-44 h-44'>
                      <img src={formData.logoRight} alt="CBSE Logo" loading='lazy' title='CBSE Logo' className='object-contain h-full w-full' />
                    </div>
                  </div>

                  <div className='mt-8 vertical-header-item'>
                    <div className='overflow-x-auto'>
                      <table className='w-full max-w-[800px] border-collapse border border-gray-300 mx-auto'>
                        <tbody>
                          {Object.keys(formData).filter(field => !['schoolName', 'schoolAddress', 'udiseNo', 'affiliationNo', 'schoolCode', 'logoLeft', 'logoRight'].includes(field)).map((field) => (
                            <tr key={field} className='border border-gray-300'>
                              <td className='border border-gray-300 px-4 py-2 font-semibold text-left'>
                                {field.split(/(?=[A-Z])/).join(' ')}
                              </td>
                              <td className='border border-gray-300 px-4 py-2'>
                                <input
                                  type={field === 'dob' || field === 'dateOfAdmission' || field === 'dateLeaving' ? 'date' : 'text'}
                                  name={field}
                                  value={formData[field]}
                                  onChange={handleFormChange}
                                  className='w-full text-black rounded focus:outline-none'
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h4 className='px-12 mt-6'>DATE:</h4>

                  <div className='flex justify-between items-center pt-2 px-12'>
                    <p>PLACE : IES, Barmath</p>
                    <p>CLERK’S SIGN </p>
                    <p>PRINCIPAL’S SIGN </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaving;
