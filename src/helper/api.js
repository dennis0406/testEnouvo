import axios from 'axios';
import {useEffect, useState} from 'react';
import {APPROVER, FEATURE} from '../constants/api';

export const useGetFeature = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(FEATURE)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return {data};
};

export const useGetApprover = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(APPROVER)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return {data};
};
