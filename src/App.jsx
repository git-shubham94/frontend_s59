import React, { useEffect, useState } from 'react';

import { BACKENDURL, callApi } from './lib';

const App = () => {

  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [sid, setSid] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [savePopup, setSavePopup] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    callApi("GET", BACKENDURL + "alldata", "", readResponse);
  }

  function readResponse(data) {
    setStudentData(JSON.parse(data));
  }

  function saveData() {
    if (name.trim() === "") {
      alert("Enter Name");
      return;
    }

    if (dept.trim() === "") {
      alert("Enter Department");
      return;
    }

    let data = JSON.stringify({
      sname: name,
      sdept: dept
    });

    callApi("POST", BACKENDURL + "insert", data, saveResponse);
  }

  function saveResponse(data) {
    alert(data);
    closeSaveData();
    loadData();
  }

  function showSaveData() {
    setName("");
    setDept("");
    setSid("");
    setSavePopup(true);
  }

  function closeSaveData() {
    setSavePopup(false);
  }

  function deleteData(id) {
    let res = window.confirm("Do you want to delete?");
    if (!res) return;

    callApi("DELETE", BACKENDURL + "delete/" + id, "", deleteResponse);
  }

  function deleteResponse(data) {
    alert(data);
    loadData();
  }

  function editData(id) {
    callApi("GET", BACKENDURL + "getbyid/" + id, "", editResponse);
  }

  function editResponse(data) {
    let rdata = JSON.parse(data);
    setSid(rdata.sid);
    setName(rdata.sname);
    setDept(rdata.sdept);
    setSavePopup(true);
  }

  function updateData() {

    if (name.trim() === "") {
      alert("Enter Name");
      return;
    }

    if (dept.trim() === "") {
      alert("Enter Department");
      return;
    }

    let data = JSON.stringify({
      sname: name,
      sdept: dept
    });

    callApi("PUT", BACKENDURL + "updateall/" + sid, data, updateResponse);
  }

  function updateResponse(data) {
    alert(data);
    closeSaveData();
    loadData();
  }

  return (
    <div className='app'>

      {savePopup &&
        <div className='overlay'>
          <div className='panel'>
            <label onClick={closeSaveData}>&times;</label>
            <h3>Student Details</h3>

            <legend>Student Name*</legend>
            <input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <legend>Department*</legend>
            <input
              type='text'
              placeholder='Enter Department'
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />

            {sid === "" ?
              <button onClick={saveData}>Save</button>
              :
              <button onClick={updateData}>Update</button>
            }
          </div>
        </div>
      }

      <div className='header'>Student Details</div>

      <div className='section'>
        <table>
          <thead>
            <tr>
              <th>SID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((ele) => (
              <tr key={ele.sid}>
                <td>{ele.sid}</td>
                <td>{ele.sname}</td>
                <td>{ele.sdept}</td>
                <td>
                  <button onClick={() => editData(ele.sid)}>Edit</button>
                  <button onClick={() => deleteData(ele.sid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='footer'>
        <button onClick={showSaveData}>Add New</button>
      </div>

    </div>
  );
}

export default App;