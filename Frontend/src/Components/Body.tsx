import React, { useEffect, useState } from 'react'
import Upload from './Upload'

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
    const response = await fetch('http://localhost:4646/upload',{
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
        <div className='min-h-80 min-w-[640px]  border-[1px] border-[#F1E3E4] outline-dashed outline-offset-8 outline-[#F1E3E4] flex items-center justify-center'>
<Upload
  onFileSelect={ async (file) => {
    if (!file) return;
    setFile(file);
    console.log(file.name, file.size);
    sendFileData(file.name);
  }}
/>
        </div>
    </div>
    </>
  )
}

export default Body
