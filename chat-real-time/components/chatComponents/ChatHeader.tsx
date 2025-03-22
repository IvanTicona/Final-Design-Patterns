import React from 'react';
import { Image, TouchableOpacity, Text, TextStyle, ImageStyle, View } from 'react-native';

interface ProfileImageProps {
  uri: string;
  style?: ImageStyle;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ uri, style }) => {
  return (
    <TouchableOpacity>
      <Image source={{ uri }} style={style} />
    </TouchableOpacity>
  );
};

interface UserNameProps {
  name: string;
  style?: TextStyle;
}

export const UserName: React.FC<UserNameProps> = ({ name, style }) => {
  return <Text style={style}>{name}</Text>;
};