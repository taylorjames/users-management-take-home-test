import React from 'react';
import PropTypes from 'prop-types';

const UsersTableBase = ({ users, onEditUser }) => {
  return (
    <>
      {users.length == 0 ? (
        <p>There are currently no users to display.</p>
      ) : (
        <table className="UsersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => onEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

UsersTableBase.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditUser: PropTypes.func.isRequired,
};

export default UsersTableBase;
