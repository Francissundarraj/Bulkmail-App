import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios"
import * as XLSX from "xlsx"



function App() {

  const [msg, setMsg] = useState("")
  const [status, setStatus] = useState(false)
  const [emailList, setEmialList] = useState([])

  function handlemsg(event) {
    setMsg(event.target.value)
  }


  const send = () => {
    setStatus(true)
    axios.post("http://localhost:5000/sendemail", { msg: msg, emailList:emailList })
      .then(function (data) {

        if (data.data === true) {
          alert("Email Sent Successfully")
          setStatus(false)
        }
        else {

          alert("Failed")
        }

      })
    setMsg("")


  }

  function handlefile(event) {

    const file = (event.target.files[0])
    const reader = new FileReader()
    reader.onload = function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const workSheet = workbook.Sheets[sheetName]
      const emailList = XLSX.utils.sheet_to_json(workSheet, { header: 'A' })
      const totalEmail = emailList.map(function(item) {return item.A})
      setEmialList(totalEmail)
      console.log(totalEmail)
    }

    reader.readAsArrayBuffer(file)

  }


  return (
    <div >

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-2xl p-3 text-center">BulkMail</h1>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md neon-effect">
        <h1 className="text-2xl p-3 text-center">We can help your business with sending multiple emails at once</h1>
      </div>


      <div className="bg-blue-600 text-white">
        <h1 className="text-2xl p-3 text-center">Drag and drop you CSV files</h1>
      </div>

      <div className=" flex flex-col items-center  bg-blue-400 px-5 py-3">

        <textarea onChange={handlemsg} value={msg} className="w-[80%] h-32 py-2 px-2 outline-none border border-black rounded-md" placeholder="enter the email text" name="" id=""></textarea>

        <div>
          <input type="file" onChange={handlefile} className="border-4 border-dashed p-4 mt-5 mb-5" />

        </div>
        <p>Total emails in the file : {emailList.length}</p>

        <button onClick={send} className="bg-black text-white font-medium p-2 m-2 rounded-md neonButton">{status ? "sending..." : "send"}</button>
      </div>

      <div className="bg-blue-300 text-white p-8">

      </div>

      <div className="bg-blue-200 text-white p-8">

      </div>


    </div>

  );
}

export default App;
