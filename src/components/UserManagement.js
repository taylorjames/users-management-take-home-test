import React, { useEffect, useState } from 'react';
import UserForm from './UserForm';
import UsersTable from './UsersTable';
import Notification from './Notification';
import {
  DEFAULT_USER_FORM_FIELDS,
  USER_FORM_MODE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TYPE,
} from '../constants';
import { getUsers, createUser, updateUser } from '../services/usersApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    user: null,
    mode: USER_FORM_MODE.HIDDEN,
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        const usersResponseData = await getUsers();
        /** Select fields on the client, since the jsonplaceholder `/users` API does not support partial response of specific fields. */
        const selectUserFields = usersResponseData.reduce((acc, user) => {
          const filteredUserObj = {};
          for (const key in user) {
            if (DEFAULT_USER_FORM_FIELDS.includes(key)) {
              filteredUserObj[key] = user[key];
            }
          }
          return [...acc, filteredUserObj];
        }, []);
        setUsers(selectUserFields);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setNotification({
          message: NOTIFICATION_MESSAGE.ERROR_GENERIC,
          type: NOTIFICATION_TYPE.ERROR,
        });
      }
    }
    fetchUsers();
  }, []);

  const showAddUserForm = () => {
    const emptyUser = DEFAULT_USER_FORM_FIELDS.reduce((obj, field) => {
      // Relying on the json-server/jsonplaceholder API to provider an `id` upon creation of a new user.
      if (field != 'id') {
        obj[field] = '';
      }
      return obj;
    }, {});

    setUserForm({
      user: emptyUser,
      mode: USER_FORM_MODE.CREATE,
    });
  };

  const showEditUserForm = (user) => {
    setUserForm({ user: user, mode: USER_FORM_MODE.EDIT });
  };

  const hideUserForm = () =>
    setUserForm({
      user: null,
      mode: USER_FORM_MODE.HIDDEN,
    });

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      if (userForm.mode == USER_FORM_MODE.CREATE) {
        const createdUser = await createUser(formData);
        setUsers([...users, createdUser]);
        setNotification({
          message: NOTIFICATION_MESSAGE.USER_CREATED,
          type: NOTIFICATION_TYPE.INFO,
        });
      } else {
        const updatedUser = await updateUser(formData);
        const updatedUsers = users.map((user) =>
          user.id == userForm.user.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setNotification({
          message: NOTIFICATION_MESSAGE.USER_UPDATED,
          type: NOTIFICATION_TYPE.INFO,
        });
      }
      setIsLoading(false);
      hideUserForm();
    } catch (err) {
      console.error(err);
      setNotification({
        message: NOTIFICATION_MESSAGE.ERROR_GENERIC,
        type: NOTIFICATION_TYPE.INFO,
      });
    }
  };

  const handleClearNotifications = () =>
    setNotification({ message: '', type: '' });

  return (
    <>
      {notification.message && (
        <Notification
          notification={notification}
          duration={4000}
          onClear={handleClearNotifications}
        />
      )}
      {userForm.mode == USER_FORM_MODE.HIDDEN ? (
        <UsersTable
          users={users}
          isLoading={isLoading}
          onEditUser={showEditUserForm}
          onAddUser={showAddUserForm}
        />
      ) : (
        <UserForm
          user={userForm.user}
          formMode={userForm.mode}
          onSubmit={handleSubmit}
          onCancel={hideUserForm}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default UserManagement;
