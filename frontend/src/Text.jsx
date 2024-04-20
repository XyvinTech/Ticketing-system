import React, { useState } from 'react';

const UserData = [
  { userType: 'Admin', emails: ['admin1@example.com', 'admin2@example.com', 'admin3@example.com', 'admin4@example.com', 'admin5@example.com'] },
  { userType: 'User', emails: ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com'] },
  { userType: 'Guest', emails: ['guest1@example.com', 'guest2@example.com', 'guest3@example.com', 'guest4@example.com', 'guest5@example.com'] },
];

const UserTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (index) => {
    const newRowState = [...expandedRows];
    if (newRowState.includes(index)) {
      newRowState.splice(newRowState.indexOf(index), 1);
    } else {
      newRowState.push(index);
    }
    setExpandedRows(newRowState);
  };

  const handleRemoveEmail = (userIndex, emailIndex) => {
    const updatedUserData = [...UserData];
    updatedUserData[userIndex].emails.splice(emailIndex, 1);
    setExpandedRows([...expandedRows]); // Force re-render
  };

  return (
    <table>
      <thead>
        <tr>
          <th>User Type</th>
          <th>Email IDs</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {UserData.map((user, userIndex) => (
          <React.Fragment key={userIndex}>
            <tr>
              <td>{user.userType}</td>
              <td>
                <ul>
                  {user.emails
                    .slice(0, expandedRows.includes(userIndex) ? user.emails.length : 2)
                    .map((email, emailIndex) => (
                      <li key={emailIndex}>
                        <span className='rounded-full px-3 py-px text-sm bg-gray-300'>{email}
                        <button onClick={() => handleRemoveEmail(userIndex, emailIndex)}>x</button></span>
                      </li>
                    ))}
                </ul>
              </td>
              <td>
                <button onClick={() => handleRowClick(userIndex)}>
                  {expandedRows.includes(userIndex) ? 'Collapse' : 'Expand'}
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
