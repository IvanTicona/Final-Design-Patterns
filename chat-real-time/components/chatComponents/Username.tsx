import React from 'react';
import { Text } from 'react-native';

const UserName = ({ name, style }) => {
  return (
    <Text style={style}>{name}</Text>
  );
};

export default UserName;
