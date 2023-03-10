import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
const PrivacyGroup = () => {
  const [createMembers, setCreateMember] = useState('');
  const [findMembers, setFindMember] = useState('');
  const [delGroup, setDelGroup] = useState('');
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [findResult, setFindResult] = useState([]);
  const [createResult, setCreateResult] = useState('');

  const createGroup = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      members: createMembers,
      name: groupName,
      description: description,
      user: sessionStorage.getItem('user'),
    };
    axios.post('http://localhost:4000/create_group', data).then((response) => {
      try {
        setCreateResult(response.data.privacyGroupId);
        Swal.fire({
          icon: 'success',
          title: 'Create Success!!',
          text: `result: ${response.data.privacyGroupId}`,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
  const findGroup = () => {
    const data = {
      user: sessionStorage.getItem('user'),
      members: findMembers,
      token: sessionStorage.getItem('token'),
    };
    axios.post('http://localhost:4000/find_group', data).then((response) => {
      try {
        setFindResult(response.data.resultList);
        Swal.fire({
          icon: 'success',
          title: 'Finding Success!!',
          text: `result: ${findResult}`,
          confirmButtonColor: '#00FF00',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteGroup = () => {
    const data = {
      token: sessionStorage.getItem('token'),
      user: sessionStorage.getItem('user'),
      privacyGroupId: delGroup,
    };
    axios.post('http://localhost:4000/delete_group', data).then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Delete Success!!',
        text: `${response.data.result}`,
        confirmButtonColor: '#00FF00',
        confirmButtonText: 'OK',
      });
    });
  };
  return (
    <div class='row form'>
      <h2>Privacy-Group-Section</h2>

      <div class='column'>
        <h4>Create privacy group</h4>

        <label>Members</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Username Sparate By Comma(,) Example: user1_1,hospitalA'
          onChange={(e) => {
            setCreateMember(e.target.value);
          }}
        ></textarea>
        <br />
        <label>Group Name</label>
        <br />
        <input className='input_default'
          type='text'
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <br />
        <input className='input_default'
          type='text'
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <button className='button_createGroup' onClick={createGroup}>Create Group</button>
        <h3>{createResult}</h3>
      </div>
      <div class='column'>
        <h4>Find Privacy Group</h4>

        <label>Members</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Username Sparate By Comma(,) Example: user1_1,hospitalA'
          onChange={(e) => {
            setFindMember(e.target.value);
          }}
        ></textarea>
        <br />
        <button className='button_findMember' onClick={findGroup}>Find</button>
        <br />
        <ul>
          {findResult.map((i) => (
            <li>{i}</li>
          ))}
        </ul>
      </div>
      <div class='column'>
        <h4>Delete Privacy Group</h4>

        <label>privacyGroupId</label>
        <br />
        <textarea
          className='member-input'
          placeholder='Privacy Group Id'
          onChange={(e) => {
            setDelGroup(e.target.value);
          }}
        ></textarea>
        <br />
        <button className='button_delete' onClick={deleteGroup}>Delete</button>
        <br />
      </div>
    </div>
  );
};
export default PrivacyGroup;
