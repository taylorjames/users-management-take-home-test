import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export async function getUsers() {
  try {
    const res = await axios.get(`${API_URL}/?_sort=username`);
    return res.data;
  } catch (error) {
    throw new Error(`Error getting users: ${error}`);
  }
}

export async function updateUser(formData) {
  try {
    const res = await axios.put(
      `${API_URL}/${formData.fields.id}`,
      formData.fields
    );
    return res.data;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export async function createUser(formData) {
  try {
    const res = await axios.post(API_URL, formData.fields);
    return res.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}
